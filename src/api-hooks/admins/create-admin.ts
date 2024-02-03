import axios from "@/config/axios.config";
import { ZodAdminSchema } from "@/lib/zod-schemas/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export async function handleUpdate(values: z.infer<typeof ZodAdminSchema>) {
  const { data: result } = await axios.post("/api/admins", values);
  return result;
}

export function useCreateAdmin(onSuccess: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleUpdate,
    onSuccess,
    onError: (error: any) => {
      if (error.response.status === 403)
        toast.error(
          error.response.data.message || "Error in saving admin details!",
        );
      else toast.error("Error in saving admin details!");
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["admins"] }),
  });
}
