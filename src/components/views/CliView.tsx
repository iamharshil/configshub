import { Terminal, Rocket, Bell, Github } from 'lucide-react';
import { PageLayout } from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

export function CliView() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleNotify = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter your email');
            return;
        }
        // Simulate subscription
        setSubscribed(true);
        toast.success('You\'ll be notified when CLI is ready!');
    };

    return (
        <PageLayout
            title="CLI Connect"
            description="Manage your configs directly from the terminal"
        >
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="max-w-lg text-center space-y-8">
                    {/* Coming Soon Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                        <Rocket className="w-4 h-4" />
                        Coming Soon
                    </div>

                    {/* Icon */}
                    <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <Terminal className="w-10 h-10 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                            CLI is on the way
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We're building a powerful CLI tool to sync your configurations directly from the terminal.
                            Push, pull, and manage configs without leaving your workflow.
                        </p>
                    </div>

                    {/* Features Preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
                            <p className="text-sm font-medium text-foreground">Quick Sync</p>
                            <p className="text-xs text-muted-foreground mt-1">One command to sync all configs</p>
                        </div>
                        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
                            <p className="text-sm font-medium text-foreground">Auto Push</p>
                            <p className="text-xs text-muted-foreground mt-1">Watch mode for live updates</p>
                        </div>
                        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
                            <p className="text-sm font-medium text-foreground">Multi-Project</p>
                            <p className="text-xs text-muted-foreground mt-1">Switch between projects easily</p>
                        </div>
                    </div>

                    {/* Notify Form */}
                    {!subscribed ? (
                        <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 rounded-xl h-11"
                            />
                            <Button type="submit" className="rounded-xl h-11 px-6">
                                <Bell className="w-4 h-4 mr-2" />
                                Notify Me
                            </Button>
                        </form>
                    ) : (
                        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400">
                            <p className="text-sm font-medium">You're on the list! We'll notify you when CLI launches.</p>
                        </div>
                    )}

                    {/* GitHub Link */}
                    <div className="pt-4">
                        <a
                            href="https://github.com/configshub/cli"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            Follow development on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
