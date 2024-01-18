import axios from "@/config/axios.config";
import { Category } from "@/lib/types/types";
import { headers } from "next/headers";

export async function getCategoriesServer() {
  const headerSequence = headers();
  const cookie = headerSequence.get("cookie");
  const { data } = await axios.get("/api/products/categories", {
    headers: {
      Cookie: `${cookie}`,
    },
  });

  return data.categories as Category[] | null;
}
