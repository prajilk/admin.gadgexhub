import axios from "@/config/axios.config";
import { ZodBestDealSchema } from "@/lib/zod-schemas/schema";
import { BestDeal } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export async function handleUpdate({
  values,
  imageUrl,
}: {
  values: z.infer<typeof ZodBestDealSchema>;
  imageUrl: string;
}) {
  const { data: result } = await axios.post("/api/offers/best-deal", {
    values,
    imageUrl,
  });
  return result as {
    status: boolean;
    newDeal: BestDeal;
    message: string;
  };
}

export function useAddDeal(onSuccess: () => void) {
  return useMutation({
    mutationFn: handleUpdate,
    onSuccess,
    onError: (error: any) => {
      if (error.response.status === 403)
        toast.error(error.response.data.message || "Error in saving deal!");
      else toast.error("Error in saving deal!");
    },
  });
}
