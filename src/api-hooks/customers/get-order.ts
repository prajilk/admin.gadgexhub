import axios from "@/config/axios.config";
import { CustomerOrderResProps } from "@/lib/types/types";
import { useQuery } from "@tanstack/react-query";

async function getCustomerOrdersClient(customerId: string) {
  const { data } = await axios.get(`/api/orders/customer/${customerId}`);
  return data as CustomerOrderResProps;
}

export function useCustomerOrders(customerId: string) {
  return useQuery({
    queryKey: ["orders", "customerId"],
    queryFn: () => getCustomerOrdersClient(customerId),
  });
}
