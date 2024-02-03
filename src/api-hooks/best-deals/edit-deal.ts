import axios from "@/config/axios.config";
import { ZodBestDealSchema } from "@/lib/zod-schemas/schema";
import { BestDeal } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

async function handleUpdate({
  id,
  values,
  imageUrl,
}: {
  id: number;
  values: z.infer<typeof ZodBestDealSchema>;
  imageUrl: string;
}) {
  const { data } = await axios.put("/api/offers/best-deal", {
    id,
    values,
    imageUrl,
  });
  return data as { status: boolean; updatedResult: BestDeal; message: string };
}

export function useUpdateDeal(onSuccess: () => void) {
  return useMutation({
    mutationFn: handleUpdate,
    onSuccess: onSuccess,
    onError: (error: any) => {
      if (error.response.status === 403)
        toast.error(error.response.data.message || "Error in updating deal!");
      else toast.error("Error in updating deal!");
    },
  });
}
