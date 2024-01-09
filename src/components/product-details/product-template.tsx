import Image from "next/image";
import ImageGallery from "./image-gallery";
import {
  capitalizeSearchParam,
  formatCurrency,
  formateDate,
} from "@/lib/utils";
import Link from "next/link";
import { Product } from "@prisma/client";
import { ColorVariantRes } from "@/lib/types/types";

type SingleProductProps = Omit<Product, "color"> & {
  colorVariants: ColorVariantRes[];
};

type ProductTemplateProps = {
  product: SingleProductProps;
  searchParams: { [key: string]: string | string[] | undefined };
};

const ProductTemplate = ({ product, searchParams }: ProductTemplateProps) => {
  const selectedColor = searchParams.color as string;
  const color = capitalizeSearchParam(selectedColor);

  const setDefaultVariant = () => {
    const urlVariant = product.colorVariants.find(
      (variant) => variant.color === color,
    );
    if (!urlVariant) {
      return product.colorVariants[0];
    }
    return urlVariant;
  };
  const variant = setDefaultVariant();

  return (
    <div className="relative mx-auto flex w-full max-w-[1440px] flex-col justify-evenly md:flex-row md:items-start">
      <div className="flex w-full flex-col gap-y-5 md:sticky md:top-28 md:w-[50%]">
        <ImageGallery images={variant.images!} />
      </div>
      <div className="flex w-full flex-col gap-y-1 py-8 md:sticky md:top-20 md:max-w-[344px] md:py-0 lg:max-w-[500px]">
        <h1 className="text-xl font-medium md:text-2xl">{product.title}</h1>
        <span className="text-sm">{variant.color}</span>
        <p>
          Product ID: <span className="font-semibold">{product.id}</span>
        </p>
        <p>
          Base Price:{" "}
          <span className="font-Roboto font-bold">
            {formatCurrency(product.basePrice)}
          </span>
        </p>
        <p>
          Offer Price:{" "}
          <span className="font-Roboto font-bold">
            {formatCurrency(product.offerPrice)}
          </span>
        </p>
        <p>
          Stock: <span className="font-semibold">{product.stock}</span>
        </p>
        <p>
          Created At:{" "}
          <span className="font-semibold">
            {formateDate(product.createdAt)}
          </span>
        </p>
        <p>
          Short Description:{" "}
          <span className="font-semibold">{product.shortDescription}</span>
        </p>
        <p>
          Keywords:{" "}
          {product.keywords.map((keyword, i) => (
            <span className="font-semibold" key={i}>
              {keyword}
              {i === product.keywords.length - 1 ? "" : ", "}
            </span>
          ))}
        </p>
        {product.colorVariants[0].color !== null && (
          <div className="space-y-3">
            <h1 className="text-xl font-medium">
              Colors: <span>{variant.color}</span>
            </h1>
            <ul className="flex flex-wrap gap-3">
              {product.colorVariants.map((_variant, i) => (
                <li
                  className={`h-fit flex-shrink-0 cursor-pointer overflow-hidden rounded-sm border-2 bg-gray-200 ${
                    _variant.images[0].id === variant.images[0].id
                      ? "border-gray-600"
                      : "border-transparent"
                  }`}
                  key={i}
                >
                  <Link
                    href={`?${new URLSearchParams({
                      color: _variant.color?.toLowerCase() as string,
                    })}`}
                  >
                    <div className="relative h-14 w-14">
                      <Image
                        alt="image-variant"
                        src={
                          process.env.NEXT_PUBLIC_IMAGE_URL +
                          _variant.images[0].url
                        }
                        fill
                        priority
                        sizes="(max-width: 999px) 72px, 60px"
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {product.stock === 0 && (
          <span className="mt-3 text-sm font-medium text-destructive">
            Currently out of stock
          </span>
        )}
        <div className="my-5 md:my-10">
          <h1 className="font-medium">Description</h1>
          <hr className="my-2" />
          <p className="text-sm font-light">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductTemplate;
