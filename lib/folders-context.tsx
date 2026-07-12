"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { folders as initialFolders } from "@/lib/mock-data";
import type { LinkFolder } from "@/lib/types";

type FoldersContextValue = {
  folders: LinkFolder[];
  addFolder: (name: string) => void;
};

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<LinkFolder[]>(initialFolders);

  function addFolder(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const newFolder: LinkFolder = {
      id: crypto.randomUUID(),
      name: trimmed,
      count: 0,
    };
    setFolders((prev) => [...prev, newFolder]);
  }

  return (
    <FoldersContext.Provider value={{ folders, addFolder }}>
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
