import axios from "@/config/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export async function handleDelete(id: number) {
  const { data: result } = await axios.delete("/api/addresses", {
    params: { id },
  });
  return result;
}

export function useDeleteAddress(onSuccess: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleDelete,
    onSuccess,
    onError: (error: any) => {
      if (error.response.status === 403)
        toast.error(
          error.response.data.message || "Error in deleting the address!",
        );
      else toast.error("Error in deleting the address!");
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["addresses"] }),
  });
}
