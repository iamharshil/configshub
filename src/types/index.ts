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
  history?: {
    content: string;
    updatedAt: Date;
  }[];
  name: string;
  content: string;
  language?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Snippet {
  id: string;
  title: string;
  description: string;
  content: string;
  language: string;
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

export type ViewMode = 'configs' | 'prompts' | 'settings';

export interface Workspace {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  color: string;
}



export interface Activity {
  id: string;
  type: 'create_config' | 'update_config' | 'create_prompt' | 'update_profile';
  description: string;
  createdAt: Date;
}
