import axios from "@/config/axios.config";
import { DealsAndOffersRes } from "@/lib/types/types";
import { headers } from "next/headers";

export async function getDealsAndOffers() {
  const headerSequence = headers();
  const cookie = headerSequence.get("cookie");
  const { data } = await axios.get("/api/offers", {
    headers: {
      Cookie: `${cookie}`,
    },
  });

  return data as DealsAndOffersRes;
}
