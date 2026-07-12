"use client";

import { useState, type FormEvent } from "react";
import type { LinkFolder } from "@/lib/types";

type NewLinkFormProps = {
  folders: LinkFolder[];
};

export default function NewLinkForm({ folders }: NewLinkFormProps) {
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState(folders[0]?.id ?? "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-lg flex-col gap-6"
    >
      <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
        새 링크 추가
      </h1>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="url"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          링크 주소
        </label>
        <input
          id="url"
          name="url"
          type="url"
          required
          placeholder="https://example.com"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="folder"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          폴더
        </label>
        <select
          id="folder"
          name="folder"
          value={folderId}
          onChange={(event) => setFolderId(event.target.value)}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
        >
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        저장
      </button>
    </form>
  );
}
