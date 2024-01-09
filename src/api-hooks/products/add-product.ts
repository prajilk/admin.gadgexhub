import axios from "@/config/axios.config";
import { AddProductResProps } from "@/lib/types/types";
import { ZodProductSchema } from "@/lib/zod-schemas/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

async function handleCreate(values: z.infer<typeof ZodProductSchema>) {
  const { data } = await axios.post("/api/products", values);
  return data as AddProductResProps;
}

export function useAddProduct(onSuccess: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleCreate,
    onSuccess,
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}
