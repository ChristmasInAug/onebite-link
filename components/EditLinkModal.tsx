"use client";

import { useState, type FormEvent, type MouseEvent } from "react";
import { useFolders } from "@/lib/folders-context";
import { useLinks } from "@/lib/links-context";
import type { LinkItem } from "@/lib/types";

type EditLinkModalProps = {
  link: LinkItem | null;
  onClose: () => void;
};

export default function EditLinkModal({ link, onClose }: EditLinkModalProps) {
  const { folders } = useFolders();
  const { updateLink } = useLinks();

  const [title, setTitle] = useState(link?.title ?? "");
  const [description, setDescription] = useState(link?.description ?? "");
  const [folderId, setFolderId] = useState(link?.folderId ?? "");

  if (!link) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !link) return;

    await updateLink(link.id, { title, description, folderId });
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
            링크 수정
          </h2>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="link-folder"
              className="text-sm font-medium text-[var(--text)]"
            >
              폴더
            </label>
            <select
              id="link-folder"
              name="link-folder"
              value={folderId}
              onChange={(event) => setFolderId(event.target.value)}
              className="rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)] outline-none transition-shadow focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)]"
            >
              <option value="">선택 안 함</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="link-title"
              className="text-sm font-medium text-[var(--text)]"
            >
              제목
            </label>
            <input
              id="link-title"
              name="link-title"
              type="text"
              autoFocus
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)] outline-none transition-shadow placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="link-description"
              className="text-sm font-medium text-[var(--text)]"
            >
              설명
            </label>
            <textarea
              id="link-description"
              name="link-description"
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="resize-none rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)] outline-none transition-shadow placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)]"
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
