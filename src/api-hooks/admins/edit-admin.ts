import axios from "@/config/axios.config";
import { EditAdminResProps } from "@/lib/types/types";
import { ZodAdminSchema } from "@/lib/zod-schemas/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

interface UpdateAdminProps {
  id: string;
  values: z.infer<typeof ZodAdminSchema>;
}

export async function handleUpdate({ id, values }: UpdateAdminProps) {
  const { data: result } = await axios.patch("/api/admins", { id, values });
  return result as EditAdminResProps;
}

export function useUpdateAdmin(onSuccess: (data: EditAdminResProps) => void) {
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
