import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ZodMarqueeOfferSchema } from "@/lib/zod-schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useCreateOffer } from "@/api-hooks/marquee-offers/create-offer";
import { Dispatch, SetStateAction, useEffect } from "react";
import { MarqueeOffers } from "@prisma/client";

const NewOfferForm = ({
  onClose,
  setOffersData,
}: {
  onClose: () => void;
  setOffersData: Dispatch<SetStateAction<MarqueeOffers[] | null>>;
}) => {
  const form = useForm<z.infer<typeof ZodMarqueeOfferSchema>>({
    resolver: zodResolver(ZodMarqueeOfferSchema),
  });

  function onSuccess() {
    toast.success("New Marquee offer added successfully.");
    onClose();
  }

  const mutation = useCreateOffer(onSuccess);

  useEffect(() => {
    if (mutation.data)
      setOffersData((prev) =>
        prev ? [...prev, mutation.data.newOffer] : [mutation.data.newOffer],
      );
  }, [mutation.data]);

  async function handleCreateOffer(
    data: z.infer<typeof ZodMarqueeOfferSchema>,
  ) {
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateOffer)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormControl>
                <Input
                  labelPlacement="outside"
                  classNames={{
                    label: "font-semibold",
                    inputWrapper: "min-h-unit-10",
                  }}
                  label="Title"
                  placeholder="Title"
                  {...field}
                  radius="sm"
                  size="sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormControl>
                <Input
                  labelPlacement="outside"
                  classNames={{
                    label: "font-semibold",
                    inputWrapper: "min-h-unit-10",
                  }}
                  label="Product URL"
                  placeholder="Product URL"
                  {...field}
                  radius="sm"
                  size="sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-6 flex items-center justify-end gap-4">
          <Button
            color="primary"
            type="submit"
            isLoading={mutation.isPending}
            isDisabled={!form.formState.isDirty}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewOfferForm;
