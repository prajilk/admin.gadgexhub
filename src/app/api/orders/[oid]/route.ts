import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { error400, error401, error500, success200 } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { oid: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error401("Unauthorized");
    }

    const isGuest = session.user.role === "GUEST";

    const orderId = params.oid;

    if (!orderId) {
      return error400("Invalid data format.", {});
    }
    const order = await db.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        OrderItem: {
          include: {
            Product: {
              include: {
                Image: true,
              },
            },
          },
        },
        Address: true,
        Payment: true,
        User: true,
      },
    });

    if (!order) return success200({ order: null });

    return success200({
      order: {
        id: order.id,
        orderDate: order.orderDate,
        packedDate: order.packedDate,
        deliveredDate: order.deliveredDate,
        total: order.total,
        userId: order.userId,
        payment_verified: order.payment_verified,
        status: order.status === "placed" ? "pending" : order.status,
        addressId: order.addressId,
        User: {
          id: order.userId,
          name: order.User.name,
          email: order.User.email,
          phone: order.User.phone,
          image: order.User.image,
        },
        Address: order.Address,
        Payment: isGuest
          ? { ...order.Payment, rzr_order_id: null, rzr_payment_id: null }
          : order.Payment,
        OrderItem: order.OrderItem.map((item) => ({
          id: item.id,
          productId: item.productId,
          quantity: item.quantity,
          color: item.color,
          orderId: item.orderId,
          basePrice: item.basePrice,
          offerPrice: item.offerPrice,
          title: item.Product.title,
          Image: item.Product.Image.find((image) =>
            image.imagePublicId.endsWith("-thumb"),
          )?.imagePublicId,
        })),
      },
    });
  } catch (error) {
    return error500({});
  }
}
