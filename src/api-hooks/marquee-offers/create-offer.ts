import axios from "@/config/axios.config";
import { ZodMarqueeOfferSchema } from "@/lib/zod-schemas/schema";
import { MarqueeOffers } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export async function handleUpdate(
  values: z.infer<typeof ZodMarqueeOfferSchema>,
) {
  const { data: result } = await axios.post("/api/offers/marquee", {
    values,
  });
  return result as {
    status: boolean;
    newOffer: MarqueeOffers;
    message: string;
  };
}

export function useCreateOffer(onSuccess: () => void) {
  return useMutation({
    mutationFn: handleUpdate,
    onSuccess,
    onError: (error: any) => {
      if (error.response.status === 403)
        toast.error(error.response.data.message || "Error in saving offer!");
      else toast.error("Error in saving offer!");
    },
  });
}
