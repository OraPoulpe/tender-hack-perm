import { authConfig } from "@/src/shared/configs/auth.config";
import NextAuth from "next-auth";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
