import axios from "@/config/axios.config";
import { ZodProductSchema } from "@/lib/zod-schemas/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

async function handleCreate({
  pid,
  values,
}: {
  pid: string;
  values: z.infer<typeof ZodProductSchema>;
}) {
  const { data } = await axios.put(`/api/products/${pid}`, values);
  return data;
}

export function useEditProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleCreate,
    onSuccess: () => toast.success("Product edited successfully."),
    onError: (error: any) => {
      if (error.response.status === 403)
        toast.error(
          error.response.data.message || "Error in saving the product!",
        );
      else toast.error("Error in saving the product!");
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}
