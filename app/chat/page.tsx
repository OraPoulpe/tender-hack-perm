"use client";

import { HomePage } from "@/src/screens/home-page";
import { Button } from "antd";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Chat() {
  return <HomePage />;
}
