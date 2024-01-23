import { z } from "zod";

export const ZodAuthSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be 8 or more characters long"),
});

export const ZodProfileSchema = z.object({
  name: z.string().min(3).max(20),
});

export const ZodCustomerSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .union([z.string().length(0), z.string().min(7)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  gender: z.string().optional(),
  phone: z
    .string()
    .refine((value) => /^(?:\d{10})?$/.test(value), {
      message: "Invalid phone number format. Please enter a 10-digit number.",
    })
    .optional(),
});

export const ZodCustomerSchemaWithPassword = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be 8 or more characters long"),
  gender: z.string().optional(),
  phone: z
    .string()
    .refine((value) => /^(?:\d{10})?$/.test(value), {
      message: "Invalid phone number format. Please enter a 10-digit number.",
    })
    .optional(),
});

export const ZodAdminSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .union([z.string().length(0), z.string().min(7)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  role: z.enum(["ADMIN", "GUEST"]),
});

export const ZodAdminSchemaWithPassword = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be 8 or more characters long"),
  role: z.enum(["ADMIN", "GUEST"]),
});

export const ZodProductSchema = z.object({
  title: z
    .string()
    .min(5, "Value must be 5 or more characters long")
    .max(100, "Value must be less than 100 characters long"),
  slug: z
    .string()
    .min(5, "Value must be 5 or more characters long")
    .max(100, "Value must be less than 100 characters long"),
  shortDescription: z
    .string()
    .max(150, "Value must be less than 150 characters long")
    .optional(),
  description: z
    .string()
    .min(10, "Value must be 10 or more characters long")
    .max(1000, "Value must be less than 1000 characters long"),
  categoryId: z.string().refine((value) => /^\d+$/.test(value), {
    message: "invalid category id",
  }),
  basePrice: z.string().refine((value) => /^\d+$/.test(value), {
    message: "Enter valid number",
  }),
  offerPrice: z.string().refine((value) => /^\d+$/.test(value), {
    message: "Enter valid number",
  }),
  stock: z.string().refine((value) => /^\d+$/.test(value), {
    message: "Enter valid number",
  }),
  colors: z
    .object({
      color: z.string(),
      thumbnail: z.string(),
      others: z.string().array(),
    })
    .array(),
  variantName: z.string().optional(),
  variantValues: z.string().optional(),
  keywords: z.string().refine(
    (data) => {
      const values = data.split(",").map((value) => value.trim());
      return values.length <= 10;
    },
    {
      message: "Maximum 10 keywords!",
    },
  ),
});

export const ZodCategorySchema = z.object({
  category: z.string(),
  parentId: z.string(),
});

export const ZodBestDealSchema = z.object({
  title: z.string(),
  id: z.string().length(25, "Invalid product ID"),
  slug: z.string(),
  description: z
    .string()
    .max(100, "Value must be less than 100 characters long"),
  price: z.string(),
});

export const ZodMarqueeOfferSchema = z.object({
  title: z
    .string()
    .min(3, "Value must be 3 or more characters long")
    .max(70, "Value must be less than 70 characters long"),
  url: z.string(),
});

export const ZodHeroBannerSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z
    .string()
    .max(100, "Value must be less than 100 characters long"),
  basePrice: z.string(),
  offerPrice: z.string(),
});
