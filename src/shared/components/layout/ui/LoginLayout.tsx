"use client"


export function LoginLayout({ children }: { children: React.ReactNode }) {
  // console.log("use login layout");
  return <main className="flex h-full w-full items-center justify-center">{children}</main>;
}
