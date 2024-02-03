import axios from "@/config/axios.config";
import { ZodHeroBannerSchema } from "@/lib/zod-schemas/schema";
import { HeroBanner } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export async function handleUpdate({
  values,
  images,
}: {
  values: z.infer<typeof ZodHeroBannerSchema>;
  images: { image: string; imageSm: string };
}) {
  const { data: result } = await axios.post("/api/offers/hero-banner", {
    values,
    images,
  });
  return result as {
    status: boolean;
    newBanner: HeroBanner;
    message: string;
  };
}

export function useAddBanner(onSuccess: () => void) {
  return useMutation({
    mutationFn: handleUpdate,
    onSuccess,
    onError: (error: any) => {
      if (error.response.status === 403)
        toast.error(error.response.data.message || "Error in saving banner!");
      else toast.error("Error in saving banner!");
    },
  });
}
