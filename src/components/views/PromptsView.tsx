import { Plus, Search, Sparkles, Menu } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { PromptDialog } from '@/components/dialogs/PromptDialog';
import { EmptyState } from '@/components/EmptyState';
import { PromptCard } from '@/components/PromptCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Prompt } from '@/types';

import { useOutletContext } from 'react-router-dom';
import { useStore } from '@/hooks/useStore';

export function PromptsView() {
  const {
    prompts,
    addPrompt,
    updatePrompt,
    deletePrompt,
  } = useStore();
  const { onOpenMobileMenu } = useOutletContext<{ onOpenMobileMenu: () => void }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);

  const filteredPrompts = prompts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEdit = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setDialogOpen(true);
  };

  const handleSave = (data: { title: string; content: string; category?: string; tags: string[] }) => {
    if (editingPrompt) {
      updatePrompt(editingPrompt.id, data);
      toast.success('Prompt updated');
    } else {
      addPrompt(data);
      toast.success('Prompt created');
    }
    setEditingPrompt(null);
  };

  const handleDelete = (prompt: Prompt) => {
    deletePrompt(prompt.id);
    toast.success('Prompt deleted');
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <header className="shrink-0 px-6 py-5 border-b border-border/40">
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
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">Prompts</h1>
              <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                {prompts.length} prompt{prompts.length === 1 ? '' : 's'} saved
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-muted/50 border-border rounded-xl"
              />
            </div>
            <Button onClick={() => { setEditingPrompt(null); setDialogOpen(true); }} className="rounded-xl" size="sm">
              <Plus className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">New Prompt</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {filteredPrompts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredPrompts.map((prompt, index) => (
              <div key={prompt.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in">
                <PromptCard
                  prompt={prompt}
                  onEdit={() => handleEdit(prompt)}
                  onDelete={() => handleDelete(prompt)}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Sparkles}
            title="No prompts yet"
            description="Create your first prompt to save and reuse your favorite AI prompts with one-click copy."
            actionLabel="Create Prompt"
            onAction={() => { setEditingPrompt(null); setDialogOpen(true); }}
          />
        )}
      </main>

      {/* Dialog */}
      <PromptDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        prompt={editingPrompt}
        onSave={handleSave}
      />
    </div>
  );
}
