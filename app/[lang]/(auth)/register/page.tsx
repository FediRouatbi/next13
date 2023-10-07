"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import Eye from "@/lib/svg/eye";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .refine((data) => data.confirmPassword === data.password, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });
type ValidationSchema = z.infer<typeof schema>;

export default function DemoCreateAccount() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const methods = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    defaultValues: { confirmPassword: "", email: "", password: "" },
  });
  console.log(process.env.BASE_URL);

  const submit = async (data: ValidationSchema) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const { id } = await res.json();
      console.log(res);

      router.push(`register/otp?id=${id}`);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>
        <Card className="max-w-xl mx-auto mt-28">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline" disabled>
                <Icons.gitHub className="w-4 h-4 mr-2" />
                Github
              </Button>
              <Button variant="outline" disabled>
                <Icons.google className="w-4 h-4 mr-2" />
                Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-background text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Input
                label="Email"
                id="email"
                type="string"
                placeholder="m@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Input
                label="Password"
                id="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <Eye
                    onClick={() => setShowPassword((prev) => !prev)}
                    open={!showPassword}
                  />
                }
              />
            </div>
            <div className="grid gap-2">
              <Input
                label="Confirm password"
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                rules={{
                  validate: (value: string) => {
                    console.log(methods.getValues("password"));

                    return (
                      methods.getValues("password") === value ||
                      "password do not match"
                    );
                  },
                }}
                endAdornment={
                  <Eye
                    onClick={() => setShowPassword((prev) => !prev)}
                    open={!showPassword}
                  />
                }
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full">
              {loading ? "Loading..." : "Create account"}
            </Button>
            <p>
              Already have an account ?{"  "}
              <Link
                href="/login"
                className="font-semibold text-blue-500 hover:text-blue-600"
              >
                login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
