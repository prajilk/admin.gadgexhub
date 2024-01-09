import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { error400, error401, error500, success200 } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error401("Unauthorized");
    }

    const data = await req.json();
    if (!data && !data.id && !data.status) {
      return error400("Invalid data format.", {});
    }

    await db.order.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      },
    });

    return success200({});
  } catch (error) {
    return error500({});
  }
}
