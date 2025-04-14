"use client";
import Link from "next/link";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { RegisterSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState, useTransition } from "react";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { registerUser } from "@/action/register";
import { GoogleLoginButton } from "./googleLoginButton";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransistion] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = (value: z.infer<typeof RegisterSchema>) => {
    setSuccess("");
    setError("");
    startTransistion(() => {
      registerUser(value).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        data.success && router.push("/auth/login");
      });
    });
  };

  return (
    <Card className="mx-auto w-full lg:w-1/3 rounded-none lg:rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Register Account</CardTitle>
        <CardDescription>Welcome To Little SRN.Register Here!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="User Name" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="lsrn@gmail.com"
                      type="Email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="09---------" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="........" type="password" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full mt-5">
              Register
            </Button>
          </form>
        </Form>
        <div className="grid gap-4 mt-5">
          <GoogleLoginButton />
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
