import axios from "@/config/axios.config";
import { CustomersResProps } from "@/lib/types/types";
import { headers } from "next/headers";

export async function getCustomersServer() {
  const headerSequence = headers();
  const cookie = headerSequence.get("cookie");
  const { data } = await axios.get("/api/customers", {
    headers: {
      Cookie: `${cookie}`,
    },
  });

  return data as CustomersResProps;
}
