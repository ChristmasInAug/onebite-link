"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";
import type { LinkFolder } from "@/lib/types";

type FoldersContextValue = {
  folders: LinkFolder[];
  addFolder: (name: string) => Promise<void>;
  removeFolder: (id: string) => void;
  renameFolder: (id: string, name: string) => Promise<void>;
};

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<LinkFolder[]>([]);

  useEffect(() => {
    const supabase = createClient();

    async function fetchFolders() {
      const { data, error } = await supabase
        .from("folders")
        .select("id, name")
        .order("id", { ascending: true });

      if (error || !data) return;

      setFolders(data.map((row) => ({ id: String(row.id), name: row.name, count: 0 })));
    }

    fetchFolders();
  }, []);

  async function addFolder(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const supabase = createClient();
    const { data, error } = await supabase
      .from("folders")
      .insert({ name: trimmed })
      .select("id, name")
      .single();

    if (error || !data) return;

    const newFolder: LinkFolder = { id: String(data.id), name: data.name, count: 0 };
    setFolders((prev) => [...prev, newFolder]);
  }

  function removeFolder(id: string) {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  }

  async function renameFolder(id: string, name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const supabase = createClient();
    const { error } = await supabase
      .from("folders")
      .update({ name: trimmed })
      .eq("id", id);

    if (error) return;

    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id ? { ...folder, name: trimmed } : folder,
      ),
    );
  }

  return (
    <FoldersContext.Provider
      value={{ folders, addFolder, removeFolder, renameFolder }}
    >
      {children}
    </FoldersContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FoldersContext);
  if (!context) {
    throw new Error("useFolders must be used within a FoldersProvider");
  }
  return context;
}
