"use client";

import { useParams } from "next/navigation";
import AppShell from "@/components/AppShell";
import LinkGrid from "@/components/LinkGrid";
import { useFolders } from "@/lib/folders-context";
import { links } from "@/lib/mock-data";

export default function FolderPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const { folders } = useFolders();
  const folder = folders.find((item) => item.id === folderId);

  if (!folder) {
    return (
      <AppShell>
        <p className="py-20 text-center text-sm text-[var(--text-sub)]">
          폴더를 찾을 수 없어요.
        </p>
      </AppShell>
    );
  }

  const folderLinks = links.filter((link) => link.folderId === folderId);

  return (
    <AppShell>
      <h1 className="mb-6 text-2xl font-semibold tracking-[-0.3px] text-[var(--text)]">
        {folder.name}
      </h1>
      <LinkGrid links={folderLinks} />
    </AppShell>
  );
}
