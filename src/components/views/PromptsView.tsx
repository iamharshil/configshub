import { Plus, Search, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { PromptDialog } from '@/components/dialogs/PromptDialog';
import { EmptyState } from '@/components/EmptyState';
import { PromptCard } from '@/components/PromptCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Prompt } from '@/types';

interface PromptsViewProps {
  prompts: Prompt[];
  onAddPrompt: (data: { title: string; content: string; category?: string; tags: string[] }) => void;
  onUpdatePrompt: (id: string, data: Partial<Prompt>) => void;
  onDeletePrompt: (id: string) => void;
}

export function PromptsView({
  prompts,
  onAddPrompt,
  onUpdatePrompt,
  onDeletePrompt,
}: PromptsViewProps) {
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
      onUpdatePrompt(editingPrompt.id, data);
      toast.success('Prompt updated');
    } else {
      onAddPrompt(data);
      toast.success('Prompt created');
    }
    setEditingPrompt(null);
  };

  const handleDelete = (prompt: Prompt) => {
    onDeletePrompt(prompt.id);
    toast.success('Prompt deleted');
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <header className="shrink-0 px-8 py-6 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Prompts</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {prompts.length} prompt{prompts.length === 1 ? '' : 's'} saved
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-muted/50 border-border rounded-xl"
              />
            </div>
            <Button onClick={() => { setEditingPrompt(null); setDialogOpen(true); }} className="rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              New Prompt
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
