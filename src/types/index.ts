export interface Folder {
  id: string;
  name: string;
  icon: string;
  description?: string;
  createdAt: Date;
}

export interface ConfigFile {
  id: string;
  folderId: string;
  name: string;
  content: string;
  language?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Prompt {
  id: string;
  title: string;
  content: string;
  category?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type ViewMode = 'configs' | 'prompts';
