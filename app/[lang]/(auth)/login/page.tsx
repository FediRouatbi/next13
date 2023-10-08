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
import { toast } from "@/components/ui/use-toast";
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

type ValidationSchema = z.infer<typeof schema>;

export default function DemoCreateAccount() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const methods = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const submit = async (data: ValidationSchema) => {
    setLoading(true);

    try {
      const res = await fetch(`${process.env.BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const { id } = await res.json();

      if (!res.ok)
        throw new Error("something went wrong please try again later");
      else router.push(`register/otp?id=${id}`);
    } catch (err) {
      toast({
        variant: "destructive",
        description: (err as Error).message,
      });
    }
    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>
        <Card className="max-w-xl mx-auto mt-28">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Login to your account</CardTitle>
            <CardDescription>
              {/* Enter your email below to create your account */}
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
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full">
              {loading ? "Loading..." : "Login"}
            </Button>
            <p>
              yout dont have an accout ?{" "}
              <Link
                href="/register"
                className="font-semibold text-blue-500 hover:text-blue-600"
              >
                signup
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
