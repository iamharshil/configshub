import { Sparkles, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Prompt } from '@/types';
import { CopyButton } from './CopyButton';

interface PromptCardProps {
  prompt: Prompt;
  onEdit: () => void;
  onDelete: () => void;
}

export function PromptCard({ prompt, onEdit, onDelete }: PromptCardProps) {
  return (
    <div className="group card-elevated p-5 transition-all duration-300 hover:shadow-soft-lg animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{prompt.title}</h4>
            {prompt.category && (
              <span className="text-sm text-muted-foreground">{prompt.category}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <CopyButton content={prompt.content} size="icon" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-popover border-border">
              <DropdownMenuItem onClick={onEdit}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="relative mb-4 rounded-xl overflow-hidden">
        <div className="p-4 bg-muted/50 text-sm text-muted-foreground whitespace-pre-wrap max-h-40 overflow-hidden leading-relaxed">
          {prompt.content}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-card to-transparent pointer-events-none" />
      </div>

      {prompt.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {prompt.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs font-normal bg-secondary/70 text-muted-foreground hover:bg-secondary px-2.5 py-0.5 rounded-lg"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
