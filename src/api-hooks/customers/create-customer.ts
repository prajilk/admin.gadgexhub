import axios from "@/config/axios.config";
import { CustomerResProps } from "@/lib/types/types";
import { ZodCustomerSchema } from "@/lib/zod-schemas/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

async function handleUpdate(values: z.infer<typeof ZodCustomerSchema>) {
  const { data } = await axios.post("/api/customers", values);
  return data as CustomerResProps;
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleUpdate,
    onSuccess: () => toast.success("New customer created successfully."),
    onError: (error: any) => {
      if (error.response.status === 403 || error.response.status === 409)
        toast.error(
          error.response.data.message || "Error in creating customer!",
        );
      else toast.error("Error in creating customer!");
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
  });
}
