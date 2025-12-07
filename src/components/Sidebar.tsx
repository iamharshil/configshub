import { Folder, Sparkles, Settings, Code2, ChevronLeft, ChevronRight, Menu, LayoutDashboard, Terminal, ChevronsUpDown, LogOut, Moon, Sun, Monitor, Check } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useStore } from '@/hooks/useStore';
import { useTheme } from '@/hooks/useTheme';

interface SidebarProps {
  className?: string;
}

const navItems = [
  { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { path: '/dashboard/configs', label: 'Configs', icon: Folder },
  { path: '/dashboard/prompts', label: 'Prompts', icon: Sparkles },
  { path: '/dashboard/snippets', label: 'Snippets', icon: Code2 },
  { path: '/dashboard/cli', label: 'CLI Connect', icon: Terminal },
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
  const { user } = useStore();
  const { theme, setTheme } = useTheme();
  const activePath = location.pathname;

  const isActive = (path: string) => {
    // Exact match for the root dashboard path to avoid highlighting "Overview" on sub-routes
    if (path === '/dashboard') {
      return activePath === '/dashboard';
    }
    // For other routes, ensure we match the full segment (e.g. avoid matching /dashboard/conf to /dashboard/config if such paths existed)
    return activePath === path || activePath.startsWith(path + '/');
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
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group",
                  collapsed && "justify-center px-0",
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-primary/10 hover:text-foreground"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={cn(
                  "w-5 h-5 shrink-0",
                  isActive(item.path) ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                )} />
                {!collapsed && (
                  <span className="text-sm">{item.label}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-border/50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full flex items-center gap-3 px-2 py-6 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 group",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              <Avatar className="h-8 w-8 rounded-lg border border-border/50">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-medium">
                  {user?.name?.substring(0, 2).toUpperCase() || 'US'}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <>
                  <div className="flex flex-col items-start flex-1 min-w-0">
                    <span className="text-sm font-medium truncate">{user?.name}</span>
                    <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                  </div>
                  <ChevronsUpDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl"
            align="end"
            sideOffset={8}
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className="mr-2 h-4 w-4" />
                Light Mode
                {theme === 'light' && <Check className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className="mr-2 h-4 w-4" />
                Dark Mode
                {theme === 'dark' && <Check className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Monitor className="mr-2 h-4 w-4" />
                System
                {theme === 'system' && <Check className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {collapsed && !isMobile && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setCollapsed(false)}
            className="w-full mt-2 text-sidebar-foreground/50 hover:text-foreground"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
        {!collapsed && !isMobile && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setCollapsed(true)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full border border-border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hidden group-hover:flex items-center justify-center z-50"
          >
            <ChevronLeft className="w-3 h-3" />
          </Button>
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
