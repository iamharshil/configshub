"use client";

import { Bell, Database, Folder, Key, LogOut, Settings, Star, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

function extractFullName(meta: unknown): string | undefined {
	if (meta && typeof meta === "object" && "full_name" in meta) {
		const value = (meta as { full_name?: unknown }).full_name;
		return typeof value === "string" ? value : undefined;
	}
	return undefined;
}

interface DashboardHeaderProps {
	activeTab?: string;
	onTabChange?: (tab: string) => void;
}

export function DashboardHeader({ activeTab, onTabChange }: DashboardHeaderProps) {
	const [user, setUser] = useState<{ name?: string; email: string; emailVerified?: boolean } | null>(null);
	const pathname = usePathname();

	useEffect(() => {
		const getUser = async () => {
			const { data } = await supabase.auth.getUser();
			if (data.user) {
				setUser({ email: data.user.email ?? "", name: extractFullName(data.user.user_metadata) });
			}
		};
		getUser();
	}, []);

	const handleSignOut = async () => {
		try {
			// Log the sign-out event before signing out
			const { data } = await supabase.auth.getUser();
			if (data.user) {
				await fetch("/api/auth/log-session", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ user: data.user, event_type: "logout" }),
				});
			}

			await supabase.auth.signOut();
			window.location.href = "/";
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	const isActiveTab = (tab: string) => {
		if (activeTab) return activeTab === tab;

		// Default active state based on pathname
		switch (tab) {
			case "overview":
				return pathname === "/dashboard";
			case "projects":
				return pathname.startsWith("/projects");
			default:
				return false;
		}
	};

	const handleTabClick = (tab: string) => {
		if (onTabChange) {
			onTabChange(tab);
		}
	};

	return (
		<header className="sticky top-0 z-50 w-full glass-nav">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
				<div className="flex items-center gap-3">
					<Link href="/dashboard" className="flex items-center gap-3">
						<div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-primary shadow-modern">
							<Database className="h-4 w-4 text-white" />
						</div>
						<span className="text-lg font-bold sm:text-xl gradient-text">ConfigsHub</span>
					</Link>
				</div>
				<div className="flex items-center gap-3">
					<div className="hidden items-center gap-6 md:flex">
						<button
							type="button"
							onClick={() => handleTabClick("overview")}
							className={cn(
								"text-sm font-medium transition-all duration-300 hover-glow",
								isActiveTab("overview")
									? "text-primary font-semibold"
									: "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
							)}
						>
							<Link href="/dashboard">Overview</Link>
						</button>
						<Link
							href="/projects"
							className={cn(
								"text-sm font-medium transition-all duration-300 hover-glow",
								isActiveTab("projects")
									? "text-primary font-semibold"
									: "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
							)}
						>
							Projects
						</Link>
						<button
							type="button"
							onClick={() => handleTabClick("discover")}
							className={cn(
								"text-sm font-medium transition-all duration-300 hover-glow",
								isActiveTab("discover")
									? "text-primary font-semibold"
									: "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
							)}
						>
							Discover
						</button>
						<button
							type="button"
							onClick={() => handleTabClick("cli")}
							className={cn(
								"text-sm font-medium transition-all duration-300 hover-glow",
								isActiveTab("cli")
									? "text-primary font-semibold"
									: "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
							)}
						>
							CLI
						</button>
					</div>

					<div className="flex items-center gap-2 relative">
						<Button variant="ghost" size="icon" className="btn-glass rounded-xl">
							<Bell className="h-4 w-4" />
						</Button>

						{/* User dropdown menu */}
						<div className="relative">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="icon" className="btn-glass rounded-xl">
										<div className="relative">
											<div className="h-8 w-8 overflow-hidden rounded-xl bg-gradient-primary flex items-center justify-center shadow-modern">
												<User className="h-4 w-4 text-white" />
											</div>
											<span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-success ring-1 ring-white dark:ring-gray-900"></span>
										</div>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									side="bottom"
									align="end"
									alignOffset={-16}
									sideOffset={8}
									className="w-56 glass-card profile-dropdown"
									avoidCollisions={true}
								>
									<DropdownMenuLabel className="font-normal">
										<div className="flex flex-col space-y-1">
											<p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
											<p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem asChild>
											<Link href="/profile" className="flex items-center cursor-pointer">
												<User className="mr-2 h-4 w-4" />
												<span>Profile</span>
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem asChild>
											<Link href="/settings" className="flex items-center cursor-pointer">
												<Settings className="mr-2 h-4 w-4" />
												<span>Settings</span>
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem asChild>
											<Link href="/projects" className="flex items-center cursor-pointer">
												<Folder className="mr-2 h-4 w-4" />
												<span>My Projects</span>
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Star className="mr-2 h-4 w-4" />
											<span>Starred Configs</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Key className="mr-2 h-4 w-4" />
											<span>API Keys</span>
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={handleSignOut}
										className="text-red-500 focus:bg-red-50/50 dark:focus:bg-red-950/20"
									>
										<LogOut className="mr-2 h-4 w-4" />
										<span>Sign Out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
