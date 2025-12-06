import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/hooks/useStore';
import { cn } from '@/lib/utils';

interface WorkspaceDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const COLORS = [
    'bg-blue-600',
    'bg-emerald-600',
    'bg-violet-600',
    'bg-amber-600',
    'bg-rose-600',
    'bg-cyan-600',
    'bg-slate-600',
];

export function WorkspaceDialog({ open, onOpenChange }: WorkspaceDialogProps) {
    const { addWorkspace, setCurrentWorkspace } = useStore();
    const [name, setName] = useState('');
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        // Generate initials from name
        const initials = name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

        const newWorkspace = addWorkspace({
            name,
            avatar: initials,
            color: selectedColor,
        });

        setCurrentWorkspace(newWorkspace);
        onOpenChange(false);
        setName('');
        setSelectedColor(COLORS[0]);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Workspace</DialogTitle>
                    <DialogDescription>
                        Add a new workspace to organize your configs and prompts.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Workspace Name</Label>
                        <Input
                            id="name"
                            placeholder="Acme Corp"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="rounded-xl"
                            autoFocus
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Workspace Color</Label>
                        <div className="flex flex-wrap gap-3">
                            {COLORS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => setSelectedColor(color)}
                                    className={cn(
                                        "w-8 h-8 rounded-full transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                                        color,
                                        selectedColor === color && "ring-2 ring-primary ring-offset-2 scale-110"
                                    )}
                                    aria-label="Select color"
                                />
                            ))}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!name.trim()}>
                            Create Workspace
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
