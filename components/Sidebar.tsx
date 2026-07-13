"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DeleteFolderModal from "@/components/DeleteFolderModal";
import RenameFolderModal from "@/components/RenameFolderModal";
import { FolderIcon, PencilIcon, TrashIcon } from "@/components/icons";
import { useFolders } from "@/lib/folders-context";
import type { LinkFolder } from "@/lib/types";

type SidebarProps = {
  folders: LinkFolder[];
};

function navItemClass(active: boolean) {
  return [
    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    active
      ? "bg-[var(--accent)] text-white"
      : "text-[var(--text-sub)] hover:bg-[var(--badge-bg)] hover:text-[var(--text)]",
  ].join(" ");
}

export default function Sidebar({ folders }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { removeFolder } = useFolders();
  const [folderToDelete, setFolderToDelete] = useState<LinkFolder | null>(
    null,
  );
  const [folderToEdit, setFolderToEdit] = useState<LinkFolder | null>(null);

  async function handleConfirmDelete(folder: LinkFolder) {
    await removeFolder(folder.id);
    setFolderToDelete(null);
    if (pathname === `/folder/${folder.id}`) {
      router.push("/");
    }
  }

  return (
    <aside className="w-56 shrink-0 border-r border-[var(--divider)] p-4">
      <nav className="flex flex-col gap-1">
        <Link href="/" className={navItemClass(pathname === "/")}>
          All
        </Link>

        <p className="mt-4 mb-1 px-3 text-xs font-semibold text-[var(--placeholder)]">
          폴더
        </p>
        {folders.map((folder) => {
          const active = pathname === `/folder/${folder.id}`;

          return (
            <div key={folder.id} className="group relative">
              <Link
                href={`/folder/${folder.id}`}
                className={navItemClass(active)}
              >
                <FolderIcon className="size-4 shrink-0" />
                <span className="flex-1 truncate text-left">
                  {folder.name}
                </span>
                <span className="text-xs text-[var(--placeholder)] group-hover:hidden">
                  {folder.count}
                </span>
              </Link>
              <div className="absolute top-1/2 right-2 hidden -translate-y-1/2 items-center gap-0.5 group-hover:flex">
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setFolderToEdit(folder);
                  }}
                  aria-label={`${folder.name} 폴더 이름 수정`}
                  className={[
                    "rounded-md p-1 transition-colors",
                    active
                      ? "text-white/70 hover:text-white"
                      : "text-[var(--text-sub)] hover:text-[var(--text)]",
                  ].join(" ")}
                >
                  <PencilIcon className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setFolderToDelete(folder);
                  }}
                  aria-label={`${folder.name} 폴더 삭제`}
                  className={[
                    "rounded-md p-1 transition-colors",
                    active
                      ? "text-white/70 hover:text-white"
                      : "text-[var(--text-sub)] hover:text-[var(--error)]",
                  ].join(" ")}
                >
                  <TrashIcon className="size-4" />
                </button>
              </div>
            </div>
          );
        })}
      </nav>

      <DeleteFolderModal
        folder={folderToDelete}
        onCancel={() => setFolderToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
      <RenameFolderModal
        key={folderToEdit?.id ?? "none"}
        folder={folderToEdit}
        onClose={() => setFolderToEdit(null)}
      />
    </aside>
  );
}
