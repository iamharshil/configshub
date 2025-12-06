import { ArrowLeft, FileCode, Folder, Plus, Search, Menu } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ConfigCard } from '@/components/ConfigCard';
import { ConfigDialog } from '@/components/dialogs/ConfigDialog';
import { FolderDialog } from '@/components/dialogs/FolderDialog';
import { EmptyState } from '@/components/EmptyState';
import { FolderCard } from '@/components/FolderCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConfigFile, Folder as FolderType } from '@/types';

import { useOutletContext } from 'react-router-dom';
import { useStore } from '@/hooks/useStore';

export function ConfigsView() {
  const {
    folders,
    configs,
    addFolder,
    updateFolder,
    deleteFolder,
    addConfig,
    updateConfig,
    deleteConfig,
    getConfigsByFolder,
  } = useStore();
  const { onOpenMobileMenu } = useOutletContext<{ onOpenMobileMenu: () => void }>();
  const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState<FolderType | null>(null);
  const [editingConfig, setEditingConfig] = useState<ConfigFile | null>(null);

  const filteredFolders = folders.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const folderConfigs = selectedFolder ? getConfigsByFolder(selectedFolder.id) : [];

  const handleEditFolder = (folder: FolderType) => {
    setEditingFolder(folder);
    setFolderDialogOpen(true);
  };

  const handleEditConfig = (config: ConfigFile) => {
    setEditingConfig(config);
    setConfigDialogOpen(true);
  };

  const handleSaveFolder = (data: { name: string; icon: string; description?: string }) => {
    if (editingFolder) {
      updateFolder(editingFolder.id, data);
      toast.success('Folder updated');
    } else {
      addFolder(data);
      toast.success('Folder created');
    }
    setEditingFolder(null);
  };

  const handleSaveConfig = (data: { name: string; content: string; language?: string; folderId: string }) => {
    if (editingConfig) {
      updateConfig(editingConfig.id, data);
      toast.success('Config updated');
    } else {
      addConfig(data);
      toast.success('Config created');
    }
    setEditingConfig(null);
  };

  const handleDeleteFolder = (folder: FolderType) => {
    deleteFolder(folder.id);
    if (selectedFolder?.id === folder.id) {
      setSelectedFolder(null);
    }
    toast.success('Folder deleted');
  };

  const handleDeleteConfig = (config: ConfigFile) => {
    deleteConfig(config.id);
    toast.success('Config deleted');
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <header className="shrink-0 px-8 py-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon-sm"
              className="md:hidden text-muted-foreground"
              onClick={onOpenMobileMenu}
            >
              <Menu className="w-5 h-5" />
            </Button>
            {selectedFolder && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedFolder(null)}
                className="mr-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                {selectedFolder ? selectedFolder.name : 'Configs'}
              </h1>
              <p className="text-base text-muted-foreground mt-1">
                {selectedFolder
                  ? `${folderConfigs.length} config${folderConfigs.length === 1 ? '' : 's'}`
                  : `${folders.length} folders for your dev tools`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-secondary/50 border-transparent focus:bg-secondary transition-all rounded-xl"
              />
            </div>
            <Button
              onClick={() => {
                if (selectedFolder) {
                  setEditingConfig(null);
                  setConfigDialogOpen(true);
                } else {
                  setEditingFolder(null);
                  setFolderDialogOpen(true);
                }
              }}
              className="rounded-xl bg-foreground text-background hover:bg-foreground/90 font-medium"
              size="default"
            >
              <Plus className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">{selectedFolder ? 'New Config' : 'New Folder'}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {!selectedFolder ? (
          // Folders Grid
          filteredFolders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredFolders.map((folder, index) => (
                <div key={folder.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in">
                  <FolderCard
                    folder={folder}
                    configCount={getConfigsByFolder(folder.id).length}
                    isSelected={false}
                    onClick={() => setSelectedFolder(folder)}
                    onEdit={() => handleEditFolder(folder)}
                    onDelete={() => handleDeleteFolder(folder)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Folder}
              title="No folders yet"
              description="Create your first folder to organize your development configs by tool or project."
              actionLabel="Create Folder"
              onAction={() => {
                setEditingFolder(null);
                setFolderDialogOpen(true);
              }}
            />
          )
        ) : (
          // Configs Grid
          folderConfigs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {folderConfigs.map((config, index) => (
                <div key={config.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in">
                  <ConfigCard
                    config={config}
                    onEdit={() => handleEditConfig(config)}
                    onDelete={() => handleDeleteConfig(config)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FileCode}
              title="No configs yet"
              description={`Add your first config file to ${selectedFolder.name}.`}
              actionLabel="Add Config"
              onAction={() => {
                setEditingConfig(null);
                setConfigDialogOpen(true);
              }}
            />
          )
        )}
      </main>

      {/* Dialogs */}
      <FolderDialog
        open={folderDialogOpen}
        onOpenChange={setFolderDialogOpen}
        folder={editingFolder}
        onSave={handleSaveFolder}
      />
      {selectedFolder && (
        <ConfigDialog
          open={configDialogOpen}
          onOpenChange={setConfigDialogOpen}
          config={editingConfig}
          folderId={selectedFolder.id}
          onSave={handleSaveConfig}
        />
      )}
    </div>
  );
}
