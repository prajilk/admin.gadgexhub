import axios from "@/config/axios.config";
import { EditCategoryRes } from "@/lib/types/types";
import { ZodCategorySchema } from "@/lib/zod-schemas/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

interface UpdateAdminProps {
  id: number;
  values: z.infer<typeof ZodCategorySchema>;
}

export async function handleUpdate({ id, values }: UpdateAdminProps) {
  const { data: result } = await axios.put("/api/products/categories", {
    id,
    values,
  });
  return result as EditCategoryRes;
}

export function useUpdateCategory(onSuccess: (data: EditCategoryRes) => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleUpdate,
    onSuccess,
    onError: (error: any) => {
      if (error.response.status === 403)
        toast.error(error.response.data.message || "Error in saving category!");
      else toast.error("Error in saving category!");
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["products", "categories"] }),
  });
}
