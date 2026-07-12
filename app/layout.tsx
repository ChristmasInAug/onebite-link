import type { Metadata } from "next";
import { FoldersProvider } from "@/lib/folders-context";
import { LinksProvider } from "@/lib/links-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "한입 링크",
  description: "링크를 폴더별로 모아보는 북마크 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--text)]">
        <FoldersProvider>
          <LinksProvider>{children}</LinksProvider>
        </FoldersProvider>
      </body>
    </html>
  );
}
