import axios from "@/config/axios.config";
import { headers } from "next/headers";
import { ProductsResProps } from "../../types/types";

export async function getProductsServer() {
  const headerSequence = headers();
  const cookie = headerSequence.get("cookie");
  const { data } = await axios.get("/api/products", {
    headers: {
      Cookie: `${cookie}`,
    },
  });

  return data as ProductsResProps;
}
