import { uploadBanner } from "@/config/cloudinary.config";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import {
  error400,
  error401,
  error403,
  error500,
  success200,
} from "@/lib/utils";
import { ZodBestDealSchema } from "@/lib/zod-schemas/schema";
import { BestDeal } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
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
      values: z.infer<typeof ZodBestDealSchema>;
      imageUrl: string;
    } = await req.json();

    if (!data || !data.values || !data.imageUrl) {
      return error400("Invalid data format.", {});
    }
    const result = ZodBestDealSchema.safeParse(data.values);

    if (result.success) {
      const response = await uploadBanner(data.imageUrl, "banner");
      const newDeal = await db.bestDeal.create({
        data: {
          price: Number(data.values.price),
          title: data.values.title,
          description: data.values.description,
          url: `/store/${data.values.slug}?pid=${data.values.id}`,
          imageUrl: response.secure_url,
        },
      });

      return success200({ newDeal });
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
      values: z.infer<typeof ZodBestDealSchema>;
      imageUrl: string;
    } = await req.json();

    if (!data || !data.id || !data.values || !data.imageUrl) {
      return error400("Invalid data format.", {});
    }
    const result = ZodBestDealSchema.safeParse(data.values);

    if (result.success) {
      let updatedResult: BestDeal;
      const payload = {
        price: Number(data.values.price),
        title: data.values.title,
        description: data.values.description,
        url: `/store/${data.values.slug}?pid=${data.values.id}`,
      };
      if (data.imageUrl.startsWith("data:")) {
        const response = await uploadBanner(data.imageUrl, "banner");
        updatedResult = await db.bestDeal.update({
          where: {
            id: data.id,
          },
          data: {
            ...payload,
            imageUrl: response.secure_url,
          },
        });
      } else {
        updatedResult = await db.bestDeal.update({
          where: {
            id: data.id,
          },
          data: payload,
        });
      }
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

    if (!id) return error400("Deal Id missing or invalid", {});

    await db.bestDeal.delete({
      where: {
        id: Number(id),
      },
    });

    return success200({});
  } catch (error) {
    return error500({});
  }
}
