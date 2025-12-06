import { Folder as FolderIcon, Terminal, Layout, Code, MoreHorizontal, Pencil, Trash2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Folder } from '@/types';

interface FolderCardProps {
  folder: Folder;
  configCount: number;
  isSelected: boolean;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  vscode: Code,
  terminal: Terminal,
  layout: Layout,
  default: FolderIcon,
};

export function FolderCard({ folder, configCount, isSelected, onClick, onEdit, onDelete }: FolderCardProps) {
  const Icon = iconMap[folder.icon] || iconMap.default;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "group relative card-elevated p-5 cursor-pointer transition-all duration-300 hover:shadow-md hover:border-primary/20 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl",
        isSelected && "ring-2 ring-primary/20 border-primary/20 bg-primary/5"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
            isSelected ? "bg-primary/15" : "bg-secondary/80 group-hover:bg-secondary"
          )}>
            <Icon className={cn(
              "w-7 h-7 transition-colors",
              isSelected ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
            )} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{folder.name}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {configCount} {configCount === 1 ? 'config' : 'configs'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="icon-sm"
                className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                aria-label="Folder actions"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-popover border-border">
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(); }}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary transition-colors hidden lg:block" />
        </div>
      </div>

      {folder.description && (
        <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
          {folder.description}
        </p>
      )}
    </div>
  );
}
