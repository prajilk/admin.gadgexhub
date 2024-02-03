import { cloudinary } from "@/config/cloudinary.config";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import {
  error400,
  error401,
  error403,
  error500,
  success200,
} from "@/lib/utils";
import { ZodProductSchema } from "@/lib/zod-schemas/schema";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { z } from "zod";

// Function to delete a single image by public_id
async function deleteImage(publicId: string) {
  return cloudinary.api.delete_resources([publicId]);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { pid: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error401("Unauthorized");
    }

    const pid = params.pid;
    if (!pid || pid.length < 20) {
      return error400("Invalid product ID", {});
    }

    const product = await db.product.findUnique({
      where: {
        id: pid,
      },
      include: {
        Image: true,
      },
    });

    if (!product) {
      return error400("Invalid product ID", {});
    }

    return success200({ product });
  } catch (error) {
    return error500({});
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { pid: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error401("Unauthorized");
    }

    if (session.user.role !== "SUPERADMIN") {
      return error403();
    }

    const pid = params.pid;
    if (!pid || pid.length < 20) {
      return error400("Invalid product ID", {});
    }

    const data: z.infer<typeof ZodProductSchema> = await req.json();
    if (!data) {
      return error400("Invalid data format.", {});
    }
    const result = ZodProductSchema.safeParse(data);

    const dbProduct = await db.product.findUnique({
      where: {
        id: pid,
      },
      select: {
        slug: true,
      },
    });

    if (!dbProduct) return error400("Product with this ID not found", {});

    if (result.success) {
      if (dbProduct.slug !== data.slug) {
        // Move all images from the old cloudinary slug folder to new slug folder

        // Step 1: List resources in the old cloudinary slug folder
        const resources = await cloudinary.api.resources({
          type: "upload",
          prefix: `products/${dbProduct.slug}/`,
        });

        // Step 2: Move images to the new slug folder
        const moveTasks = resources.resources.map((resource: any) => {
          const publicId: string = resource.public_id;
          const newPublicId = `products/${data.slug}/${publicId
            .split("/")
            .slice(2)
            .join("/")}`;

          // Move the file to the new location
          return cloudinary.uploader.rename(publicId, newPublicId);
        });

        // Wait for all image movements to complete
        await Promise.all(moveTasks);

        await cloudinary.api.delete_folder(`products/${dbProduct.slug}`);

        // Update database records in bulk
        await db.$queryRaw`UPDATE "Image" SET "imagePublicId" = REPLACE("imagePublicId", ${dbProduct.slug}, ${data.slug}) WHERE "productId" = ${pid}`;
      }
      await db.product.update({
        where: {
          id: pid,
        },
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
          variantName: data.variantName,
          variantValues: data.variantValues?.replace(/\s/g, ""),
          keywords: data.keywords.replace(/\s/g, "").split(","),
        },
      });
      return success200({});
    }

    if (result.error) {
      return error400("Invalid data format.", {});
    }
  } catch (error) {
    console.log(error);
    return error500({});
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { pid: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error401("Unauthorized");
    }

    if (session.user.role !== "SUPERADMIN") {
      return error403();
    }

    const pid = params.pid;
    if (!pid || pid.length < 20) {
      return error400("Invalid product ID", {});
    }

    const dbProduct = await db.product.findUnique({
      where: {
        id: pid,
      },
      select: {
        slug: true,
      },
    });

    if (!dbProduct) return error400("Product with this ID not found", {});

    // List all resources (images) in the specified folder
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: `products/${dbProduct.slug}/`,
    });

    // Create an array of promises to delete each image
    const deletePromises: Promise<any>[] = result.resources.map(
      (resource: any) => deleteImage(resource.public_id),
    );
    deletePromises.push(
      db.product.delete({ where: { id: pid } }),
      cloudinary.api.delete_folder(`products/${dbProduct.slug}`),
    );

    // Use Promise.all to execute all delete promises in parallel
    await Promise.all(deletePromises);

    return success200({});
  } catch (error) {
    return error500({});
  }
}
