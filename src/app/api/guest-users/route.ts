import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { error400, error401, error500, success200 } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

function formatGuestUsers(
  originalArray: { id: string; expirationDate: Date }[],
) {
  const today = new Date();

  return originalArray.map((item) => {
    const expirationDate = new Date(item.expirationDate);
    const isExpired = expirationDate < today;

    return {
      user_id: item.id,
      expiration_date: expirationDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      status: isExpired ? "expired" : "active",
    };
  });
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error401("Unauthorized");
    }

    const guestUsers = await db.guestUser.findMany();

    if (guestUsers.length === 0 && guestUsers)
      return success200({ guest_users: [] });

    return success200({ guest_users: formatGuestUsers(guestUsers) });
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
      return error401(
        `Unauthorized: You are not authorized to perform this action!`,
      );
    }

    const guestUserId = req.nextUrl.searchParams.get("id");
    if (!guestUserId) {
      return error400("Invalid data format.", {});
    }

    await db.guestUser.delete({
      where: {
        id: guestUserId,
      },
    });
    return success200({});
  } catch (error) {
    return error500({});
  }
}
