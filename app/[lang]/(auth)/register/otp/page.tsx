"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useTokenStore } from "@/store/userAuth";
const getEmail = async (id: string) =>
  axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify`, {
    params: { id },
  });
const Page = () => {
  const { setToken } = useTokenStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const id = searchParams.get("id");
  useEffect(() => {
    getEmail(id || "").then((res) => setEmail(res.data.email));
  }, []);
  const number1 = useRef<HTMLInputElement>(null);
  const number2 = useRef<HTMLInputElement>(null);
  const number3 = useRef<HTMLInputElement>(null);
  const number4 = useRef<HTMLInputElement>(null);
  const resendEmail = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/resend`,
        {},
        { params: { id } }
      );

      toast({ description: res.data as string });
    } catch (err) {}
  };
  const onSubmit = async () => {
    const num1 = number1.current?.value;
    const num2 = number2.current?.value;
    const num3 = number3.current?.value;
    const num4 = number4.current?.value;
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify`,
        {
          otp: `${num1}${num2}${num3}${num4}`,
          id,
        }
      );
      setToken(res.data.token);

      router.push(`/`);
    } catch (err) {
      const error = err as AxiosError;
      toast({
        variant: "default",
        description: error.response?.data as string,
      });
    }
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen py-12 overflow-hidden bg-gray-50">
      <Card className="flex flex-col w-full max-w-md mx-auto space-y-16">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Email Verification</CardTitle>
          <CardDescription>
            We have sent a code to your email {email}
          </CardDescription>
        </CardHeader>

        <form action="" method="post" onSubmit={onSubmit}>
          <CardContent className="grid gap-4">
            {" "}
            <div className="flex flex-row items-center justify-between w-full max-w-xs mx-auto">
              <input
                ref={number1}
                className="text-2xl text-center border h-14 w-14"
                maxLength={1}
              />

              <input
                ref={number2}
                className="text-2xl text-center border h-14 w-14"
                maxLength={1}
              />
              <input
                ref={number3}
                className="text-2xl text-center border h-14 w-14"
                maxLength={1}
              />
              <input
                ref={number4}
                className="text-2xl text-center border h-14 w-14"
                maxLength={1}
              />
            </div>
            <CardFooter>
              <div className="w-full">
                <Button className="w-full" type="submit">
                  Verify Account
                </Button>
                <div className="flex items-center">
                  <p>Didn&apos;t recieve code?</p>

                  <Button variant="link" type="button" onClick={resendEmail}>
                    Resend
                  </Button>
                </div>
              </div>
            </CardFooter>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default Page;
