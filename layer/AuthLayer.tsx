"use client";
import { useTokenStore, useUserStore } from "@/store/userAuth";
import { Loader } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const getUser = (token: string) =>
  fetch(`${process.env.API_URL}/auth/user`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
const AuthLayer = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { token, clearToken } = useTokenStore();
  const { user, setUser, clearUser } = useUserStore();

  const handelUser = async () => {
    try {
      const res = await getUser(token);
      const data = await res.json();

      if (!res.ok) {
        clearUser();
        clearToken();
      } else {
        setUser(data);
      }
    } catch (err) {}
    setLoading(false);
  };

  useEffect(() => {
    handelUser();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-w-full min-h-screen animate-spin">
        <Loader size={80} className="" color="green" />
      </div>
    );

  return children;
};

export default AuthLayer;
