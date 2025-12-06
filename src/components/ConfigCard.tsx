import { FileCode, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ConfigFile } from '@/types';
import { CopyButton } from './CopyButton';

interface ConfigCardProps {
  config: ConfigFile;
  onEdit: () => void;
  onDelete: () => void;
}

const languageColors: Record<string, string> = {
  json: 'bg-warning/15 text-warning',
  lua: 'bg-primary/15 text-primary',
  bash: 'bg-success/15 text-success',
  yaml: 'bg-destructive/15 text-destructive',
  toml: 'bg-purple-500/15 text-purple-500',
  javascript: 'bg-yellow-500/15 text-yellow-600',
  typescript: 'bg-blue-500/15 text-blue-500',
};

export function ConfigCard({ config, onEdit, onDelete }: ConfigCardProps) {
  const langClass = languageColors[config.language || ''] || 'bg-muted text-muted-foreground';

  return (
    <div className="group card-elevated p-5 transition-all duration-300 hover:shadow-soft-lg animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
            <FileCode className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">{config.name}</h4>
            <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-md ${langClass}`}>
              {config.language || 'text'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <CopyButton content={config.content} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
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

      <div className="relative rounded-xl overflow-hidden">
        <pre className="p-4 bg-muted/50 text-xs font-mono text-muted-foreground overflow-x-auto max-h-36 overflow-y-auto">
          <code>{config.content}</code>
        </pre>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-card to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
