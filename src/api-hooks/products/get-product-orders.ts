import axios from "@/config/axios.config";
import { ProductOrdersResProps } from "@/lib/types/types";
import { useQuery } from "@tanstack/react-query";

async function getProductOrdersClient(pid: string) {
  const { data } = await axios.get(`/api/products/${pid}/orders`);
  return data as ProductOrdersResProps;
}

export function useProductOrders(pid: string) {
  return useQuery({
    queryKey: ["products", "orders"],
    queryFn: () => getProductOrdersClient(pid),
  });
}
