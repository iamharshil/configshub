import { ArrowLeft, FileCode, Folder, Plus, Search } from 'lucide-react';
import { PageLayout } from '@/components/PageLayout';
import { useState } from 'react';
import { toast } from 'sonner';
import { ConfigCard } from '@/components/ConfigCard';
import { ConfigDialog } from '@/components/dialogs/ConfigDialog';
import { FolderDialog } from '@/components/dialogs/FolderDialog';
import { HistoryDialog } from '@/components/dialogs/HistoryDialog';
import { EmptyState } from '@/components/EmptyState';
import { FolderCard } from '@/components/FolderCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Copy } from 'lucide-react';
import { ConfigFile, Folder as FolderType } from '@/types';

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
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [sharingConfig, setSharingConfig] = useState<ConfigFile | null>(null);

  const handleShareConfig = (config: ConfigFile) => {
    setSharingConfig(config);
    setShareDialogOpen(true);
  };

  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [historyConfig, setHistoryConfig] = useState<ConfigFile | null>(null);

  const handleHistoryConfig = (config: ConfigFile) => {
    setHistoryConfig(config);
    setHistoryDialogOpen(true);
  };



  // ... existing imports

  return (
    <PageLayout
      title={
        <div className="flex items-center gap-2">
          {selectedFolder && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedFolder(null)}
              className="-ml-2 h-8 w-8"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight truncate">
            {selectedFolder ? selectedFolder.name : 'Configs'}
          </h1>
        </div>
      }
      description={selectedFolder
        ? `${folderConfigs.length} config${folderConfigs.length === 1 ? '' : 's'}`
        : `${folders.length} folders for your dev tools`}
      search={
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 sm:pl-10 w-full sm:w-48 md:w-64 bg-secondary/50 border-transparent focus:bg-secondary transition-all rounded-lg sm:rounded-xl text-sm"
          />
        </div>
      }
      actions={
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
      }
    >
      {!selectedFolder ? (
        // Folders Grid
        filteredFolders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
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
          <div className="grid grid-cols-1 gap-3 sm:gap-5">
            {folderConfigs.map((config, index) => (
              <div key={config.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in">
                <ConfigCard
                  config={config}
                  onEdit={() => handleEditConfig(config)}
                  onDelete={() => handleDeleteConfig(config)}
                  onShare={() => handleShareConfig(config)}
                  onHistory={() => handleHistoryConfig(config)}
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


      {/* Dialogs */}
      <FolderDialog
        open={folderDialogOpen}
        onOpenChange={setFolderDialogOpen}
        folder={editingFolder}
        onSave={handleSaveFolder}
      />
      {
        selectedFolder && (
          <ConfigDialog
            open={configDialogOpen}
            onOpenChange={setConfigDialogOpen}
            config={editingConfig}
            folderId={selectedFolder.id}
            onSave={handleSaveConfig}
          />
        )
      }

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Configuration</DialogTitle>
            <DialogDescription>
              Anyone with this link will be able to view this configuration.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-4">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                defaultValue={`https://configshub.dev/s/${sharingConfig?.id || 'xyz'}`}
                readOnly
              />
            </div>
            <Button size="sm" className="px-3" onClick={() => {
              navigator.clipboard.writeText(`https://configshub.dev/s/${sharingConfig?.id || 'xyz'}`);
              toast.success("Link copied to clipboard");
              setShareDialogOpen(false);
            }}>
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <HistoryDialog
        open={historyDialogOpen}
        onOpenChange={setHistoryDialogOpen}
        config={historyConfig}
        onRestore={(content) => {
          if (historyConfig) {
            updateConfig(historyConfig.id, { content });
            toast.success('Config restored from history');
          }
        }}
      />
    </PageLayout>
  );
}
