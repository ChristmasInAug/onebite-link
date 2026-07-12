"use client";

import AppShell from "@/components/AppShell";
import LinkGrid from "@/components/LinkGrid";
import { useLinks } from "@/lib/links-context";

export default function Home() {
  const { links } = useLinks();

  return (
    <AppShell>
      <LinkGrid links={links} />
    </AppShell>
  );
}
