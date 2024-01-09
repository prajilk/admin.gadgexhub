import { db } from "@/lib/prisma";
import { error500, success200 } from "@/lib/utils";

export async function GET() {
  try {
    const productsCount = await db.product.count();
    const OutOfStockProductsCount = await db.product.count({
      where: { stock: { equals: 0 } },
    });
    return success200({ productsCount, OutOfStockProductsCount });
  } catch (error) {
    return error500({});
  }
}
