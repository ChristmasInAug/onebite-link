"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";
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
  addLink: (input: NewLinkInput) => Promise<void>;
  removeLink: (id: string) => Promise<void>;
  updateLink: (id: string, updates: LinkEditableFields) => Promise<void>;
};

const LinksContext = createContext<LinksContextValue | null>(null);

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>([]);

  useEffect(() => {
    const supabase = createClient();

    async function fetchLinks() {
      const { data, error } = await supabase
        .from("links")
        .select("id, url, title, description, thumbnail_url, folder_id")
        .order("created_at", { ascending: false });

      if (error || !data) return;

      setLinks(
        data.map((row) => ({
          id: String(row.id),
          title: row.title ?? row.url,
          url: row.url,
          description: row.description ?? "",
          thumbnail: row.thumbnail_url ?? undefined,
          folderId: row.folder_id ? String(row.folder_id) : "",
        })),
      );
    }

    fetchLinks();
  }, []);

  async function addLink(input: NewLinkInput) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("links")
      .insert({
        url: input.url,
        title: input.title,
        description: input.description,
        thumbnail_url: input.thumbnail ?? null,
        folder_id: input.folderId ? Number(input.folderId) : null,
      })
      .select("id, url, title, description, thumbnail_url, folder_id")
      .single();

    if (error || !data) return;

    const newLink: LinkItem = {
      id: String(data.id),
      title: data.title ?? data.url,
      url: data.url,
      description: data.description ?? "",
      thumbnail: data.thumbnail_url ?? undefined,
      folderId: data.folder_id ? String(data.folder_id) : "",
    };
    setLinks((prev) => [newLink, ...prev]);
  }

  async function removeLink(id: string) {
    const supabase = createClient();
    const { error } = await supabase.from("links").delete().eq("id", id);

    if (error) return;

    setLinks((prev) => prev.filter((link) => link.id !== id));
  }

  async function updateLink(id: string, updates: LinkEditableFields) {
    const title = updates.title.trim();
    if (!title) return;

    const description = updates.description.trim();
    const folderId = updates.folderId;

    const supabase = createClient();
    const { error } = await supabase
      .from("links")
      .update({
        title,
        description,
        folder_id: folderId ? Number(folderId) : null,
      })
      .eq("id", id);

    if (error) return;

    setLinks((prev) =>
      prev.map((link) =>
        link.id === id ? { ...link, title, description, folderId } : link,
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
