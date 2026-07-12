"use client";

import type { ReactNode } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useFolders } from "@/lib/folders-context";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const { folders } = useFolders();

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-[var(--background)]">
      <Header />
      <div className="flex flex-1">
        <Sidebar folders={folders} />
        <main className="mx-auto w-full max-w-[1000px] flex-1 px-6 py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
