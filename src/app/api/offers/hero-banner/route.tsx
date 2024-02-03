import { cloudinary, uploadBanner } from "@/config/cloudinary.config";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import {
  error400,
  error401,
  error403,
  error500,
  success200,
} from "@/lib/utils";
import {
  ZodHeroBannerSchema,
  ZodMarqueeOfferSchema,
} from "@/lib/zod-schemas/schema";
import { HeroBanner } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { uid } from "uid";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error401("Unauthorized");
    }

    if (session.user.role !== "SUPERADMIN") {
      return error403();
    }

    const data: {
      values: z.infer<typeof ZodHeroBannerSchema>;
      images: {
        image: string;
        imageSm: string;
      };
    } = await req.json();

    if (!data || !data.values || !data.images) {
      return error400("Invalid data format.", {});
    }
    const result = ZodHeroBannerSchema.safeParse(data.values);

    if (result.success) {
      const name = uid();
      const promises = [
        uploadBanner(data.images.image, "hero-banner", name),
        uploadBanner(data.images.imageSm, "hero-banner", name + "Sm"),
      ];
      const response = await Promise.all(promises);

      const newBanner = await db.heroBanner.create({
        data: {
          basePrice: Number(result.data.basePrice),
          description: result.data.description,
          offerPrice: Number(result.data.offerPrice),
          title: result.data.title,
          url: result.data.url,
          imageUrl: response.find((image) => !image.public_id.endsWith("Sm"))!
            .secure_url,
          imageUrlSm: response.find((image) => image.public_id.endsWith("Sm"))!
            .secure_url,
        },
      });

      return success200({ newBanner });
    }

    if (result.error) {
      return error400("Invalid data format.", {});
    }
  } catch (error) {
    return error500({});
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error401("Unauthorized");
    }

    if (session.user.role !== "SUPERADMIN") {
      return error403();
    }

    const data: {
      id: number;
      values: z.infer<typeof ZodHeroBannerSchema>;
      images: { image: string; imageSm: string };
    } = await req.json();

    if (!data || !data.id || !data.values || !data.images) {
      return error400("Invalid data format.", {});
    }
    const result = ZodHeroBannerSchema.safeParse(data.values);

    if (result.success) {
      const updatedResult = await db.heroBanner.update({
        where: {
          id: data.id,
        },
        data: {
          offerPrice: Number(data.values.offerPrice),
          basePrice: Number(data.values.basePrice),
          title: data.values.title,
          description: data.values.description,
          url: data.values.url,
        },
      });

      return success200({ updatedResult });
    }
    if (result.error) {
      return error400("Invalid data format.", {});
    }
  } catch (error) {
    return error500({});
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error401("Unauthorized");
    }

    if (session.user.role !== "SUPERADMIN") {
      return error403();
    }

    const id = req.nextUrl.searchParams.get("id");
    const publicId = req.nextUrl.searchParams.get("publicId");

    if (!id || !publicId)
      return error400("Banner Id or Public Id missing or invalid", {});

    const promises = [
      cloudinary.uploader.destroy(`hero-banner/${publicId}`),
      cloudinary.uploader.destroy(`hero-banner/${publicId}Sm`),
      db.heroBanner.delete({
        where: {
          id: Number(id),
        },
      }),
    ];

    await Promise.all(promises);

    return success200({});
  } catch (error) {
    return error500({});
  }
}
