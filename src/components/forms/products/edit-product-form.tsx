"use client";

import { Form } from "@/components/ui/form";
import { ZodProductSchema } from "@/lib/zod-schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProductDetails from "./components/product-details";
import ProductOptions from "./components/product-options";
import { useGlobalContext } from "@/context/store";
import { useEffect } from "react";
import { useEditProduct } from "@/api-hooks/products/edit-product";
import { EditProductProps } from "@/lib/types/types";

const EditProductForm = ({ product }: { product: EditProductProps }) => {
  const { colorVariants, setColorVariants } = useGlobalContext();

  const form = useForm<z.infer<typeof ZodProductSchema>>({
    resolver: zodResolver(ZodProductSchema),
    defaultValues: {
      title: product.title,
      slug: product.slug,
      shortDescription: product.shortDescription || "",
      description: product.description,
      categoryId: product.categoryId.toString(),
      stock: product.stock.toString(),
      basePrice: product.basePrice.toString(),
      offerPrice: product.offerPrice.toString(),
      colors: [{}],
      variantName: product.variantName || "",
      variantValues: product.variantValues || "",
      keywords: product.keywords.join(","),
    },
  });

  useEffect(() => {
    setColorVariants(
      product.colorVariants.map((color) => ({
        color: color.color || "Default",
        thumbnail: process.env.NEXT_PUBLIC_IMAGE_URL + color.thumbnail.url!,
        others: color.others.map(
          (val) => process.env.NEXT_PUBLIC_IMAGE_URL + val.url,
        ),
      })),
    );
  }, []);

  const edit_product_mutation = useEditProduct();

  function setColors() {
    form.setValue("colors", colorVariants);
  }

  async function onSubmit(values: z.infer<typeof ZodProductSchema>) {
    edit_product_mutation.mutate({ pid: product.id, values });
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
            isLoading={edit_product_mutation.isPending}
            type="submit"
            color="primary"
            onClick={setColors}
          >
            Edit Product
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProductForm;
