import axios from "@/config/axios.config";
import { headers } from "next/headers";
import { OrderResProps } from "../../types/types";

export async function getOrdersServer() {
  const headerSequence = headers();
  const cookie = headerSequence.get("cookie");
  const { data } = await axios.get("/api/orders", {
    headers: {
      Cookie: `${cookie}`,
    },
  });

  return data as OrderResProps;
}
