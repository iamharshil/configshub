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

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative card-elevated p-5 cursor-pointer transition-all duration-300 hover:shadow-soft-lg",
        isSelected && "ring-2 ring-primary/20"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
            isSelected ? "bg-primary/15" : "bg-secondary"
          )}>
            <Icon className={cn(
              "w-6 h-6 transition-colors",
              isSelected ? "text-primary" : "text-muted-foreground"
            )} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{folder.name}</h3>
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
                className="opacity-0 group-hover:opacity-100 transition-opacity"
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
          
          <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
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
