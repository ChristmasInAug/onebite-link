import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "회원가입",
  description: "이메일로 새 계정을 만들어요.",
};

export default function SignupLayout({ children }: { children: ReactNode }) {
  return children;
}
