import { z } from "zod";

export const ZodAuthSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, "Password must be 8 or more characters long"),
});
