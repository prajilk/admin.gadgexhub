import axios from "@/config/axios.config";
import { CustomersResProps } from "@/lib/types/types";
import { useQuery } from "@tanstack/react-query";

async function getCustomersClient() {
  const { data } = await axios.get("/api/customers");
  return data as CustomersResProps;
}

export function useCustomers() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: getCustomersClient,
  });
}
