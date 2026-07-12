import type { ReactNode } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { folders } from "@/lib/mock-data";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-zinc-50 dark:bg-black">
      <Header />
      <div className="flex flex-1">
        <Sidebar folders={folders} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
