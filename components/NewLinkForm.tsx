"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useFolders } from "@/lib/folders-context";
import { useLinks } from "@/lib/links-context";

type OgResponse = {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  error?: string;
};

export default function NewLinkForm() {
  const router = useRouter();
  const { folders } = useFolders();
  const { addLink } = useLinks();

  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!url.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      const og: OgResponse = await response.json();

      if (!response.ok) {
        throw new Error(og.error ?? "failed to fetch link");
      }

      await addLink({
        url: og.url ?? url,
        title: og.title ?? url,
        description: og.description ?? "",
        thumbnail: og.image,
        folderId,
      });

      router.push("/");
    } catch {
      setError("링크 정보를 가져오지 못했어요. 주소를 확인해 주세요.");
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-lg flex-col gap-6"
    >
      <h1 className="text-2xl font-semibold tracking-[-0.3px] text-[var(--text)]">
        새 링크 추가
      </h1>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="url"
          className="text-sm font-medium text-[var(--text)]"
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
          className="rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)] outline-none transition-shadow placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="folder"
          className="text-sm font-medium text-[var(--text)]"
        >
          폴더
        </label>
        <select
          id="folder"
          name="folder"
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

      {error && <p className="text-sm text-[var(--error)]">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "확인 중..." : "확인"}
      </button>
    </form>
  );
}
