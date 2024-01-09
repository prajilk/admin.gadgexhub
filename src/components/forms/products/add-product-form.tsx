"use client";

import { Form } from "@/components/ui/form";
import { ZodProductSchema } from "@/lib/zod-schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ProductDetails from "./components/product-details";
import ProductOptions from "./components/product-options";
import { useGlobalContext } from "@/context/store";
import { useAddProduct } from "@/api-hooks/products/add-product";
import { useEffect } from "react";

const AddProductForm = () => {
  const { colorVariants, setColorVariants } = useGlobalContext();

  const form = useForm<z.infer<typeof ZodProductSchema>>({
    resolver: zodResolver(ZodProductSchema),
    defaultValues: {
      title: "",
      slug: "",
      shortDescription: "",
      description: "",
      categoryId: "",
      stock: "",
      basePrice: "",
      offerPrice: "",
      colors: [{}],
      variantName: "",
      variantValues: "",
      keywords: "",
    },
  });

  useEffect(() => {
    setColorVariants([]);
  }, []);

  const onSuccess = () => {
    toast.success("Product added successfully.");
    form.reset();
    setColorVariants([]);
  };

  const add_product_mutation = useAddProduct(onSuccess);

  function setColors() {
    form.setValue("colors", colorVariants);
  }

  async function onSubmit(values: z.infer<typeof ZodProductSchema>) {
    add_product_mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 rounded-lg border bg-white shadow-md dark:bg-dark"
      >
        <div className="flex flex-col md:flex-row">
          <ProductDetails form={form} />
          <ProductOptions form={form} />
        </div>
        <div className="flex justify-end border-t p-5">
          <Button
            isLoading={add_product_mutation.isPending}
            type="submit"
            color="primary"
            onClick={setColors}
            isDisabled={!form.formState.isDirty}
          >
            Add Product
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddProductForm;
