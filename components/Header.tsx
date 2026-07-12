import Link from "next/link";
import { PlusIcon } from "@/components/icons";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between border-b border-[var(--divider)] bg-white/72 px-6 backdrop-blur-xl backdrop-saturate-150">
      <span className="text-[17px] font-semibold tracking-tight text-[var(--text)]">
        🔗 한입 링크
      </span>
      <Link
        href="/new"
        className="flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
      >
        <PlusIcon className="size-4" />
        새 링크
      </Link>
    </header>
  );
}
