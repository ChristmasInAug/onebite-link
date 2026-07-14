import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "로그인",
  description: "이메일과 비밀번호로 로그인해요.",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
