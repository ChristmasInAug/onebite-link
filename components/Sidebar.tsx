"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderIcon } from "@/components/icons";
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

  return (
    <aside className="w-56 shrink-0 border-r border-[var(--divider)] p-4">
      <nav className="flex flex-col gap-1">
        <Link href="/" className={navItemClass(pathname === "/")}>
          All
        </Link>

        <p className="mt-4 mb-1 px-3 text-xs font-semibold text-[var(--placeholder)]">
          폴더
        </p>
        {folders.map((folder) => (
          <Link
            key={folder.id}
            href={`/folder/${folder.id}`}
            className={navItemClass(pathname === `/folder/${folder.id}`)}
          >
            <FolderIcon className="size-4 shrink-0" />
            <span className="flex-1 truncate text-left">{folder.name}</span>
            <span className="text-xs text-[var(--placeholder)]">
              {folder.count}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
