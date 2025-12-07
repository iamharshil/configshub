import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOutletContext } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
    title: React.ReactNode;
    description?: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
    search?: React.ReactNode;
    className?: string;
}

export function PageLayout({
    title,
    description,
    children,
    actions,
    search,
    className,
}: PageLayoutProps) {
    const { onOpenMobileMenu } = useOutletContext<{ onOpenMobileMenu: () => void }>();

    return (
        <div className="flex flex-col h-full bg-background md:bg-transparent min-h-0">
            {/* Header */}
            <div className="flex-none flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 md:p-8 border-b border-border/50 bg-background/50 backdrop-blur-sm sticky top-0 z-10 transition-all duration-200">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 overflow-hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden -ml-1 text-muted-foreground shrink-0"
                        onClick={onOpenMobileMenu}
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                    <div className="flex-1 min-w-0">
                        {typeof title === "string" ? (
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight truncate">
                                {title}
                            </h1>
                        ) : (
                            title
                        )}
                        {description && (
                            <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-0.5 sm:mt-1 truncate">
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    {search}
                    {actions}
                </div>
            </div>

            {/* Content */}
            <main className={cn("flex-1 overflow-y-auto p-3 sm:p-4 md:p-8", className)}>
                {children}
            </main>
        </div>
    );
}
