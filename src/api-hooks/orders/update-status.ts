import axios from "@/config/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function handleUpdate({ id, status }: { id: string; status: string }) {
  const { data } = await axios.patch("/api/orders", { id, status });
  return data;
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleUpdate,
    onSuccess: () => toast.success("Order status updated successfully."),
    onError: (error: any) => {
      if (error.response.status === 401)
        toast.error(error.response.data.message || "Error in updating status!");
      else toast.error("Error in updating status!");
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["orders", "customerId"] }),
  });
}
