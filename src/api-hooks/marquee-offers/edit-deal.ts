import axios from "@/config/axios.config";
import { ZodMarqueeOfferSchema } from "@/lib/zod-schemas/schema";
import { MarqueeOffers } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

async function handleUpdate({
  id,
  values,
}: {
  id: number;
  values: z.infer<typeof ZodMarqueeOfferSchema>;
}) {
  const { data } = await axios.put("/api/offers/marquee", {
    id,
    values,
  });
  return data as {
    status: boolean;
    updatedResult: MarqueeOffers;
    message: string;
  };
}

export function useUpdateMarqueeOffer(onSuccess: () => void) {
  return useMutation({
    mutationFn: handleUpdate,
    onSuccess: onSuccess,
    onError: (error: any) => {
      if (error.response.status === 403)
        toast.error(error.response.data.message || "Error in updating offer!");
      else toast.error("Error in updating offer!");
    },
  });
}
