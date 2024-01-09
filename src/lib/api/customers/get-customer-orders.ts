import axios from "@/config/axios.config";
import { CustomerOrderResProps } from "@/lib/types/types";
import { headers } from "next/headers";

export async function getCustomerOrdersServer(customerId: string) {
  const headerSequence = headers();
  const cookie = headerSequence.get("cookie");
  const { data } = await axios.get(`/api/orders/${customerId}`, {
    headers: {
      Cookie: `${cookie}`,
    },
  });

  return data as CustomerOrderResProps;
}
