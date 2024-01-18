import axios from "@/config/axios.config";
import { ZodCategorySchema } from "@/lib/zod-schemas/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

async function handleCreate(values: z.infer<typeof ZodCategorySchema>) {
  const { data } = await axios.post("/api/products/categories", values);
  return data;
}

export function useCreateCategory(onSuccess: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleCreate,
    onSuccess,
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["products", "categories"] }),
  });
}
