"use client";

import type { MouseEvent } from "react";
import type { LinkFolder } from "@/lib/types";

type DeleteFolderModalProps = {
  folder: LinkFolder | null;
  onCancel: () => void;
  onConfirm: (folder: LinkFolder) => void;
};

export default function DeleteFolderModal({
  folder,
  onCancel,
  onConfirm,
}: DeleteFolderModalProps) {
  if (!folder) return null;

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  }

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div className="w-full max-w-sm rounded-2xl bg-[var(--background)] p-6 shadow-xl">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold tracking-[-0.3px] text-[var(--text)]">
              폴더 삭제
            </h2>
            <p className="text-sm text-[var(--text-sub)]">
              &ldquo;{folder.name}&rdquo; 폴더를 삭제하시겠어요? 이 작업은
              되돌릴 수 없어요.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full px-5 py-2.5 text-sm font-medium text-[var(--text-sub)] transition-colors hover:bg-[var(--badge-bg)]"
            >
              취소
            </button>
            <button
              type="button"
              onClick={() => onConfirm(folder)}
              className="rounded-full bg-[var(--error)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
