import Nav from "@/components/nav/nav";
import ProductTemplate from "@/components/product-details/product-template";
import Tabs from "@/components/product-details/tabs";
import { getProductServer } from "@/lib/api/products/get-product";
import { makeColorVariant } from "@/lib/utils";
import { notFound } from "next/navigation";

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: { pid: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const { product } = await getProductServer(params.pid).catch((_) =>
    notFound(),
  );

  return (
    <Nav>
      <Tabs pid={params.pid} product={product}>
        <ProductTemplate
          product={{
            basePrice: product.basePrice,
            categoryId: product.categoryId,
            createdAt: product.createdAt,
            description: product.description,
            earnings: product.earnings,
            keywords: product.keywords,
            offerPrice: product.offerPrice,
            purchases: product.purchases,
            shortDescription: product.shortDescription,
            stock: product.stock,
            slug: product.slug,
            title: product.title,
            variantName: product.variantName,
            variantValues: product.variantValues,
            id: product.id,
            colorVariants: makeColorVariant({
              colors: product.color,
              images: product.Image,
            }),
          }}
          searchParams={searchParams}
        />
      </Tabs>
    </Nav>
  );
};

export default ProductPage;
