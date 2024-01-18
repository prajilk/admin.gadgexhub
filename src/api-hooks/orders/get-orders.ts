import axios from "@/config/axios.config";
import { OrderResProps } from "@/lib/types/types";
import { useQuery } from "@tanstack/react-query";

async function getOrdersClient() {
  const { data } = await axios.get("/api/orders");
  return data as OrderResProps;
}

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersClient,
  });
}
