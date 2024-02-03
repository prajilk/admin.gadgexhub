import axios from "@/config/axios.config";
import { CustomerResProps } from "@/lib/types/types";
import { ZodCustomerSchema } from "@/lib/zod-schemas/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

async function handleUpdate({
  id,
  values,
}: {
  id: string;
  values: z.infer<typeof ZodCustomerSchema>;
}) {
  const { data } = await axios.patch("/api/customers", { id, values });
  return data as CustomerResProps;
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleUpdate,
    onSuccess: () => toast.success("Customer details updated successfully."),
    onError: (error: any) => {
      if (error.response.status === 403)
        toast.error(
          error.response.data.message || "Error in updating customer!",
        );
      else toast.error("Error in updating customer!");
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
  });
}
