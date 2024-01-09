import axios from "@/config/axios.config";
import { ProductResProps } from "@/lib/types/types";
import { headers } from "next/headers";

export async function getProductServer(pid: string) {
  const headerSequence = headers();
  const cookie = headerSequence.get("cookie");
  const { data } = await axios.get(`/api/products/${pid}`, {
    headers: {
      Cookie: `${cookie}`,
    },
  });

  return data as ProductResProps;
}
