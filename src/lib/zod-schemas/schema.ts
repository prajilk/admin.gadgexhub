import { z } from "zod";

export const ZodAuthSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be 8 or more characters long"),
});

export const ZodProfileSchema = z.object({
  name: z.string().min(3).max(20),
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
