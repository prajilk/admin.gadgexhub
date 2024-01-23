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

    const [bestDeal, marqueeOffers, heroBanner] = await Promise.all([
      db.bestDeal.findMany().then((result) => result[0]),
      db.marqueeOffers.findMany(),
      db.heroBanner.findMany(),
    ]);

    return success200({
      deal: bestDeal,
      offers: marqueeOffers,
      banners: heroBanner,
    });
  } catch (error) {
    return error500({});
  }
}
