import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import NewLinkForm from "@/components/NewLinkForm";

export const metadata: Metadata = {
  title: "새 링크 추가",
  description: "새로운 링크를 폴더에 추가해요.",
};

export default function NewLinkPage() {
  return (
    <AppShell>
      <NewLinkForm />
    </AppShell>
  );
}
