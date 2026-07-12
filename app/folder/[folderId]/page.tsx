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
      <h1 className="mb-6 text-xl font-bold text-zinc-900 dark:text-zinc-50">
        {folder.name}
      </h1>
      <LinkGrid links={folderLinks} />
    </AppShell>
  );
}
