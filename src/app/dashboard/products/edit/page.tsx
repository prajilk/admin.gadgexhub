import EditProductForm from "@/components/forms/products/edit-product-form";
import Nav from "@/components/nav/nav";
import { getProductServer } from "@/lib/api/products/get-product";
import { EditProductResProps } from "@/lib/types/types";
import { makeColorVariantForEdit } from "@/lib/utils";

const EditProduct = async ({
  searchParams,
}: {
  searchParams: { pid?: string };
}) => {
  if (!searchParams.pid) return;
  const data = await getProductServer(searchParams.pid);
  const formattedData: EditProductResProps = {
    ...data,
    product: {
      id: data.product.id,
      title: data.product.title,
      slug: data.product.slug,
      shortDescription: data.product.shortDescription,
      description: data.product.description,
      categoryId: data.product.categoryId,
      stock: data.product.stock,
      basePrice: data.product.basePrice,
      offerPrice: data.product.offerPrice,
      variantName: data.product.variantName,
      variantValues: data.product.variantValues,
      keywords: data.product.keywords,
      colorVariants: makeColorVariantForEdit({
        colors: data.product.color,
        images: data.product.Image,
      }),
    },
  };

  return (
    <Nav>
      <div className="flex w-full flex-col justify-start">
        <div className="w-full">
          <h1 className="m-2 text-xl font-semibold">
            {searchParams.pid ? "Edit Product" : "Missing Product ID!"}
          </h1>
          {searchParams.pid && (
            <EditProductForm product={formattedData.product} />
          )}
        </div>
      </div>
    </Nav>
  );
};

export default EditProduct;
