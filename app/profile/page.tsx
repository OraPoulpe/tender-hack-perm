"use client";

import { ProfilePage } from "@/src/screens/profile-page";
import { Button } from "antd";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Profile() {
  return <ProfilePage />;
}
