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
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error401("Unauthorized");
    }

    const orders = await db.order.findMany({
      include: {
        _count: {
          select: {
            OrderItem: true,
          },
        },
      },
    });

    const formattedOrders = orders.map((order) => ({
      id: order.id,
      payment_verified: order.payment_verified,
      status: order.status === "placed" ? "pending" : order.status,
      total: order.total,
      userId: order.userId,
      addressId: order.addressId,
      itemsCount: order._count.OrderItem,
      orderDate: formateDate(order.orderDate),
    }));

    return success200({ orders: formattedOrders });
  } catch (error) {
    return error500({});
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error401("Unauthorized");
    }

    if (session.user.role !== "SUPERADMIN") {
      return error403();
    }

    const data = await req.json();
    if (!data && !data.id && !data.status) {
      return error400("Invalid data format.", {});
    }

    const dbData: any = {
      status: data.status,
    };

    if (data.status === "ongoing") {
      dbData.packedDate = new Date();
      dbData.deliveredDate = null;
    } else if (data.status === "delivered") {
      dbData.deliveredDate = new Date();
    } else {
      dbData.packedDate = null;
      dbData.deliveredDate = null;
    }

    await db.order.update({
      where: {
        id: data.id,
      },
      data: dbData,
    });

    return success200({});
  } catch (error) {
    return error500({});
  }
}
