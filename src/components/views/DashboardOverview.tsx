import { useStore } from '@/hooks/useStore';
import { FileJson, Sparkles, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { PageLayout } from '@/components/PageLayout';

export function DashboardOverview() {
    const { configs, prompts, workspaces, activities, user } = useStore();

    const stats = [
        { label: 'Total Configs', value: configs.length, icon: FileJson, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Saved Prompts', value: prompts.length, icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { label: 'Team Members', value: 3, icon: Users, color: 'text-green-500', bg: 'bg-green-500/10' },
    ];

    return (
        <PageLayout
            title={`Welcome back, ${user.name.split(' ')[0]}`}
            description="Here's what's happening in your workspace"
        >

            {/* Content */}
            <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="p-4 rounded-2xl border border-border/50 bg-card/50 shadow-sm hover:border-primary/20 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                            </div>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Clock className="w-5 h-5 text-muted-foreground" />
                            Recent Activity
                        </h2>
                        <div className="rounded-2xl border border-border/50 bg-card/50 shadow-sm overflow-hidden">
                            {activities.length === 0 ? (
                                <div className="p-8 text-center text-muted-foreground">No recent activity</div>
                            ) : (
                                <div className="divide-y divide-border/50">
                                    {activities.map((activity) => (
                                        <div key={activity.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-primary/50" />
                                                <span className="font-medium">{activity.description}</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground">
                                                {formatDistanceToNow(activity.createdAt, { addSuffix: true })}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions & Status */}
                    <div className="space-y-8">
                        {/* Quick Actions */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Quick Actions</h2>
                            <div className="grid gap-3">
                                <Button variant="outline" className="w-full justify-start h-auto py-3 px-4 rounded-xl border-border/50 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all">
                                    <FileJson className="w-4 h-4 mr-3" />
                                    <div className="flex flex-col items-start">
                                        <span className="font-medium">New Config</span>
                                        <span className="text-xs text-muted-foreground font-normal">Create a new configuration file</span>
                                    </div>
                                </Button>
                                <Button variant="outline" className="w-full justify-start h-auto py-3 px-4 rounded-xl border-border/50 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all">
                                    <Sparkles className="w-4 h-4 mr-3" />
                                    <div className="flex flex-col items-start">
                                        <span className="font-medium">New Prompt</span>
                                        <span className="text-xs text-muted-foreground font-normal">Save a new AI prompt</span>
                                    </div>
                                </Button>
                            </div>
                        </div>

                        {/* System Status */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">System Status</h2>
                            <div className="p-4 rounded-2xl border border-border/50 bg-card/50 shadow-sm space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">API Status</span>
                                    <span className="flex items-center gap-2 text-sm text-green-500 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        Operational
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Database</span>
                                    <span className="flex items-center gap-2 text-sm text-green-500 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        Connected
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Version</span>
                                    <span className="text-sm font-medium">v1.2.0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
