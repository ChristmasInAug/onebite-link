"use client";

import { useState } from "react";
import DeleteLinkModal from "@/components/DeleteLinkModal";
import EditLinkModal from "@/components/EditLinkModal";
import LinkCard from "@/components/LinkCard";
import { useLinks } from "@/lib/links-context";
import type { LinkItem } from "@/lib/types";

type LinkGridProps = {
  links: LinkItem[];
};

export default function LinkGrid({ links }: LinkGridProps) {
  const { removeLink } = useLinks();
  const [linkToDelete, setLinkToDelete] = useState<LinkItem | null>(null);
  const [linkToEdit, setLinkToEdit] = useState<LinkItem | null>(null);

  function handleConfirmDelete(link: LinkItem) {
    removeLink(link.id);
    setLinkToDelete(null);
  }

  if (links.length === 0) {
    return (
      <p className="py-20 text-center text-sm text-[var(--text-sub)]">
        등록된 링크가 없어요.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {links.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            onEditRequest={setLinkToEdit}
            onDeleteRequest={setLinkToDelete}
          />
        ))}
      </div>

      <DeleteLinkModal
        link={linkToDelete}
        onCancel={() => setLinkToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
      <EditLinkModal
        key={linkToEdit?.id ?? "none"}
        link={linkToEdit}
        onClose={() => setLinkToEdit(null)}
      />
    </>
  );
}
