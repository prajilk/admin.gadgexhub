import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import {
  error400,
  error401,
  error403,
  error500,
  success200,
} from "@/lib/utils";
import { ZodProfileSchema } from "@/lib/zod-schemas/schema";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error401("Unauthorized");
    }

    if (session.user.role !== "SUPERADMIN") {
      return error403();
    }

    const adminData = await req.json();
    const result = ZodProfileSchema.safeParse(adminData);

    if (result.success) {
      await db.admin.update({
        where: { id: session.user.id },
        data: { name: result.data.name },
      });
      return success200({ name: result.data.name });
    }

    if (result.error) {
      return error400("Invalid data format.", { name: "" });
    }
  } catch (error) {
    return error500({});
  }
}
