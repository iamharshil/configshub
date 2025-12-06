import { Folder, Sparkles, Settings, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ViewMode } from '@/types';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';

interface SidebarProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const navItems = [
  { id: 'configs' as ViewMode, label: 'Configs', icon: Folder },
  { id: 'prompts' as ViewMode, label: 'Prompts', icon: Sparkles },
];

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "h-screen flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "p-4 border-b border-sidebar-border flex items-center",
        collapsed ? "justify-center" : "justify-between"
      )}>
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Code2 className="w-5 h-5 text-primary" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="font-semibold text-foreground tracking-tight">DevVault</h1>
              <p className="text-xs text-muted-foreground">Configs & Prompts</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setCollapsed(true)}
            className="text-muted-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3">
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200",
                collapsed && "justify-center px-0",
                activeView === item.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={cn(
                "w-5 h-5 shrink-0 transition-colors",
                activeView === item.id ? "text-primary" : ""
              )} />
              {!collapsed && (
                <span className="text-sm animate-fade-in">{item.label}</span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className={cn(
        "p-3 border-t border-sidebar-border space-y-1",
        collapsed && "flex flex-col items-center"
      )}>
        <ThemeToggle />
        
        {collapsed && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setCollapsed(false)}
            className="text-muted-foreground mt-2"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}

        {!collapsed && (
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-all duration-200">
            <Settings className="w-5 h-5" />
            <span className="text-sm">Settings</span>
          </button>
        )}
      </div>
    </aside>
  );
}
