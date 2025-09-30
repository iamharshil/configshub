"use client";

import { Bell, Database, FileText, GitBranch, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function Header() {
	const router = useRouter();
	const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				if (!supabase) return;

				const { data, error } = await supabase.auth.getUser();
				if (error) throw error;

				if (data?.user) {
					const metadata = data.user.user_metadata || {};
					const fullName = typeof metadata.full_name === "string" ? metadata.full_name : undefined;

					setUser({
						name: fullName,
						email: data.user.email,
					});
				}
			} catch (error) {
				console.error("Error fetching user in header:", error);
			}
		};

		fetchUser();
	}, []);

	const handleSignOut = async () => {
		try {
			await supabase.auth.signOut();
			router.push("/auth/signin");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	return (
		<header className="glass-nav sticky top-0 z-50 w-full">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
				<div className="flex items-center gap-3">
					<Link href="/dashboard" className="flex items-center gap-3 group">
						<div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-primary shadow-modern group-hover:scale-110 transition-transform">
							<Database className="h-4 w-4 text-white" />
						</div>
						<span className="text-lg font-bold sm:text-xl gradient-text">ConfigsHub</span>
					</Link>
				</div>
				<div className="flex items-center gap-3">
					<div className="hidden items-center gap-6 md:flex">
						<Link
							href="/dashboard"
							className="text-sm font-medium transition-all duration-300 hover-glow text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
						>
							Dashboard
						</Link>
						<Link
							href="/projects"
							className="text-sm font-medium transition-all duration-300 hover-glow text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
						>
							Projects
						</Link>
					</div>

					<div className="flex items-center gap-2">
						<Button variant="ghost" size="icon" className="btn-glass rounded-xl">
							<Bell className="h-4 w-4" />
						</Button>

						{/* User dropdown menu */}
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
							<DropdownMenuContent align="end" className="w-56 glass-card">
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
											<GitBranch className="mr-2 h-4 w-4" />
											<span>My Projects</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<FileText className="mr-2 h-4 w-4" />
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
		</header>
	);
}
