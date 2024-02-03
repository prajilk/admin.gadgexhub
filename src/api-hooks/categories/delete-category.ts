import axios from "@/config/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export async function handleDelete(cid: number) {
  const { data: result } = await axios.delete("/api/products/categories", {
    params: { cid },
  });
  return result;
}

export function useDeleteCategory(onSuccess: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleDelete,
    onSuccess,
    onError: (error: any) => {
      if (error.response.status === 403)
        toast.error(
          error.response.data.message || "Error in deleting the category!",
        );
      else toast.error("Error in deleting the category!");
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["products", "categories"] }),
  });
}
