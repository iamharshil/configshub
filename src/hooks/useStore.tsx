import { useCallback, useState } from 'react';
import { ConfigFile, Folder, Prompt, Workspace, Activity, Snippet } from '@/types';

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

interface User {
  name: string;
  email: string;
  avatar: string;
}

export function useStore() {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [configs, setConfigs] = useState<ConfigFile[]>(initialConfigs);
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);

  const [user, setUser] = useState<User>({
    name: 'Jerry Hustanto',
    email: 'jtanto@elano.com',
    avatar: 'JH',
  });

  const updateUser = useCallback((data: Partial<User>) => {
    setUser(prevUser => ({ ...prevUser, ...data }));
  }, []);

  // Activity operations
  const [activities, setActivities] = useState<Activity[]>([
    { id: '1', type: 'create_config', description: 'Created settings.json', createdAt: new Date() },
    { id: '2', type: 'update_profile', description: 'Updated profile avatar', createdAt: new Date(Date.now() - 86400000) },
  ]);

  const logActivity = useCallback((type: Activity['type'], description: string) => {
    setActivities(prev => [{
      id: generateId(),
      type,
      description,
      createdAt: new Date(),
    }, ...prev]);
  }, []);

  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    {
      id: '1',
      name: 'Jerry Hustanto',
      email: 'jtanto@elano.com',
      avatar: 'JH',
      color: 'bg-blue-600'
    },
    {
      id: '2',
      name: 'Personal',
      avatar: 'ME',
      color: 'bg-emerald-600'
    }
  ]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>(workspaces[0]);

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
    setConfigs(prev => prev.map(config => {
      if (config.id !== id) return config;

      // If content is changing, save to history
      const history = config.history || [];
      if (updates.content && updates.content !== config.content) {
        history.unshift({
          content: config.content,
          updatedAt: new Date(),
        });
      }

      return { ...config, ...updates, history, updatedAt: new Date() };
    }));

    if (updates.name || updates.content) {
      logActivity('update_config', `Updated config ${updates.name || 'file'}`);
    }
  }, [logActivity]);

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

  // Workspace operations
  const addWorkspace = useCallback((workspace: Omit<Workspace, 'id'>) => {
    const newWorkspace: Workspace = {
      ...workspace,
      id: generateId(),
    };
    setWorkspaces(prev => [...prev, newWorkspace]);
    return newWorkspace;
  }, []);

  const deleteWorkspace = useCallback((id: string) => {
    setWorkspaces(prev => {
      const newWorkspaces = prev.filter(w => w.id !== id);
      // If we deleted the current workspace, switch to the first available one
      if (currentWorkspace.id === id && newWorkspaces.length > 0) {
        setCurrentWorkspace(newWorkspaces[0]);
      }
      return newWorkspaces;
    });
  }, [currentWorkspace.id]);

  // Snippet operations
  const [snippets, setSnippets] = useState<Snippet[]>([
    {
      id: 'docker-node',
      title: 'Node.js Dockerfile',
      description: 'Production-ready Dockerfile for Node.js applications',
      language: 'dockerfile',
      content: `FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/main.js"]`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'gh-action-ci',
      title: 'GitHub Actions CI',
      description: 'Standard CI pipeline for testing and building',
      language: 'yaml',
      content: `name: CI
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm test
      - run: npm run build`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'tsconfig-react',
      title: 'React TSConfig',
      description: 'Recommended tsconfig.json for React projects',
      language: 'json',
      content: `{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  const addSnippet = useCallback((snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSnippet: Snippet = {
      ...snippet,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSnippets(prev => [...prev, newSnippet]);
    return newSnippet;
  }, []);

  const updateSnippet = useCallback((id: string, updates: Partial<Snippet>) => {
    setSnippets(prev => prev.map(s => s.id === id ? { ...s, ...updates, updatedAt: new Date() } : s));
  }, []);

  const deleteSnippet = useCallback((id: string) => {
    setSnippets(prev => prev.filter(s => s.id !== id));
  }, []);



  return {
    folders,
    configs,
    prompts,
    workspaces,
    currentWorkspace,
    setCurrentWorkspace,
    addWorkspace,
    deleteWorkspace,
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
    user,
    updateUser,
    snippets,
    addSnippet,
    updateSnippet,
    deleteSnippet,
    activities,
    logActivity,
  };
}
