import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

interface CodeBlockProps {
    language: string;
    code: string;
    className?: string;
}

export function CodeBlock({ language, code, className }: CodeBlockProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    return (
        <div className={cn("rounded-md overflow-hidden text-sm", className)}>
            <SyntaxHighlighter
                language={language || 'text'}
                style={isDark ? vscDarkPlus : ghcolors}
                customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: 'transparent',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                }}
                wrapLines={true}
                wrapLongLines={true}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}
