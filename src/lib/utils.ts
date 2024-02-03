import { type ClassValue, clsx } from "clsx";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";
import {
  ColorVariantRes,
  ColorVariantReturn,
  MakeColorVariant,
} from "./types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function formatCurrency(amount: number) {
  const currencyFormatter = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  const price = currencyFormatter.format(amount);
  return price.toString().split(".")[0];
}

function textTruncate(text: string, length: number) {
  if (text.length > length) {
    return text.slice(0, length) + "...";
  }
  return text;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function error400(message: string, data: { [key: string]: any }) {
  const json = {
    success: false,
    message,
  };
  const resJson = Object.assign({}, json, data);
  return NextResponse.json(resJson, { status: 400 });
}

function error404(message: string, data: { [key: string]: any }) {
  const json = {
    success: false,
    message,
  };
  const resJson = Object.assign({}, json, data);
  return NextResponse.json(resJson, { status: 404 });
}

function error401(message: string) {
  const json = {
    success: false,
    message,
  };
  return NextResponse.json(json, { status: 401 });
}

function error403() {
  const json = {
    success: false,
    message: "Forbidden: You are not authorized to perform this action!",
  };
  return NextResponse.json(json, { status: 403 });
}

function error500(data: { [key: string]: any }) {
  const json = {
    success: false,
    message: "Something went wrong. SVR",
  };
  const resJson = Object.assign({}, json, data);
  return NextResponse.json(resJson, { status: 500 });
}

function success200(data: { [key: string]: any }) {
  const json = {
    success: true,
    message: "Success",
  };
  const resJson = Object.assign({}, json, data);
  return NextResponse.json(resJson, { status: 200 });
}

function formateDate(date: Date | string) {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function capitalizeSearchParam(text: string) {
  if (!text) return null;

  const words = text.split(" ");
  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the words back together with hyphens
  const capitalizedText = capitalizedWords.join(" ");

  return capitalizedText;
}

function makeColorVariantForEdit({ colors, images }: MakeColorVariant) {
  const output: ColorVariantReturn[] = [];
  if (colors !== null) {
    const colorNames = colors.split(",");

    colorNames.forEach((colorName) => {
      const colorImages = images.filter((img) =>
        img.imagePublicId.includes(colorName),
      );

      // Create the output object for the color
      const colorObject = {
        color: colorName,
        thumbnail: {
          id: colorImages.find((img) => img.imagePublicId.endsWith("-thumb"))
            ?.id,
          url: colorImages.find((img) => img.imagePublicId.endsWith("-thumb"))
            ?.imagePublicId,
        },
        others: colorImages
          .filter((img) => !img.imagePublicId.endsWith("-thumb"))
          .map((value) => ({ id: value.id, url: value.imagePublicId })),
      };

      output.push(colorObject);
    });
  } else {
    const noColorVariantObject = {
      color: null,
      thumbnail: {
        id: images.find((img) => img.imagePublicId.endsWith("-thumb"))?.id,
        url: images.find((img) => img.imagePublicId.endsWith("-thumb"))
          ?.imagePublicId,
      },
      others: images
        .filter((img) => !img.imagePublicId.endsWith("-thumb"))
        .map((value) => ({ id: value.id, url: value.imagePublicId })),
    };

    output.push(noColorVariantObject);
  }

  return output;
}

function makeColorVariant({ colors, images }: MakeColorVariant) {
  const output: ColorVariantRes[] = [];
  if (colors !== null) {
    const colorNames = colors.split(",");

    colorNames.forEach((colorName) => {
      const colorImages = images.filter((img) =>
        img.imagePublicId.includes(colorName),
      );

      // Create the output object for the color
      const colorObject = {
        color: colorName,
        images: colorImages
          .map((img) => ({
            id: img.id,
            url: img.imagePublicId,
          }))
          .reverse(),
      };

      output.push(colorObject);
    });
  } else {
    const noColorVariantObject = {
      color: null,
      images: images
        .map((img) => ({
          id: img.id,
          url: img.imagePublicId,
        }))
        .reverse(),
    };
    output.push(noColorVariantObject);
  }

  return output.reverse();
}

export {
  formatCurrency,
  textTruncate,
  error400,
  error404,
  error401,
  error403,
  error500,
  success200,
  capitalize,
  formateDate,
  capitalizeSearchParam,
  makeColorVariant,
  makeColorVariantForEdit,
};
