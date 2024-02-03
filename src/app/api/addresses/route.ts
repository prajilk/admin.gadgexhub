import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import {
  error400,
  error401,
  error403,
  error500,
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

    const addresses = await db.address.findMany();

    return success200({
      addresses: addresses.map((address) => ({
        id: address.address_id,
        user_id: address.userId,
        name: address.name,
        address: address.address,
        phone: address.phone,
        alt_phone: address.alternate_phone,
        district: address.district,
        state: address.state,
        pincode: address.pincode,
        landmark: address.landmark,
        locality: address.locality,
        is_default: address.is_default,
        is_deleted: address.is_deleted,
      })),
    });
  } catch (error) {
    return error500({});
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

    const addressId = req.nextUrl.searchParams.get("id");
    if (!addressId) {
      return error400("Invalid data format.", {});
    }

    await db.address.delete({
      where: {
        address_id: Number(addressId),
      },
    });
    return success200({});
  } catch (error) {
    return error500({});
  }
}
