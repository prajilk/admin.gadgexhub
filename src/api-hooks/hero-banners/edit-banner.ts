import axios from "@/config/axios.config";
import { ZodHeroBannerSchema } from "@/lib/zod-schemas/schema";
import { HeroBanner } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

async function handleUpdate({
  id,
  values,
  images,
}: {
  id: number;
  values: z.infer<typeof ZodHeroBannerSchema>;
  images: { image: string; imageSm: string };
}) {
  const { data } = await axios.put("/api/offers/hero-banner", {
    id,
    values,
    images,
  });
  return data as {
    status: boolean;
    updatedResult: HeroBanner;
    message: string;
  };
}

export function useUpdateHeroBanner(onSuccess: () => void) {
  return useMutation({
    mutationFn: handleUpdate,
    onSuccess: onSuccess,
    onError: (error: any) => {
      if (error.response.status === 403)
        toast.error(error.response.data.message || "Error in updating banner!");
      else toast.error("Error in updating banner!");
    },
  });
}
