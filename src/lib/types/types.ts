import {
  Address as AddressPrisma,
  BestDeal,
  HeroBanner,
  Image,
  MarqueeOffers,
  Order,
  OrderItem,
  Payment,
  Product,
} from "@prisma/client";
import { LucideIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { ZodProductSchema } from "../zod-schemas/schema";
import { Dispatch, SetStateAction } from "react";

type SummaryCardProps = {
  icon: LucideIcon;
  title: string;
  value: number;
  url?: string;
  color: string;
  bgcolor: string;
  percentage?: { increased: boolean; value: string | number };
  isCurrency?: boolean;
  isLoading?: boolean;
};

type Res = {
  success: boolean;
  message: string;
};

type AdminProfileResProps = Res & {
  name: string;
};

type AdminProps = {
  id: string;
  name: string;
  role: "SUPERADMIN" | "ADMIN" | "GUEST";
  email: string;
};

type AdminsResProps = Res & {
  admins: AdminProps[];
};

type Customer = {
  id: string;
  name: string;
  email: string;
  gender?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  image?: string;
};

type CustomersResProps = Res & {
  customers: Customer[];
};

type CustomerResProps = Res & {
  customer: Customer | null;
};

type GuestUserProps = {
  user_id: string;
  expiration_date: string;
  status: "active" | "expired";
};

type GuestUserResProps = Res & {
  guest_users: GuestUserProps[];
};

type EditAdminResProps = Res & {
  admin: AdminProps | null;
};

type Address = Omit<
  Omit<Omit<AddressPrisma, "address_id">, "userId">,
  "alternate_phone"
> & {
  id: number;
  user_id: string;
  alt_phone: string;
};

type AddressResProps = Res & {
  addresses: Address[];
};

type OrderProps = Omit<
  Omit<Omit<Order, "orderDate">, "packedDate">,
  "deliveredDate"
> & {
  itemsCount: number;
  orderDate: string;
  packedDate: string;
  deliveredDate: string;
};

type OrderItemProps = OrderItem & { title: string; Image: string };

type SingleOrder = Order & {
  Address: Address;
  Payment: Payment;
  User: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    image: string | null;
  };
  OrderItem: OrderItemProps[];
};

type SingleOrderResProps = Res & {
  order: SingleOrder | null;
};

type OrderResProps = Res & {
  orders: OrderProps[];
};

type CustomerOrderProps = {
  oid: string;
  amount: number;
  date: string;
  payment: boolean;
  status: string;
  addressId: number;
};

type CustomerProfileProps = {
  id: string;
  name: string;
  email: string;
  gender: "male" | "female";
  phone: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
};

type CustomerOrderResProps = Res & {
  customer: CustomerProfileProps;
  orders: CustomerOrderProps[] | null;
};

type ProductProps = Omit<Product, "createAt"> & {
  image: string;
  category: string;
  createdAt: string;
};

type ProductResProps = Res & {
  product: Product & { Image: Image[] };
};

type ProductsResProps = Res & {
  products: ProductProps[];
};

type ProductOrdersResProps = Res & {
  orders: (OrderItem & { Order: Order })[];
};

type ProductFormProps = {
  form: UseFormReturn<z.infer<typeof ZodProductSchema>, any, undefined>;
};

type EditProductProps = {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string | null;
  description: string;
  categoryId: number;
  stock: number;
  basePrice: number;
  offerPrice: number;
  variantName?: string | null;
  variantValues?: string | null;
  keywords: string[];
  colorVariants: ColorVariantReturn[];
};

type EditProductResProps = Res & {
  product: EditProductProps;
};

interface Category {
  id: number;
  name: string;
  parentId: number | null;
  _count?: number;
}

type CategoryRes = Res & { categories: Category[] };

type EditCategoryRes = Res & { category: Category };

type ColorVariant = {
  color: string;
  thumbnail: string;
  others: string[];
};

type ColorVariantReturn = {
  color: string | null;
  thumbnail: {
    id: number | undefined;
    url: string | undefined;
  };
  others: {
    id: number;
    url: string;
  }[];
};

type AddColorSectionProps = {
  variant: ColorVariant;
  index: number;
  setDisable: Dispatch<SetStateAction<boolean>>;
} & ProductFormProps;

type AddProductResProps = Res & {
  info: any;
};

type ImagePickerProps = {
  action: "thumbnail" | "others";
  variant: ColorVariant;
  variantIndex: number;
};

type ImagePreviewProps = {
  image: string;
  variantIndex: number;
  imageIndex?: number;
  action: "thumbnail" | "others";
};

type ColorVariantRes = {
  color: string | null;
  images: {
    id: number;
    url: string;
  }[];
};

type MakeColorVariant = {
  colors: string | null;
  images: Image[];
};

type DealsAndOffers = {
  deal: BestDeal | null;
  offers: MarqueeOffers[];
  banners: HeroBanner[];
};

type DealsAndOffersRes = Res & DealsAndOffers;

export type {
  SummaryCardProps,
  AdminProfileResProps,
  AdminsResProps,
  Customer,
  CustomersResProps,
  CustomerResProps,
  GuestUserResProps,
  GuestUserProps,
  AdminProps,
  EditAdminResProps,
  Address,
  AddressResProps,
  OrderItemProps,
  OrderProps,
  SingleOrder,
  SingleOrderResProps,
  CustomerOrderProps,
  CustomerProfileProps,
  CustomerOrderResProps,
  ProductResProps,
  ProductsResProps,
  ProductOrdersResProps,
  ProductProps,
  ProductFormProps,
  EditProductProps,
  EditProductResProps,
  OrderResProps,
  Category,
  CategoryRes,
  EditCategoryRes,
  ColorVariant,
  ColorVariantReturn,
  AddColorSectionProps,
  AddProductResProps,
  ImagePickerProps,
  ImagePreviewProps,
  MakeColorVariant,
  ColorVariantRes,
  DealsAndOffers,
  DealsAndOffersRes,
};
