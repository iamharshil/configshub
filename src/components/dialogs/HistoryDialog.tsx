import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ConfigFile } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface HistoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    config: ConfigFile | null;
    onRestore: (content: string) => void;
}

export function HistoryDialog({ open, onOpenChange, config, onRestore }: HistoryDialogProps) {
    if (!config) return null;

    const history = config.history || [];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Version History: {config.name}</DialogTitle>
                </DialogHeader>

                <div className="flex-1 min-h-0 mt-4">
                    {history.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No history available for this config.
                        </div>
                    ) : (
                        <ScrollArea className="h-[50vh] pr-4">
                            <div className="space-y-4">
                                {history.map((version, index) => (
                                    <div key={index} className="p-4 rounded-xl border border-border/50 bg-muted/30 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">
                                                {formatDistanceToNow(new Date(version.updatedAt), { addSuffix: true })}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(version.content);
                                                        toast.success('Content copied');
                                                    }}
                                                >
                                                    <Copy className="w-3.5 h-3.5 mr-2" />
                                                    Copy
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    className="h-8"
                                                    onClick={() => {
                                                        onRestore(version.content);
                                                        onOpenChange(false);
                                                    }}
                                                >
                                                    <RotateCcw className="w-3.5 h-3.5 mr-2" />
                                                    Restore
                                                </Button>
                                            </div>
                                        </div>
                                        <pre className="p-3 rounded-lg bg-background border border-border/50 text-xs font-mono overflow-x-auto">
                                            <code>{version.content.slice(0, 150)}{version.content.length > 150 && '...'}</code>
                                        </pre>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
