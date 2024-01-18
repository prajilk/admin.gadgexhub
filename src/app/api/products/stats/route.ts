import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { error401, error500, success200 } from "@/lib/utils";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error401("Unauthorized");
    }

    const productsCount = await db.product.count();
    const OutOfStockProductsCount = await db.product.count({
      where: { stock: { equals: 0 } },
    });
    return success200({ productsCount, OutOfStockProductsCount });
  } catch (error) {
    return error500({});
  }
}
