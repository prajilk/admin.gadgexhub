import axios from "@/config/axios.config";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export async function handleDelete({
  id,
  publicId,
}: {
  id: number;
  publicId: string;
}) {
  const { data: result } = await axios.delete(
    `/api/offers/hero-banner?id=${id}&publicId=${publicId}`,
  );
  return result;
}

export function useDeleteBanner(onSuccess: () => void) {
  return useMutation({
    mutationFn: handleDelete,
    onSuccess,
    onError: (error: any) => {
      if (error.response.status === 403)
        toast.error(
          error.response.data.message || "Error in deleting the banner!",
        );
      else toast.error("Error in deleting the banner!");
    },
  });
}
