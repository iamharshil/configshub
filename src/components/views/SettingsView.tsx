import { useState } from 'react';
import { User, Building2, Plus, Mail, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/hooks/useStore';
import { cn } from '@/lib/utils';
import { WorkspaceDialog } from '@/components/dialogs/WorkspaceDialog';
import { ThemeToggle } from '@/components/ThemeToggle';

import { useOutletContext } from 'react-router-dom';

export function SettingsView() {
    const { onOpenMobileMenu } = useOutletContext<{ onOpenMobileMenu: () => void }>();
    const { currentWorkspace, workspaces, setCurrentWorkspace, deleteWorkspace, user, updateUser } = useStore();
    const [workspaceDialogOpen, setWorkspaceDialogOpen] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const handleSaveProfile = () => {
        const initials = name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

        updateUser({ name, email, avatar: initials });
        toast.success("Profile updated successfully");
    };

    return (
        <div className="flex flex-col h-full bg-background md:bg-transparent">
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-border/50 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden -ml-2 text-muted-foreground"
                        onClick={onOpenMobileMenu}
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground tracking-tight">Settings</h1>
                        <p className="text-sm text-muted-foreground">Manage your account and workspaces</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
                <Tabs defaultValue="account" className="w-full max-w-4xl space-y-6">
                    <TabsList className="bg-muted/50 p-1 rounded-xl">
                        <TabsTrigger value="account" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                            <User className="w-4 h-4 mr-2" />
                            Account
                        </TabsTrigger>
                        <TabsTrigger value="workspaces" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                            <Building2 className="w-4 h-4 mr-2" />
                            Workspaces
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="account" className="space-y-6 animate-fade-in">
                        <div className="grid gap-6">
                            {/* Profile Section */}
                            <div className="p-6 rounded-2xl border border-border/50 bg-card/50 shadow-sm space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Profile</h3>
                                    <p className="text-sm text-muted-foreground">Manage your public profile information.</p>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                                        {user.avatar}
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Display Name</Label>
                                            <Input
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="max-w-md rounded-xl"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="max-w-md rounded-xl"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                                </div>
                            </div>

                            {/* Preferences Section */}
                            <div className="p-6 rounded-2xl border border-border/50 bg-card/50 shadow-sm space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Preferences</h3>
                                    <p className="text-sm text-muted-foreground">Customize your interface experience.</p>
                                </div>

                                <div className="flex items-center justify-between max-w-md p-4 rounded-xl border border-border/50 bg-background/50">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Theme</Label>
                                        <p className="text-sm text-muted-foreground">Select your preferred appearance</p>
                                    </div>
                                    <div className="scale-90 origin-right">
                                        <ThemeToggle />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="workspaces" className="space-y-6 animate-fade-in">
                        <div className="p-6 rounded-2xl border border-border/50 bg-card/50 shadow-sm space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">My Workspaces</h3>
                                    <p className="text-sm text-muted-foreground">Manage workspaces you belong to.</p>
                                </div>
                                <Button onClick={() => setWorkspaceDialogOpen(true)} className="gap-2">
                                    <Plus className="w-4 h-4" />
                                    New Workspace
                                </Button>
                            </div>

                            <div className="grid gap-4">
                                {workspaces.map((workspace) => (
                                    <div
                                        key={workspace.id}
                                        className={cn(
                                            "flex items-center justify-between p-4 rounded-xl border transition-all",
                                            currentWorkspace.id === workspace.id
                                                ? "border-primary/50 bg-primary/5 shadow-sm"
                                                : "border-border/50 bg-background/50 hover:border-primary/20"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white font-semibold shadow-sm",
                                                workspace.color
                                            )}>
                                                {workspace.avatar}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-semibold">{workspace.name}</h4>
                                                    {currentWorkspace.id === workspace.id && (
                                                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                                            Current
                                                        </span>
                                                    )}
                                                </div>
                                                {workspace.email && (
                                                    <p className="text-sm text-muted-foreground">{workspace.email}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {currentWorkspace.id !== workspace.id && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setCurrentWorkspace(workspace)}
                                                >
                                                    Switch
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="icon-sm"
                                                className="text-muted-foreground hover:text-destructive"
                                                onClick={() => deleteWorkspace(workspace.id)}
                                                disabled={workspaces.length === 1}
                                                title={workspaces.length === 1 ? "Cannot delete the last workspace" : "Delete workspace"}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <WorkspaceDialog
                open={workspaceDialogOpen}
                onOpenChange={setWorkspaceDialogOpen}
            />
        </div>
    );
}

import { Menu } from 'lucide-react';
