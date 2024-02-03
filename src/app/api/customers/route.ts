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
import {
  ZodCustomerSchema,
  ZodCustomerSchemaWithPassword,
} from "@/lib/zod-schemas/schema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error401("Unauthorized");
    }

    const customers = await db.user.findMany();

    if (customers.length === 0 && customers)
      return success200({ customers: [] });

    return success200({
      customers: customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        gender: customer.gender,
        createdAt: formateDate(customer.createdAt),
        updatedAt: formateDate(customer.updatedAt),
        lastLogin: formateDate(customer.lastLogin),
        image: customer.image,
      })),
    });
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
    if (!data || !data.id || !data.values) {
      return error400("Invalid data format.", {});
    }
    const result = ZodCustomerSchema.safeParse(data.values);

    if (result.success) {
      const updateData: {
        email: string;
        name: string;
        phone?: string;
        gender?: string;
        password?: string;
      } = {
        email: result.data.email,
        name: result.data.name,
        phone: result.data.phone,
        gender: result.data.gender,
      };

      if (result.data.password && result.data.password !== "") {
        updateData.password = await bcrypt.hash(result.data.password, 10);
      }

      await db.user.update({
        where: { id: data.id },
        data: updateData,
      });

      return success200({});
    }

    if (result.error) {
      return error400("Invalid data format.", {});
    }
  } catch (error) {
    return error500({});
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
    const result = ZodCustomerSchemaWithPassword.safeParse(data);

    if (result.success) {
      const customerExists = await db.user.findUnique({
        where: { email: result.data.email },
      });

      // Check is email is already exists
      if (customerExists) {
        return NextResponse.json(
          {
            success: false,
            message: "Customer with this email already exists.",
          },
          { status: 409 },
        );
      }
      const passwordHash = await bcrypt.hash(result.data.password, 10);

      const newCustomer = await db.user.create({
        data: {
          email: result.data.email,
          name: result.data.name,
          password: passwordHash,
          gender: result.data.gender,
          phone: result.data.phone,
        },
      });

      return success200({
        user: {
          id: newCustomer.id,
          email: newCustomer.email,
          name: newCustomer.name,
          gender: newCustomer.gender,
          phone: newCustomer.phone,
        },
      });
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

    const customerId = req.nextUrl.searchParams.get("id");
    if (!customerId) {
      return error400("Invalid data format.", {});
    }

    await db.user.delete({
      where: {
        id: customerId,
      },
    });
    return success200({});
  } catch (error) {
    return error500({});
  }
}
