import axios from "@/config/axios.config";
import { AddressResProps } from "@/lib/types/types";
import { useQuery } from "@tanstack/react-query";

async function getAddressesClient() {
  const { data } = await axios.get("/api/addresses");
  return data as AddressResProps;
}

export function useAddresses() {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: getAddressesClient,
  });
}
