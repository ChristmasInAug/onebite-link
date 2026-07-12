"use client";

import { useState } from "react";
import Link from "next/link";
import { FolderPlusIcon, PlusIcon } from "@/components/icons";
import NewFolderModal from "@/components/NewFolderModal";

export default function Header() {
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between border-b border-[var(--divider)] bg-white/72 px-6 backdrop-blur-xl backdrop-saturate-150">
      <span className="text-[17px] font-semibold tracking-tight text-[var(--text)]">
        🔗 한입 링크
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsFolderModalOpen(true)}
          className="flex items-center gap-1.5 rounded-full border border-[var(--border)] px-4 py-1.5 text-sm font-medium text-[var(--text)] transition-colors hover:bg-[var(--badge-bg)]"
        >
          <FolderPlusIcon className="size-4" />
          새 폴더
        </button>
        <Link
          href="/new"
          className="flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
        >
          <PlusIcon className="size-4" />
          새 링크
        </Link>
      </div>

      <NewFolderModal
        isOpen={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
      />
    </header>
  );
}
