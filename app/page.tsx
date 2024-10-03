"use client";

import { HomePage } from "@/src/screens/home-page";
import { Chat } from "@/src/widgets/chat";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push("/chat");
  return <HomePage />;
}
