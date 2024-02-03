import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import {
  error400,
  error401,
  error403,
  error500,
  success200,
} from "@/lib/utils";
import {
  ZodAdminSchema,
  ZodAdminSchemaWithPassword,
} from "@/lib/zod-schemas/schema";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error401("Unauthorized");
    }

    const admins = await db.admin.findMany({
      where: {
        role: { not: "SUPERADMIN" },
      },
      select: {
        email: true,
        id: true,
        name: true,
        role: true,
      },
    });
    return success200({ admins });
  } catch (error) {
    return error500({ admins: null });
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
    if (!data || !data.id || !data.values) {
      return error400("Invalid data format.", {});
    }
    const result = ZodAdminSchema.safeParse(data.values);

    if (result.success) {
      const updateData: {
        email: string;
        name: string;
        role: "ADMIN" | "GUEST";
        password?: string;
      } = {
        email: result.data.email,
        name: result.data.name,
        role: result.data.role,
      };

      if (result.data.password && result.data.password !== "") {
        updateData.password = await bcrypt.hash(result.data.password, 10);
      }

      await db.admin.update({
        where: { id: data.id },
        data: updateData,
      });

      return success200({});
    }

    if (result.error) {
      return error400("Invalid data format.", {});
    }
  } catch (error) {
    return error500({ admin: null });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error401("Unauthorized");
    }

    if (session.user.role !== "SUPERADMIN") {
      return error403();
    }

    const data = await req.json();
    if (!data) {
      return error400("Invalid data format.", {});
    }
    const result = ZodAdminSchemaWithPassword.safeParse(data);

    if (result.success) {
      await db.admin.create({
        data: {
          email: result.data.email,
          name: result.data.name,
          password: await bcrypt.hash(result.data.password, 10),
          role: result.data.role,
        },
      });
      return success200({});
    }

    if (result.error) {
      return error400("Invalid data format.", {});
    }
  } catch (error) {
    return error500({ admin: null });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error401("Unauthorized");
    }

    if (session.user.role !== "SUPERADMIN") {
      return error403();
    }

    const adminId = req.nextUrl.searchParams.get("id");
    if (!adminId) {
      return error400("Invalid data format.", {});
    }

    await db.admin.delete({
      where: {
        id: adminId,
      },
    });
    return success200({});
  } catch (error) {
    return error500({});
  }
}
