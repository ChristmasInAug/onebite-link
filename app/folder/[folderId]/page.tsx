import { notFound } from "next/navigation";
import AppShell from "@/components/AppShell";
import LinkGrid from "@/components/LinkGrid";
import { folders, links } from "@/lib/mock-data";

type FolderPageProps = {
  params: Promise<{ folderId: string }>;
};

export default async function FolderPage({ params }: FolderPageProps) {
  const { folderId } = await params;
  const folder = folders.find((item) => item.id === folderId);

  if (!folder) {
    notFound();
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
