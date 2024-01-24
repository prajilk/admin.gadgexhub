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

    const customerId = params.customerId;

    if (!customerId) {
      return error400("Invalid data format.", {});
    }

    const customerOrders = await db.user.findUnique({
      where: {
        id: customerId,
      },
      include: {
        Order: true,
      },
    });

    if (!customerOrders) return error400("No customer found with this ID", {});

    return success200({
      customer: {
        id: customerOrders.id,
        name: customerOrders.name,
        email: customerOrders.email,
        gender: customerOrders.gender,
        phone: customerOrders.phone,
        image: customerOrders.image,
        createdAt: formateDate(customerOrders.createdAt),
        updatedAt: formateDate(customerOrders.updatedAt),
        lastLogin: formateDate(customerOrders.lastLogin),
      },
      orders: customerOrders.Order.map((order) => ({
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
