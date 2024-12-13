import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Minimum 6 characters" }),
  name: z.string().min(2, { message: "At Least 2 Character" }),
  phone: z.string().min(9, { message: "At Least 9 CHaracter" }),
});
export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is Required" }),
  password: z.string().min(6, { message: "Minimun 6 chraacteres" }),
});
