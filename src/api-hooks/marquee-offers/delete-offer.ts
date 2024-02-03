import axios from "@/config/axios.config";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export async function handleDelete(id: number) {
  const { data: result } = await axios.delete(`/api/offers/marquee?id=${id}`);
  return result;
}

export function useDeleteOffer(onSuccess: () => void) {
  return useMutation({
    mutationFn: handleDelete,
    onSuccess,
    onError: (error: any) => {
      if (error.response.status === 403)
        toast.error(
          error.response.data.message || "Error in deleting the offer!",
        );
      else toast.error("Error in deleting the offer!");
    },
  });
}
