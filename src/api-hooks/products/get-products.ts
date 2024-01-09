import axios from "@/config/axios.config";
import { ProductsResProps } from "@/lib/types/types";
import { useQuery } from "@tanstack/react-query";

async function getProductsClient(page = 1) {
  const { data } = await axios.get("/api/products", { params: { page } });
  return data as ProductsResProps;
}

export function useProducts(page?: number) {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProductsClient(page),
  });
}
