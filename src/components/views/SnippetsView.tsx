
import { Search, Code2, Copy, Check, Plus, Pencil, Trash2 } from 'lucide-react';
import { PageLayout } from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { CodeBlock } from '@/components/CodeBlock';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';
import { toast } from 'sonner';
import { useStore } from '@/hooks/useStore';
import { Snippet } from '@/types';

export function SnippetsView() {
    const { snippets, addSnippet, updateSnippet, deleteSnippet } = useStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [copied, setCopied] = useState<string | null>(null);

    // CRUD State
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);
    const [formData, setFormData] = useState({ title: '', description: '', language: 'text', content: '' });

    const filteredSnippets = snippets.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCopy = (content: string, id: string) => {
        navigator.clipboard.writeText(content);
        setCopied(id);
        toast.success('Snippet copied to clipboard');
        setTimeout(() => setCopied(null), 2000);
    };



    const handleOpenEdit = (snippet?: Snippet) => {
        if (snippet) {
            setEditingSnippet(snippet);
            setFormData({
                title: snippet.title,
                description: snippet.description,
                language: snippet.language,
                content: snippet.content
            });
        } else {
            setEditingSnippet(null);
            setFormData({ title: '', description: '', language: 'text', content: '' });
        }
        setEditDialogOpen(true);
    };

    const handleSaveSnippet = () => {
        if (!formData.title || !formData.content) {
            toast.error('Title and content are required');
            return;
        }

        if (editingSnippet) {
            updateSnippet(editingSnippet.id, formData);
            toast.success('Snippet updated');
        } else {
            addSnippet(formData);
            toast.success('Snippet created');
        }
        setEditDialogOpen(false);
    };

    const handleDeleteSnippet = (id: string) => {
        deleteSnippet(id);
        toast.success('Snippet deleted');
    };

    return (
        <PageLayout
            title="Snippet Library"
            description="Store and manage your code snippets"
            search={
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search snippets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64 bg-secondary/50 border-transparent focus:bg-secondary transition-all rounded-xl"
                    />
                </div>
            }
            actions={
                <Button onClick={() => handleOpenEdit()}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Snippet
                </Button>
            }
        >
            {/* Content */}
            <div className="">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl">
                    {filteredSnippets.map((snippet) => (
                        <div key={snippet.id} className="group flex flex-col p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-primary/20 transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Code2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{snippet.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span className="px-2 py-0.5 rounded-md bg-secondary text-xs font-medium uppercase">
                                                {snippet.language}
                                            </span>
                                            <span>{snippet.description}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        onClick={() => handleOpenEdit(snippet)}
                                        className="text-muted-foreground hover:text-foreground"
                                        title="Edit Snippet"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        onClick={() => handleDeleteSnippet(snippet.id)}
                                        className="text-muted-foreground hover:text-destructive"
                                        title="Delete Snippet"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="relative flex-1 rounded-xl overflow-hidden bg-muted/50 border border-border/50 mb-4 group-hover:shadow-inner transition-all">
                                <CodeBlock
                                    language={snippet.language}
                                    code={snippet.content}
                                    className="h-48 overflow-y-auto bg-transparent"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-muted/50 to-transparent pointer-events-none" />
                            </div>

                            <Button
                                variant={copied === snippet.id ? "outline" : "secondary"}
                                size="sm"
                                onClick={() => handleCopy(snippet.content, snippet.id)}
                                className={cn(
                                    "w-full gap-2 transition-all duration-300",
                                    copied === snippet.id && "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20"
                                )}
                            >
                                {copied === snippet.id ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Copy Code
                                    </>
                                )}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>



            {/* Create/Edit Snippet Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{editingSnippet ? 'Edit Snippet' : 'New Snippet'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g., Helper Function"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="What does this code do?"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="language">Language</Label>
                            <Select
                                value={formData.language}
                                onValueChange={(value) => setFormData({ ...formData, language: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent className="max-h-60">
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="javascript">JavaScript</SelectItem>
                                    <SelectItem value="typescript">TypeScript</SelectItem>
                                    <SelectItem value="python">Python</SelectItem>
                                    <SelectItem value="java">Java</SelectItem>
                                    <SelectItem value="csharp">C#</SelectItem>
                                    <SelectItem value="cpp">C++</SelectItem>
                                    <SelectItem value="go">Go</SelectItem>
                                    <SelectItem value="rust">Rust</SelectItem>
                                    <SelectItem value="php">PHP</SelectItem>
                                    <SelectItem value="ruby">Ruby</SelectItem>
                                    <SelectItem value="swift">Swift</SelectItem>
                                    <SelectItem value="kotlin">Kotlin</SelectItem>
                                    <SelectItem value="sql">SQL</SelectItem>
                                    <SelectItem value="html">HTML</SelectItem>
                                    <SelectItem value="css">CSS</SelectItem>
                                    <SelectItem value="json">JSON</SelectItem>
                                    <SelectItem value="yaml">YAML</SelectItem>
                                    <SelectItem value="xml">XML</SelectItem>
                                    <SelectItem value="markdown">Markdown</SelectItem>
                                    <SelectItem value="dockerfile">Dockerfile</SelectItem>
                                    <SelectItem value="bash">Bash</SelectItem>
                                    <SelectItem value="powershell">PowerShell</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="content">Code</Label>
                            <Textarea
                                id="content"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="font-mono h-64 resize-none"
                                placeholder="Paste your code here..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleSaveSnippet}>Save Snippet</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </PageLayout>
    );
}

