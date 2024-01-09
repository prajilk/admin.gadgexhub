import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { error400, error401, error500, success200 } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

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

    const orders = await db.orderItem.findMany({
      where: {
        productId: pid,
      },
      include: {
        Order: true,
      },
    });

    return success200({ orders });
  } catch (error) {
    return error500({});
  }
}
