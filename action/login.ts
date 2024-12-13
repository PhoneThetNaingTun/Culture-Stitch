"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const loginUser = async (value: z.infer<typeof LoginSchema>) => {
  const isValitated = LoginSchema.parse(value);
  if (!isValitated) {
    return { error: "Invalid Field!" };
  }
  const { email, password } = isValitated;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email) {
    return { error: "Email does not exist" };
  }
  if (!existingUser.password) {
    return { error: "Wrong Password" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Crentials!" };
        default:
          return { error: "Something Went Wrong" };
      }
    }
    throw error;
  }
};
