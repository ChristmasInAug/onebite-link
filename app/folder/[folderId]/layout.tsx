import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "폴더별 링크",
  description: "폴더에 저장된 링크를 모아봐요.",
};

export default function FolderLayout({ children }: { children: ReactNode }) {
  return children;
}
