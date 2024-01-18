import axios from "@/config/axios.config";
import { headers } from "next/headers";
import { SingleOrderResProps } from "../../types/types";

export async function getOrderServer(oid: string) {
  const headerSequence = headers();
  const cookie = headerSequence.get("cookie");
  const { data } = await axios.get(`/api/orders/${oid}`, {
    headers: {
      Cookie: `${cookie}`,
    },
  });

  return data as SingleOrderResProps;
}
