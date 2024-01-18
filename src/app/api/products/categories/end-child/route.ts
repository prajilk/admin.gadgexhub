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

    const categories =
      await db.$queryRaw`SELECT * FROM "Category" WHERE id NOT IN (
  SELECT DISTINCT "parentId" FROM "Category" WHERE "parentId" IS NOT NULL
) ORDER BY name;`;
    if (!categories) return error500({ categories: null });
    return success200({ categories });
  } catch (error) {
    return error500({ categories: null });
  }
}
