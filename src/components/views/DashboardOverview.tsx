import { useStore } from '@/hooks/useStore';
import { FileJson, Sparkles, Folder, Clock, Copy, ArrowRight, Code2, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export function DashboardOverview() {
    const { configs, prompts, folders, activities, user } = useStore();

    // Get recent configs (last 5)
    const recentConfigs = [...configs]
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 5);

    // Get recent prompts (last 3)
    const recentPrompts = [...prompts]
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 3);

    const stats = [
        { label: 'Total Configs', value: configs.length, icon: FileJson, color: 'text-blue-500', bg: 'bg-blue-500/10', href: '/dashboard/configs' },
        { label: 'Saved Prompts', value: prompts.length, icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-500/10', href: '/dashboard/prompts' },
        { label: 'Folders', value: folders.length, icon: Folder, color: 'text-amber-500', bg: 'bg-amber-500/10', href: '/dashboard/configs' },
    ];

    const copyToClipboard = (content: string, name: string) => {
        navigator.clipboard.writeText(content);
        toast.success(`${name} copied to clipboard`);
    };

    return (
        <PageLayout
            title={`Welcome back, ${user.name.split(' ')[0]}`}
            description="Here's what's happening in your workspace"
        >
            {/* Content */}
            <div className="space-y-6 sm:space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {stats.map((stat) => (
                        <Link
                            key={stat.label}
                            to={stat.href}
                            className="p-4 sm:p-5 rounded-lg bg-card border border-border shadow-md hover:shadow-lg hover:border-primary/20 transition-all duration-200 group"
                        >
                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                <div className={`p-2 sm:p-2.5 rounded-lg ${stat.bg} group-hover:scale-110 transition-transform`}>
                                    <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                                </div>
                                <span className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
                        </Link>
                    ))}
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Recent Configs */}
                    <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                                <FileJson className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                                Recent Configs
                            </h2>
                            <Link to="/dashboard/configs" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                                View all <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                        <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-card/50 shadow-sm overflow-hidden">
                            {recentConfigs.length === 0 ? (
                                <div className="p-6 sm:p-8 text-center">
                                    <FolderOpen className="w-10 h-10 mx-auto text-muted-foreground/50 mb-3" />
                                    <p className="text-sm sm:text-base text-muted-foreground">No configs yet</p>
                                    <Link to="/dashboard/configs">
                                        <Button size="sm" className="mt-3">Create your first config</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="divide-y divide-border/50">
                                    {recentConfigs.map((config) => (
                                        <div key={config.id} className="p-3 sm:p-4 flex items-center justify-between gap-3 hover:bg-muted/30 transition-colors">
                                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                                <div className="p-2 rounded-lg bg-blue-500/10">
                                                    <Code2 className="w-4 h-4 text-blue-500" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-medium truncate">{config.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {config.language || 'plaintext'} • {formatDistanceToNow(config.updatedAt, { addSuffix: true })}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="shrink-0 h-8 w-8"
                                                onClick={() => copyToClipboard(config.content, config.name)}
                                            >
                                                <Copy className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6 sm:space-y-8">
                        {/* Quick Actions */}
                        <div className="space-y-3 sm:space-y-4">
                            <h2 className="text-base sm:text-lg font-semibold">Quick Actions</h2>
                            <div className="grid gap-2 sm:gap-3">
                                <Link to="/dashboard/configs">
                                    <Button variant="outline" className="w-full justify-start h-auto py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl border-border/50 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all">
                                        <FileJson className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                                        <div className="flex flex-col items-start text-left">
                                            <span className="text-sm font-medium">New Config</span>
                                            <span className="text-[10px] sm:text-xs text-muted-foreground font-normal">Create a new configuration file</span>
                                        </div>
                                    </Button>
                                </Link>
                                <Link to="/dashboard/prompts">
                                    <Button variant="outline" className="w-full justify-start h-auto py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl border-border/50 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all">
                                        <Sparkles className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                                        <div className="flex flex-col items-start text-left">
                                            <span className="text-sm font-medium">New Prompt</span>
                                            <span className="text-[10px] sm:text-xs text-muted-foreground font-normal">Save a new AI prompt</span>
                                        </div>
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Recent Prompts */}
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                                    Recent Prompts
                                </h2>
                                <Link to="/dashboard/prompts" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                                    View all <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                            <div className="space-y-2">
                                {recentPrompts.length === 0 ? (
                                    <div className="p-4 rounded-xl border border-border/50 bg-card/50 text-center text-sm text-muted-foreground">
                                        No prompts saved yet
                                    </div>
                                ) : (
                                    recentPrompts.map((prompt) => (
                                        <div
                                            key={prompt.id}
                                            className="p-3 rounded-xl border border-border/50 bg-card/50 hover:bg-muted/30 transition-colors cursor-pointer group"
                                            onClick={() => copyToClipboard(prompt.content, prompt.title)}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-medium truncate">{prompt.title}</p>
                                                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{prompt.content}</p>
                                                </div>
                                                <Copy className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        {activities.length > 0 && (
                            <div className="space-y-3 sm:space-y-4">
                                <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                                    Activity
                                </h2>
                                <div className="space-y-2">
                                    {activities.slice(0, 3).map((activity) => (
                                        <div key={activity.id} className="flex items-center gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                                            <span className="text-muted-foreground truncate flex-1">{activity.description}</span>
                                            <span className="text-xs text-muted-foreground/70 shrink-0">
                                                {formatDistanceToNow(activity.createdAt, { addSuffix: true })}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
