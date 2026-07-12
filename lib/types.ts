export type LinkFolder = {
  id: string;
  name: string;
  count: number;
};

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  folderId: string;
};
