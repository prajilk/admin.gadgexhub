import axios from "@/config/axios.config";
import { Category } from "@/lib/types/types";
import { useQuery } from "@tanstack/react-query";

async function getCategories() {
  const { data } = await axios.get("/api/products/categories");
  if (data && data.categories) return data.categories as Category[] | null;
  return null;
}

export function useCategories() {
  return useQuery({
    queryKey: ["products", "categories"],
    queryFn: getCategories,
  });
}
