import axios from "@/config/axios.config";
import { Category } from "@/lib/types/types";
import { useQuery } from "@tanstack/react-query";

async function getCategoryEndChild() {
  const { data } = await axios.get("/api/products/categories/end-child");
  if (data && data.categories) return data.categories as Category[] | null;
  return null;
}

export function useCategoryEndChild() {
  return useQuery({
    queryKey: ["products", "categories", "end-child"],
    queryFn: getCategoryEndChild,
  });
}
