export { default } from "next-auth/middleware";

export const config = { matcher: ["/((?!login).*)"] };
// export const config = { matcher: ['/profile'] }
