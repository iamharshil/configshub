import { Folder, Sparkles, Settings, Code2, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface SidebarProps {
  className?: string;
}

const navItems = [
  { path: '/dashboard/configs', label: 'Configs', icon: Folder },
  { path: '/dashboard/prompts', label: 'Prompts', icon: Sparkles },
];

function SidebarContent({
  collapsed,
  setCollapsed,
  isMobile = false
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  isMobile?: boolean;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/dashboard/configs' && activePath === '/dashboard') return true;
    return activePath.startsWith(path);
  };

  return (
    <>
      {/* Workspace Switcher */}
      <div className="p-2">
        <WorkspaceSwitcher collapsed={collapsed} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-6">
        <div>
          {!collapsed && <div className="px-2 mb-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">Main</div>}
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group",
                  collapsed && "justify-center px-0",
                  isActive(item.path)
                    ? "bg-white dark:bg-sidebar-accent shadow-sm text-primary dark:text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-white/50 dark:hover:bg-sidebar-accent/50 hover:text-foreground"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={cn(
                  "w-5 h-5 shrink-0 transition-colors",
                  isActive(item.path) ? "text-primary" : "text-sidebar-foreground/70 group-hover:text-foreground"
                )} />
                {!collapsed && (
                  <span className="text-sm animate-fade-in">{item.label}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className={cn(
        "p-4 space-y-1",
        collapsed && "flex flex-col items-center"
      )}>
        <div className={cn(
          "rounded-2xl p-1 transition-all duration-200",
          !collapsed && "bg-white/50 shadow-sm border border-sidebar-border/50"
        )}>
          <ThemeToggle collapsed={collapsed} />
        </div>

        {collapsed && !isMobile && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setCollapsed(false)}
            className="text-sidebar-foreground/50 mt-2"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}

        {!collapsed && (
          <button
            onClick={() => navigate('/dashboard/settings')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 mt-2",
              isActive('/dashboard/settings')
                ? "bg-white dark:bg-sidebar-accent shadow-sm text-primary dark:text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-sidebar-accent/50"
            )}
          >
            <Settings className={cn(
              "w-5 h-5 transition-colors",
              isActive('/dashboard/settings') ? "text-primary dark:text-sidebar-accent-foreground" : "text-sidebar-foreground"
            )} />
            <span className="text-sm">Settings</span>
          </button>
        )}
      </div>
    </>
  );
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden md:flex h-screen flex-col bg-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-[72px]" : "w-64",
        className
      )}
    >
      <SidebarContent
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
    </aside>
  );
}

export function MobileSidebar({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 w-72 bg-sidebar border-r border-sidebar-border">
        <div className="h-full flex flex-col">
          <SidebarContent
            collapsed={false}
            setCollapsed={() => { }}
            isMobile={true}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
