import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/lib/types";

type LinkGridProps = {
  links: LinkItem[];
};

export default function LinkGrid({ links }: LinkGridProps) {
  if (links.length === 0) {
    return (
      <p className="py-20 text-center text-sm text-zinc-400 dark:text-zinc-500">
        등록된 링크가 없어요.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}
