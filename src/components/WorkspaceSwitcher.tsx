import { ChevronsUpDown, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useStore } from '@/hooks/useStore';
import { cn } from '@/lib/utils';

interface WorkspaceSwitcherProps {
    collapsed: boolean;
}

import { useState } from 'react';
import { WorkspaceDialog } from '@/components/dialogs/WorkspaceDialog';

export function WorkspaceSwitcher({ collapsed }: WorkspaceSwitcherProps) {
    const { workspaces, currentWorkspace, setCurrentWorkspace } = useStore();
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="lg"
                        className={cn(
                            "w-full justify-start gap-3 px-2 py-6 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            collapsed && "justify-center px-0"
                        )}
                    >
                        <div className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white font-semibold shadow-lg",
                            currentWorkspace.color
                        )}>
                            {currentWorkspace.avatar}
                        </div>
                        {!collapsed && (
                            <div className="flex flex-col items-start text-left animate-fade-in">
                                <span className="text-sm font-semibold text-sidebar-foreground">{currentWorkspace.name}</span>
                                {currentWorkspace.email && (
                                    <span className="text-xs text-muted-foreground">{currentWorkspace.email}</span>
                                )}
                            </div>
                        )}
                        {!collapsed && (
                            <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-64 bg-popover border-border p-2"
                    align="start"
                    side={collapsed ? "right" : "bottom"}
                >
                    <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2 py-1.5">
                        Workspaces
                    </DropdownMenuLabel>
                    {workspaces.map((workspace) => (
                        <DropdownMenuItem
                            key={workspace.id}
                            onClick={() => setCurrentWorkspace(workspace)}
                            className="flex items-center gap-3 p-2 cursor-pointer rounded-lg focus:bg-accent"
                        >
                            <div className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white text-xs font-medium",
                                workspace.color
                            )}>
                                {workspace.avatar}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{workspace.name}</span>
                                {workspace.email && (
                                    <span className="text-xs text-muted-foreground">{workspace.email}</span>
                                )}
                            </div>
                            {currentWorkspace.id === workspace.id && (
                                <Check className="ml-auto h-4 w-4 text-primary" />
                            )}
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator className="my-2 bg-border/50" />
                    <DropdownMenuItem
                        onClick={() => setDialogOpen(true)}
                        className="flex items-center gap-3 p-2 cursor-pointer rounded-lg focus:bg-accent"
                    >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-dashed border-muted-foreground/50 bg-background">
                            <Plus className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">Add workspace</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <WorkspaceDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </>
    );
}
