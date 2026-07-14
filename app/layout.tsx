import type { Metadata } from "next";
import { FoldersProvider } from "@/lib/folders-context";
import { LinksProvider } from "@/lib/links-context";
import "./globals.css";

const siteName = "한입 링크";
const siteDescription = "링크를 폴더별로 모아보는 북마크 서비스";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
    siteName,
    images: [{ url: "/thumbnail.png", width: 2400, height: 1260 }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/thumbnail.png"],
  },
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
