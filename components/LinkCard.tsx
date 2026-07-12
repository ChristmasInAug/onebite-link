import { ExternalLinkIcon } from "@/components/icons";
import type { LinkItem } from "@/lib/types";

type LinkCardProps = {
  link: LinkItem;
};

export default function LinkCard({ link }: LinkCardProps) {
  const hostname = new URL(link.url).hostname;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-sm font-semibold text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
          {hostname.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {link.title}
          </h3>
          <p className="truncate text-xs text-zinc-400 dark:text-zinc-500">
            {hostname}
          </p>
        </div>
        <ExternalLinkIcon className="size-4 shrink-0 text-zinc-300 transition-colors group-hover:text-zinc-500 dark:text-zinc-700" />
      </div>
      <p className="line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
        {link.description}
      </p>
    </a>
  );
}
