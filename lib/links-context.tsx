"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { links as initialLinks } from "@/lib/mock-data";
import type { LinkItem } from "@/lib/types";

type NewLinkInput = {
  url: string;
  title: string;
  description: string;
  thumbnail?: string;
  folderId: string;
};

type LinkEditableFields = {
  title: string;
  description: string;
  folderId: string;
};

type LinksContextValue = {
  links: LinkItem[];
  addLink: (input: NewLinkInput) => void;
  removeLink: (id: string) => void;
  updateLink: (id: string, updates: LinkEditableFields) => void;
};

const LinksContext = createContext<LinksContextValue | null>(null);

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  function addLink(input: NewLinkInput) {
    const newLink: LinkItem = {
      id: crypto.randomUUID(),
      ...input,
    };
    setLinks((prev) => [newLink, ...prev]);
  }

  function removeLink(id: string) {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  }

  function updateLink(id: string, updates: LinkEditableFields) {
    const title = updates.title.trim();
    if (!title) return;

    setLinks((prev) =>
      prev.map((link) =>
        link.id === id
          ? {
              ...link,
              title,
              description: updates.description.trim(),
              folderId: updates.folderId,
            }
          : link,
      ),
    );
  }

  return (
    <LinksContext.Provider
      value={{ links, addLink, removeLink, updateLink }}
    >
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinksProvider");
  }
  return context;
}
