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
import { ConfigFile } from '@/types';

interface ConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config?: ConfigFile | null;
  folderId: string;
  onSave: (data: { name: string; content: string; language?: string; folderId: string }) => void;
}

const languages = ['json', 'lua', 'bash', 'yaml', 'toml', 'javascript', 'typescript', 'other'];

export function ConfigDialog({ open, onOpenChange, config, folderId, onSave }: ConfigDialogProps) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('');

  useEffect(() => {
    if (config) {
      setName(config.name);
      setContent(config.content);
      setLanguage(config.language || '');
    } else {
      setName('');
      setContent('');
      setLanguage('');
    }
  }, [config, open]);

  const handleSave = () => {
    if (!name.trim() || !content.trim()) return;
    onSave({
      name: name.trim(),
      content: content.trim(),
      language: language || undefined,
      folderId,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl">{config ? 'Edit Config' : 'New Config'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">File Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., settings.json"
                className="bg-muted/50 border-border rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Language</Label>
              <div className="flex flex-wrap gap-1.5">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={cn(
                      "px-2.5 py-1.5 text-xs rounded-lg border transition-all",
                      language === lang
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'border-border bg-muted/50 text-muted-foreground hover:border-primary/30'
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your config content here..."
              className="bg-muted/50 border-border font-mono text-sm min-h-[280px] resize-none rounded-xl"
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim() || !content.trim()} className="rounded-xl">
            {config ? 'Save Changes' : 'Create Config'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
