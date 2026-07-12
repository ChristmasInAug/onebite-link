import { ExternalLinkIcon, PencilIcon, TrashIcon } from "@/components/icons";
import type { LinkItem } from "@/lib/types";

type LinkCardProps = {
  link: LinkItem;
  onEditRequest: (link: LinkItem) => void;
  onDeleteRequest: (link: LinkItem) => void;
};

export default function LinkCard({
  link,
  onEditRequest,
  onDeleteRequest,
}: LinkCardProps) {
  const hostname = new URL(link.url).hostname;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-xl bg-[var(--surface)] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
    >
      <div className="absolute top-2 right-2 z-10 hidden items-center gap-1 group-hover:flex">
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onEditRequest(link);
          }}
          aria-label={`${link.title} 링크 수정`}
          className="rounded-md bg-[var(--background)]/90 p-1.5 text-[var(--text-sub)] shadow-sm transition-colors hover:text-[var(--text)]"
        >
          <PencilIcon className="size-4" />
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onDeleteRequest(link);
          }}
          aria-label={`${link.title} 링크 삭제`}
          className="rounded-md bg-[var(--background)]/90 p-1.5 text-[var(--text-sub)] shadow-sm transition-colors hover:text-[var(--error)]"
        >
          <TrashIcon className="size-4" />
        </button>
      </div>
      {link.thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element -- thumbnails come from arbitrary external hosts, unsuitable for next/image's remote allowlist
        <img
          src={link.thumbnail}
          alt=""
          className="aspect-video w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--badge-bg)] text-sm font-semibold text-[var(--text-sub)]">
            {hostname.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-[var(--text)]">
              {link.title}
            </h3>
            <p className="truncate text-xs text-[var(--text-sub)]">
              {hostname}
            </p>
          </div>
          <ExternalLinkIcon className="size-4 shrink-0 text-[var(--placeholder)] transition-colors group-hover:text-[var(--text-sub)]" />
        </div>
        <p className="line-clamp-2 text-sm text-[var(--text-sub)]">
          {link.description}
        </p>
      </div>
    </a>
  );
}
