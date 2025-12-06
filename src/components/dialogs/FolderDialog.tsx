import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Folder } from '@/types';

interface FolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  folder?: Folder | null;
  onSave: (data: { name: string; icon: string; description?: string }) => void;
}

const icons = [
  { value: 'vscode', label: 'Code' },
  { value: 'terminal', label: 'Terminal' },
  { value: 'layout', label: 'Layout' },
  { value: 'default', label: 'Folder' },
];

export function FolderDialog({ open, onOpenChange, folder, onSave }: FolderDialogProps) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('default');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (folder) {
      setName(folder.name);
      setIcon(folder.icon);
      setDescription(folder.description || '');
    } else {
      setName('');
      setIcon('default');
      setDescription('');
    }
  }, [folder, open]);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), icon, description: description.trim() || undefined });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl">{folder ? 'Edit Folder' : 'New Folder'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., VSCode, Neovim, Tmux"
              className="bg-muted/50 border-border"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Icon</Label>
            <div className="flex gap-2">
              {icons.map((i) => (
                <button
                  key={i.value}
                  onClick={() => setIcon(i.value)}
                  className={cn(
                    "px-4 py-2 text-sm rounded-xl border transition-all",
                    icon === i.value
                      ? 'border-primary bg-primary/10 text-primary font-medium'
                      : 'border-border bg-muted/50 text-muted-foreground hover:border-primary/30 hover:text-foreground'
                  )}
                >
                  {i.label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this folder's contents"
              className="bg-muted/50 border-border resize-none"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim()}>
            {folder ? 'Save Changes' : 'Create Folder'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
