import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import {
  error400,
  error401,
  error403,
  error500,
  success200,
} from "@/lib/utils";
import { ZodMarqueeOfferSchema } from "@/lib/zod-schemas/schema";
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
      values: z.infer<typeof ZodMarqueeOfferSchema>;
    } = await req.json();

    if (!data || !data.values) {
      return error400("Invalid data format.", {});
    }
    const result = ZodMarqueeOfferSchema.safeParse(data.values);

    if (result.success) {
      const newOffer = await db.marqueeOffers.create({
        data: {
          title: result.data.title,
          url: result.data.url,
        },
      });

      return success200({ newOffer });
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
      values: z.infer<typeof ZodMarqueeOfferSchema>;
    } = await req.json();

    if (!data || !data.id || !data.values) {
      return error400("Invalid data format.", {});
    }
    const result = ZodMarqueeOfferSchema.safeParse(data.values);

    if (result.success) {
      const updatedResult = await db.marqueeOffers.update({
        where: {
          id: data.id,
        },
        data: {
          title: result.data.title,
          url: result.data.url,
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

    if (!id) return error400("Offer Id missing or invalid", {});

    await db.marqueeOffers.delete({
      where: {
        id: Number(id),
      },
    });

    return success200({});
  } catch (error) {
    return error500({});
  }
}
