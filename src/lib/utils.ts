import { type ClassValue, clsx } from "clsx";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";

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

export {
  formatCurrency,
  textTruncate,
  error400,
  error404,
  error401,
  error500,
  success200,
  capitalize,
};
