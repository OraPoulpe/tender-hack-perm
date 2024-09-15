"use client"

import { AuthForm } from "@/src/features/auth/authForm";
import { useSession } from "next-auth/react";
import React from "react";

const AuthPage = () => {
  const session = useSession();
  return (
    <main className="flex h-full w-full items-center justify-center">
      {
        session.status === "unauthenticated" && <AuthForm />
      }
    </main>
  );
};

export default AuthPage;
