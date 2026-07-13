"use client";

import { useState, type FormEvent, type MouseEvent } from "react";
import { useFolders } from "@/lib/folders-context";
import type { LinkFolder } from "@/lib/types";

type RenameFolderModalProps = {
  folder: LinkFolder | null;
  onClose: () => void;
};

export default function RenameFolderModal({
  folder,
  onClose,
}: RenameFolderModalProps) {
  const { renameFolder } = useFolders();
  const [name, setName] = useState(folder?.name ?? "");

  if (!folder) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !folder) return;

    await renameFolder(folder.id, name);
    onClose();
  }

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div className="w-full max-w-sm rounded-2xl bg-[var(--background)] p-6 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h2 className="text-lg font-semibold tracking-[-0.3px] text-[var(--text)]">
            폴더 이름 수정
          </h2>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="folder-rename"
              className="text-sm font-medium text-[var(--text)]"
            >
              폴더 이름
            </label>
            <input
              id="folder-rename"
              name="folder-rename"
              type="text"
              autoFocus
              required
              placeholder="폴더 이름을 입력하세요"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)] outline-none transition-shadow placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)]"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-5 py-2.5 text-sm font-medium text-[var(--text-sub)] transition-colors hover:bg-[var(--badge-bg)]"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
