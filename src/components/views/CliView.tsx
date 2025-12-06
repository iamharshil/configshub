import { Terminal, Copy, Check } from 'lucide-react';
import { PageLayout } from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export function CliView() {
    const [copied, setCopied] = useState<string | null>(null);

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        toast.success('Command copied to clipboard');
        setTimeout(() => setCopied(null), 2000);
    };

    const steps = [
        {
            id: 'install',
            title: '1. Install the CLI',
            description: 'Install the ConfigsHub CLI globally using npm.',
            command: 'npm install -g @configshub/cli'
        },
        {
            id: 'login',
            title: '2. Authenticate',
            description: 'Log in to your account to access your workspace.',
            command: 'configshub login'
        },
        {
            id: 'sync',
            title: '3. Sync Configurations',
            description: 'Pull your latest configurations to your local machine.',
            command: 'configshub sync'
        }
    ];

    return (
        <PageLayout
            title="CLI Connect"
            description="Manage your configs directly from the terminal"
        >
            {/* Content */}
            <div className="">
                <div className="max-w-3xl space-y-8">
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                <Terminal className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Why use the CLI?</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    The ConfigsHub CLI is the fastest way to keep your development environment in sync.
                                    Push changes, pull updates, and manage your configs without leaving your terminal.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {steps.map((step) => (
                            <div key={step.id} className="space-y-3">
                                <h3 className="font-semibold text-lg">{step.title}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl -z-10" />
                                    <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card/50 font-mono text-sm">
                                        <span className="text-primary">$ {step.command}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            onClick={() => copyToClipboard(step.command, step.id)}
                                            className="text-muted-foreground hover:text-foreground"
                                        >
                                            {copied === step.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
