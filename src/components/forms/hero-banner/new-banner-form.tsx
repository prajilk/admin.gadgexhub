import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ZodHeroBannerSchema } from "@/lib/zod-schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Info, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ImagePicker from "@/components/offers/image-picker";
import { HeroBanner } from "@prisma/client";
import { toast } from "sonner";
import { useAddBanner } from "@/api-hooks/hero-banners/add-new-banner";

const NewBannerForm = ({
  onClose,
  setBannerData,
}: {
  onClose: () => void;
  setBannerData: Dispatch<SetStateAction<HeroBanner[] | null>>;
}) => {
  const [image, setImage] = useState("");
  const [imageSm, setImageSm] = useState("");

  const form = useForm<z.infer<typeof ZodHeroBannerSchema>>({
    resolver: zodResolver(ZodHeroBannerSchema),
    defaultValues: {
      basePrice: "",
      description: "",
      offerPrice: "",
      title: "",
      url: "",
    },
  });

  function onSuccess() {
    toast.success("New Banner added successfully.");
    onClose();
  }

  const mutation = useAddBanner(onSuccess);

  useEffect(() => {
    if (mutation.data) {
      setBannerData((prev) =>
        prev ? [...prev, mutation.data.newBanner] : [mutation.data.newBanner],
      );
    }
  }, [mutation.data]);

  async function handleCreateBanner(data: z.infer<typeof ZodHeroBannerSchema>) {
    mutation.mutate({ values: data, images: { image, imageSm } });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateBanner)}
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
          name="description"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormControl>
                <Textarea
                  placeholder="Description"
                  label="Description"
                  labelPlacement="outside"
                  radius="sm"
                  size="sm"
                  classNames={{
                    label: "font-semibold",
                    inputWrapper: "min-h-unit-10",
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="basePrice"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormControl>
                <Input
                  labelPlacement="outside"
                  classNames={{
                    label: "font-semibold",
                    inputWrapper: "min-h-unit-10",
                  }}
                  label="Base Price"
                  placeholder="Base Price"
                  type="number"
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
          name="offerPrice"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormControl>
                <Input
                  labelPlacement="outside"
                  classNames={{
                    label: "font-semibold",
                    inputWrapper: "min-h-unit-10",
                  }}
                  label="Offer Price"
                  placeholder="Offer Price"
                  type="number"
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
        <div className="relative w-full space-y-2">
          <span className="flex items-center gap-1 text-sm font-medium text-zinc-500">
            <Info size={15} />
            Upload <b>Large</b> version of the Banner Image
          </span>
          {image ? (
            <>
              <Image src={image} alt="" className="aspect-video" />
              <Button
                isIconOnly
                size="sm"
                color="danger"
                startContent={<Trash2 size={15} />}
                radius="full"
                onClick={() => setImage("")}
                className="absolute -right-2 -top-2 z-10"
              />
            </>
          ) : (
            <ImagePicker setImage={setImage} />
          )}
        </div>
        <div className="relative w-full space-y-2">
          <span className="flex items-center gap-1 text-sm font-medium text-zinc-500">
            <Info size={15} />
            Upload <b>Small</b> version of the Banner Image
          </span>
          {imageSm ? (
            <>
              <Image src={imageSm} alt="" className="aspect-square" />
              <Button
                isIconOnly
                size="sm"
                color="danger"
                startContent={<Trash2 size={15} />}
                radius="full"
                onClick={() => setImageSm("")}
                className="absolute -right-2 -top-2 z-10"
              />
            </>
          ) : (
            <ImagePicker setImage={setImageSm} />
          )}
        </div>
        <div className="mt-6 flex items-center justify-end gap-4">
          <Button
            color="primary"
            type="submit"
            isLoading={mutation.isPending}
            isDisabled={!image || !imageSm}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewBannerForm;
