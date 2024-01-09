import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import {
  error400,
  error401,
  error500,
  formateDate,
  success200,
} from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { customerId: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error401("Unauthorized");
    }

    if (session.user.role !== "SUPERADMIN") {
      return error401(
        `Unauthorized: You are not authorized to perform this action!`,
      );
    }

    const customerId = params.customerId;

    if (!customerId) {
      return error400("Invalid data format.", {});
    }
    const customerOrders = await db.order.findMany({
      where: {
        userId: customerId,
      },
      include: {
        User: true,
      },
    });

    return success200({
      customer: {
        id: customerOrders[0].User.id,
        name: customerOrders[0].User.name,
        email: customerOrders[0].User.email,
        gender: customerOrders[0].User.gender,
        phone: customerOrders[0].User.phone,
        image: customerOrders[0].User.image,
        createdAt: formateDate(customerOrders[0].User.createdAt),
        updatedAt: formateDate(customerOrders[0].User.updatedAt),
        lastLogin: formateDate(customerOrders[0].User.lastLogin),
      },
      orders: customerOrders.map((order) => ({
        oid: order.id,
        amount: order.total,
        date: formateDate(order.orderDate),
        payment: order.payment_verified,
        status: order.status === "placed" ? "pending" : order.status,
        addressId: order.addressId,
      })),
    });
  } catch (error) {
    return error500({});
  }
}
