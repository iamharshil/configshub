import { Skeleton } from "@/components/ui/skeleton";

export function GlobalLoader() {
    return (
        <div className="flex h-screen w-full bg-background overflow-hidden">
            {/* Sidebar Skeleton */}
            <div className="hidden md:flex w-64 flex-col border-r border-sidebar-border bg-sidebar p-4 space-y-4">
                <div className="flex items-center gap-2 px-2">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <div className="space-y-2 mt-8">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-10 w-full rounded-xl" />
                    ))}
                </div>
                <div className="mt-auto space-y-2">
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="flex-1 flex flex-col bg-background">
            </div>
        </div>
    );
}
