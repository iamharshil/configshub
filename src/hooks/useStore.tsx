import { useCallback, useState } from 'react';
import { ConfigFile, Folder, Prompt } from '@/types';

const generateId = () => Math.random().toString(36).substr(2, 9);

// Initial demo data
const initialFolders: Folder[] = [
  { id: '1', name: 'VSCode', icon: 'vscode', description: 'Visual Studio Code configurations', createdAt: new Date() },
  { id: '2', name: 'Neovim', icon: 'terminal', description: 'Neovim and Vim configurations', createdAt: new Date() },
  { id: '3', name: 'Tmux', icon: 'layout', description: 'Terminal multiplexer configs', createdAt: new Date() },
];

const initialConfigs: ConfigFile[] = [
  {
    id: '1',
    folderId: '1',
    name: 'settings.json',
    content: `{
  "editor.fontSize": 14,
  "editor.fontFamily": "JetBrains Mono",
  "editor.lineHeight": 1.6,
  "editor.minimap.enabled": false,
  "workbench.colorTheme": "One Dark Pro"
}`,
    language: 'json',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    folderId: '2',
    name: 'init.lua',
    content: `-- Neovim configuration
vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.tabstop = 2
vim.opt.shiftwidth = 2
vim.opt.expandtab = true`,
    language: 'lua',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    folderId: '3',
    name: '.tmux.conf',
    content: `# Tmux configuration
set -g mouse on
set -g base-index 1
set -g pane-base-index 1
set -g status-style 'bg=#1e1e2e fg=#cdd6f4'`,
    language: 'bash',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const initialPrompts: Prompt[] = [
  {
    id: '1',
    title: 'Code Review Assistant',
    content: `Review this code for:
1. Potential bugs and edge cases
2. Performance optimizations
3. Code style and best practices
4. Security vulnerabilities

Provide specific suggestions with examples.`,
    category: 'Development',
    tags: ['code-review', 'quality'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Commit Message Generator',
    content: `Generate a conventional commit message for the following changes.
Format: <type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore
Keep it concise and descriptive.`,
    category: 'Git',
    tags: ['git', 'automation'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function useStore() {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [configs, setConfigs] = useState<ConfigFile[]>(initialConfigs);
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);

  // Folder operations
  const addFolder = useCallback((folder: Omit<Folder, 'id' | 'createdAt'>) => {
    const newFolder: Folder = {
      ...folder,
      id: generateId(),
      createdAt: new Date(),
    };
    setFolders(prev => [...prev, newFolder]);
    return newFolder;
  }, []);

  const updateFolder = useCallback((id: string, updates: Partial<Folder>) => {
    setFolders(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  }, []);

  const deleteFolder = useCallback((id: string) => {
    setFolders(prev => prev.filter(f => f.id !== id));
    setConfigs(prev => prev.filter(c => c.folderId !== id));
  }, []);

  // Config operations
  const addConfig = useCallback((config: Omit<ConfigFile, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newConfig: ConfigFile = {
      ...config,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConfigs(prev => [...prev, newConfig]);
    return newConfig;
  }, []);

  const updateConfig = useCallback((id: string, updates: Partial<ConfigFile>) => {
    setConfigs(prev => prev.map(c => c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c));
  }, []);

  const deleteConfig = useCallback((id: string) => {
    setConfigs(prev => prev.filter(c => c.id !== id));
  }, []);

  const getConfigsByFolder = useCallback((folderId: string) => {
    return configs.filter(c => c.folderId === folderId);
  }, [configs]);

  // Prompt operations
  const addPrompt = useCallback((prompt: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPrompt: Prompt = {
      ...prompt,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setPrompts(prev => [...prev, newPrompt]);
    return newPrompt;
  }, []);

  const updatePrompt = useCallback((id: string, updates: Partial<Prompt>) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p));
  }, []);

  const deletePrompt = useCallback((id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id));
  }, []);

  return {
    folders,
    configs,
    prompts,
    addFolder,
    updateFolder,
    deleteFolder,
    addConfig,
    updateConfig,
    deleteConfig,
    getConfigsByFolder,
    addPrompt,
    updatePrompt,
    deletePrompt,
  };
}
