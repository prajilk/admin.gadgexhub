import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import {
  error400,
  error401,
  error403,
  error500,
  formateDate,
  success200,
} from "@/lib/utils";
import { ZodProductSchema } from "@/lib/zod-schemas/schema";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { z } from "zod";
import { ColorVariant } from "@/lib/types/types";
import { uid } from "uid";
import { uploadImage } from "@/config/cloudinary.config";

function extractColorAsString(colors: ColorVariant[]) {
  if (colors[0].color.toLowerCase() === "default") return null;
  const colorsArray = colors.map((item) => item.color);
  const colorsString = colorsArray.join(",");
  return colorsString;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error401("Unauthorized");
    }

    const products = await db.product.findMany({
      include: {
        Image: true,
        Category: {
          select: {
            name: true,
          },
        },
      },
    });

    return success200({
      products: products.map((product) => ({
        id: product.id,
        slug: product.slug,
        title: product.title,
        description: product.description,
        shortDescription: product.shortDescription,
        category: product.Category.name,
        categoryId: product.categoryId,
        basePrice: product.basePrice,
        offerPrice: product.offerPrice,
        stock: product.stock,
        purchases: product.purchases,
        color: product.color,
        image: product.Image.find((image) =>
          image.imagePublicId.endsWith("-thumb"),
        )?.imagePublicId,
        earnings: product.earnings,
        variantName: product.variantName,
        variantValues: product.variantValues,
        keywords: product.keywords,
        createdAt: formateDate(product.createdAt),
      })),
    });
  } catch (error) {
    return error500({});
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error401("Unauthorized");
    }

    if (session.user.role !== "SUPERADMIN") {
      return error403();
    }

    const data: z.infer<typeof ZodProductSchema> = await req.json();
    if (!data) {
      return error400("Invalid data format.", {});
    }
    const result = ZodProductSchema.safeParse(data);

    if (result.success) {
      const promises = data.colors.flatMap((color) => [
        ...color.others.map((otherImages) =>
          uploadImage(otherImages, data.slug, color.color, uid()),
        ),
        uploadImage(color.thumbnail, data.slug, color.color, `${uid()}-thumb`),
      ]);

      const response = await Promise.all(promises);

      const product = await db.product.create({
        data: {
          title: data.title,
          slug: data.slug,
          shortDescription:
            data.shortDescription === "" ? null : data.shortDescription,
          description: data.description,
          basePrice: parseInt(data.basePrice),
          offerPrice: parseInt(data.offerPrice),
          stock: parseInt(data.stock),
          categoryId: parseInt(data.categoryId),
          color: extractColorAsString(data.colors),
          variantName: data.variantName,
          variantValues: data.variantValues?.replace(/\s/g, ""),
          keywords: data.keywords.replace(/\s/g, "").split(","),
          Image: {
            createMany: {
              data: response.map((res) => ({ imagePublicId: res.public_id })),
            },
          },
        },
      });
      return success200({ product: product });
    }

    if (result.error) {
      return error400("Invalid data format.", {});
    }
  } catch (error) {
    return error500({ product: null });
  }
}
