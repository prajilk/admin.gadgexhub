import axios from "@/config/axios.config";
import { AdminProfileResProps } from "@/lib/types/types";
import { ZodProfileSchema } from "@/lib/zod-schemas/schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

async function handleUpdate(values: z.infer<typeof ZodProfileSchema>) {
  const { data } = await axios.patch("/api/profile", values);
  return data as AdminProfileResProps;
}

export function useUpdateProfile(
  onSuccess: (data: AdminProfileResProps) => void,
) {
  return useMutation({
    mutationFn: handleUpdate,
    onSuccess,
    onError: (error: any) => {
      if (error.response.status === 403)
        toast.error(
          error.response.data.message || "Error in updating profile!",
        );
      else toast.error("Error in updating profile!");
    },
  });
}
