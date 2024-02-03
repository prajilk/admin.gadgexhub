import axios from "@/config/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export async function handleDelete(id: string) {
  const { data: result } = await axios.delete("/api/guest-users", {
    params: { id },
  });
  return result;
}

export function useDeleteGuestUser(onSuccess: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleDelete,
    onSuccess,
    onError: (error: any) => {
      if (error.response.status === 403)
        toast.error(
          error.response.data.message || "Error in deleting the guest user!",
        );
      else toast.error("Error in deleting the guest user!");
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["guest-users"] }),
  });
}
