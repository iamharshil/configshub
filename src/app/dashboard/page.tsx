"use client";

import {
	BarChart3,
	Bell,
	Code,
	Database,
	FileCode,
	Folder,
	GitFork,
	History,
	Key,
	LogOut,
	Plus,
	Settings,
	Star,
	Terminal,
	User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PageTransition } from "@/components/common/page-transition";
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

export default function Dashboard() {
	const [user, setUser] = useState<{ name?: string; email: string; emailVerified?: boolean } | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("overview");

	useEffect(() => {
		const getUser = async () => {
			const { data } = await supabase.auth.getUser();
			if (data.user) {
				setUser({ email: data.user.email ?? "", name: extractFullName(data.user.user_metadata) });
			} else {
				window.location.href = "/auth/signin";
			}
			setIsLoading(false);
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

	if (isLoading) {
		return (
			<div className="min-h-screen overflow-hidden relative flex flex-col items-center justify-center">
				{/* Primary Background with Rich Dynamic Gradient */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-violet-100 dark:from-black dark:via-slate-950 dark:to-indigo-950 z-0"></div>

				{/* Animated pattern overlay */}
				<div className="absolute inset-0 bg-[radial-gradient(#4f46e512_1px,transparent_1px)] [background-size:32px_32px] opacity-70 dark:opacity-20 z-0"></div>

				{/* Enhanced gradient orbs with deeper colors and improved positioning */}
				<div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-blue-500/30 to-blue-700/40 dark:from-blue-800/20 dark:to-blue-950/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 dark:opacity-40 animate-blob"></div>
				<div className="absolute bottom-0 right-1/4 w-[45rem] h-[45rem] translate-x-1/3 translate-y-1/2 bg-gradient-to-tr from-purple-500/30 to-purple-700/40 dark:from-purple-800/20 dark:to-purple-950/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 dark:opacity-40 animate-blob animation-delay-2000"></div>
				<div className="absolute bottom-1/2 left-1/2 w-[50rem] h-[50rem] -translate-x-1/2 translate-y-1/2 bg-gradient-to-tr from-indigo-500/30 to-indigo-700/40 dark:from-indigo-800/20 dark:to-indigo-950/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 dark:opacity-40 animate-blob animation-delay-4000"></div>

				{/* Enhanced shimmering light beams with more contrast */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[50%] rotate-45 overflow-hidden opacity-30 dark:opacity-10 z-10">
					<div className="absolute -inset-full w-[200%] h-1/2 bg-gradient-to-r from-transparent via-white to-transparent animate-beam"></div>
					<div className="absolute -inset-full w-[200%] h-1/3 top-1/3 bg-gradient-to-r from-transparent via-white to-transparent animate-beam animation-delay-2000"></div>
				</div>

				{/* Additional accent glows */}
				<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/3 bg-gradient-to-t from-blue-500/20 to-transparent dark:from-blue-800/20 dark:to-transparent blur-2xl"></div>
				<div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-purple-500/20 to-transparent dark:from-purple-800/20 dark:to-transparent blur-2xl"></div>

				{/* Centered loading content */}
				<div className="relative z-20 flex flex-col items-center justify-center">
					{/* Logo and branding */}
					<div className="relative mb-12 flex items-center justify-center">
						<div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl">
							<Database className="h-8 w-8 text-white" />
							<div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 blur animate-pulse-subtle"></div>
							{/* Orbital ring */}
							<div className="absolute -inset-2 border border-blue-500/20 dark:border-blue-400/20 rounded-full animate-spin-slow"></div>
							<div
								className="absolute -inset-4 border border-indigo-500/10 dark:border-indigo-400/10 rounded-full animate-spin-slow animation-delay-2000"
								style={{ animationDirection: "reverse" }}
							></div>
						</div>
						<span className="ml-5 text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
							ConfigsHub
						</span>
					</div>

					{/* Loading spinner with enhanced design */}
					<div className="relative my-8 flex items-center justify-center">
						<div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 blur-md animate-pulse-subtle"></div>
						<svg
							className="h-16 w-16"
							viewBox="0 0 100 100"
							xmlns="http://www.w3.org/2000/svg"
							aria-labelledby="loadingTitle"
						>
							<title id="loadingTitle">Loading animation</title>
							<circle
								className="opacity-10 dark:opacity-10"
								cx="50"
								cy="50"
								r="40"
								stroke="currentColor"
								strokeWidth="8"
								fill="none"
							/>
							<circle
								className="origin-center animate-loading-dash"
								cx="50"
								cy="50"
								r="40"
								stroke="url(#loading-gradient)"
								strokeWidth="8"
								fill="none"
								strokeLinecap="round"
								strokeDasharray="251"
								strokeDashoffset="251"
							/>
							<defs>
								<linearGradient
									id="loading-gradient"
									x1="0%"
									y1="0%"
									x2="100%"
									y2="100%"
									className="dark:opacity-80"
								>
									<stop offset="0%" stopColor="#4F46E5" className="dark:text-blue-900" />
									<stop offset="100%" stopColor="#7E22CE" className="dark:text-purple-900" />
								</linearGradient>
							</defs>
						</svg>
					</div>

					{/* Loading text with subtle animation */}
					<div className="relative text-center">
						<p className="text-2xl font-medium bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
							Loading Dashboard
						</p>
						<p className="text-base text-gray-600 dark:text-gray-400 mt-3 animate-pulse-subtle">
							Preparing your experience...
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<PageTransition>
			<div className="min-h-screen relative overflow-hidden bg-gradient-modern">
				{/* Modern Background Pattern */}
				<div className="absolute inset-0 bg-grid-pattern"></div>

				{/* Enhanced Gradient Orbs with modern colors */}
				<div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mix-blend-normal filter blur-3xl opacity-40 animate-float"></div>
				<div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-bl from-accent/20 to-primary/20 rounded-full mix-blend-normal filter blur-3xl opacity-40 animate-float animation-delay-2000"></div>
				<div className="absolute -bottom-8 left-20 w-80 h-80 bg-gradient-to-tr from-secondary/20 to-accent/20 rounded-full mix-blend-normal filter blur-3xl opacity-40 animate-float animation-delay-4000"></div>

				{/* Animated gradient overlay */}
				<div className="absolute inset-0 bg-gradient-animated opacity-10"></div>

				{/* Navigation Header */}
				<header className="sticky top-0 z-50 w-full glass-nav">
					<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
						<div className="flex items-center gap-3">
							<div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-primary shadow-modern">
								<Database className="h-4 w-4 text-white" />
							</div>
							<span className="text-lg font-bold sm:text-xl gradient-text">ConfigsHub</span>
						</div>
						<div className="flex items-center gap-3">
							<div className="hidden items-center gap-6 md:flex">
								<button
									type="button"
									onClick={() => setActiveTab("overview")}
									className={cn(
										"text-sm font-medium transition-all duration-300 hover-glow",
										activeTab === "overview"
											? "text-primary font-semibold"
											: "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
									)}
								>
									Overview
								</button>
								<Link
									href="/projects"
									className={cn(
										"text-sm font-medium transition-all duration-300 hover-glow",
										"text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
									)}
								>
									Projects
								</Link>
								<button
									type="button"
									onClick={() => setActiveTab("discover")}
									className={cn(
										"text-sm font-medium transition-all duration-300 hover-glow",
										activeTab === "discover"
											? "text-primary font-semibold"
											: "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
									)}
								>
									Discover
								</button>
								<button
									type="button"
									onClick={() => setActiveTab("cli")}
									className={cn(
										"text-sm font-medium transition-all duration-300 hover-glow",
										activeTab === "cli"
											? "text-primary font-semibold"
											: "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
									)}
								>
									CLI
								</button>
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
												<p className="text-sm font-medium leading-none">
													{user?.name || "User"}
												</p>
												<p className="text-xs leading-none text-muted-foreground">
													{user?.email}
												</p>
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
				</header>

				{/* Main Content */}
				<main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
					{/* Welcome Banner */}
					<section className="mb-12">
						<div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden">
							{/* Enhanced background effects */}
							<div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-secondary/5"></div>
							<div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-float"></div>
							<div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-secondary/10 blur-3xl animate-float animation-delay-4000"></div>

							{/* Content */}
							<div className="relative z-10">
								<div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
									<div>
										<div className="inline-flex items-center gap-2 px-4 py-2 mb-4 glass-badge rounded-full text-sm text-primary font-medium">
											<div className="flex items-center justify-center h-5 w-5 bg-primary/20 rounded-full">
												<BarChart3 className="w-3 h-3" />
											</div>
											<span>Dashboard</span>
										</div>
										<h1 className="text-3xl font-bold gradient-text sm:text-4xl">
											Welcome back{user?.name ? `, ${user.name}` : ""}
										</h1>
										<p className="mt-3 text-gray-600 dark:text-gray-300 max-w-lg">
											Store, manage, and share your configuration files in one place. Sync across
											devices with our CLI.
										</p>

										{/* Quick stat summary */}
										<div className="flex flex-wrap gap-4 mt-6">
											<div className="flex items-center gap-2">
												<div className="h-2 w-2 rounded-full bg-success animate-pulse"></div>
												<span className="text-sm text-gray-600 dark:text-gray-400">
													3 Projects
												</span>
											</div>
											<div className="flex items-center gap-2">
												<div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
												<span className="text-sm text-gray-600 dark:text-gray-400">
													12 Config Groups
												</span>
											</div>
											<div className="flex items-center gap-2">
												<div className="h-2 w-2 rounded-full bg-secondary animate-pulse"></div>
												<span className="text-sm text-gray-600 dark:text-gray-400">
													25 Config Files
												</span>
											</div>
										</div>
									</div>

									{/* Create button with modern styling */}
									<div className="flex-shrink-0">
										<Link href="/projects/new">
											<Button className="btn-primary group relative overflow-hidden px-8 py-3 rounded-xl">
												{/* Icon */}
												<div className="relative flex items-center justify-center h-6 w-6 rounded-lg bg-white/20 mr-3 group-hover:scale-110 transition-transform">
													<Plus className="h-4 w-4 text-white" />
												</div>

												{/* Text */}
												<span className="relative font-medium text-sm text-white">
													Create New Project
												</span>

												{/* Hover effect */}
												<div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
											</Button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Stats Overview Section */}
					<section className="mb-12">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							<div className="card-modern group">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-500 dark:text-gray-400">Projects</p>
										<p className="mt-2 text-3xl font-bold">3</p>
										<div className="mt-2 flex items-center text-sm text-success">
											<Folder className="mr-1 h-3 w-3" />
											<span>1 Private, 2 Public</span>
										</div>
									</div>
									<div className="icon-container bg-primary/10 text-primary">
										<Folder className="h-full w-full" />
									</div>
								</div>
							</div>

							<div className="card-modern group">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
											Config Groups
										</p>
										<p className="mt-2 text-3xl font-bold">12</p>
										<div className="mt-2 flex items-center text-sm text-primary">
											<Code className="mr-1 h-3 w-3" />
											<span>VSCode, Neovim, Zsh...</span>
										</div>
									</div>
									<div className="icon-container bg-success/10 text-success">
										<Code className="h-full w-full" />
									</div>
								</div>
							</div>

							<div className="card-modern group">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
											Config Files
										</p>
										<p className="mt-2 text-3xl font-bold">25</p>
										<div className="mt-2 flex items-center text-sm text-secondary">
											<FileCode className="mr-1 h-3 w-3" />
											<span>8 New this week</span>
										</div>
									</div>
									<div className="icon-container bg-secondary/10 text-secondary">
										<FileCode className="h-full w-full" />
									</div>
								</div>
							</div>

							<div className="card-modern group">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
											Storage Used
										</p>
										<p className="mt-2 text-3xl font-bold">14MB</p>
										<div className="mt-2 flex items-center text-sm text-warning">
											<Database className="mr-1 h-3 w-3" />
											<span>50MB Limit (Free)</span>
										</div>
									</div>
									<div className="icon-container bg-warning/10 text-warning">
										<Database className="h-full w-full" />
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Recent Activity Section */}
					<section className="mb-12">
						<div className="mb-6 flex items-center justify-between">
							<h2 className="text-xl font-semibold gradient-text">Recent Activity</h2>
							<Button variant="outline" size="sm" className="btn-glass rounded-xl text-sm">
								View All
							</Button>
						</div>

						<div className="glass-card rounded-2xl overflow-hidden">
							<div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
								<div className="flex items-center gap-4 p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
									<div className="icon-container bg-primary/10 text-primary">
										<History className="h-5 w-5" />
									</div>
									<div className="flex-1">
										<p className="font-medium">
											New version of{" "}
											<span className="font-semibold text-primary">settings.json</span> created
										</p>
										<p className="text-sm text-gray-500 dark:text-gray-400">
											In VSCode group of My Dev Setup project
										</p>
									</div>
									<div className="text-right text-sm text-gray-500 dark:text-gray-400">
										<p>30m ago</p>
									</div>
								</div>

								<div className="flex items-center gap-4 p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
									<div className="icon-container bg-success/10 text-success">
										<GitFork className="h-5 w-5" />
									</div>
									<div className="flex-1">
										<p className="font-medium">
											You forked{" "}
											<span className="font-semibold text-success">React Dev Setup</span> project
										</p>
										<p className="text-sm text-gray-500 dark:text-gray-400">
											From sarah.dev/react-configs
										</p>
									</div>
									<div className="text-right text-sm text-gray-500 dark:text-gray-400">
										<p>2h ago</p>
									</div>
								</div>

								<div className="flex items-center gap-4 p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
									<div className="icon-container bg-secondary/10 text-secondary">
										<Terminal className="h-5 w-5" />
									</div>
									<div className="flex-1">
										<p className="font-medium">
											CLI pull completed for{" "}
											<span className="font-semibold text-secondary">Neovim</span> configs
										</p>
										<p className="text-sm text-gray-500 dark:text-gray-400">
											5 files synced to local machine
										</p>
									</div>
									<div className="text-right text-sm text-gray-500 dark:text-gray-400">
										<p>5h ago</p>
									</div>
								</div>

								<div className="flex items-center gap-4 p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
									<div className="icon-container bg-warning/10 text-warning">
										<FileCode className="h-5 w-5" />
									</div>
									<div className="flex-1">
										<p className="font-medium">
											Added <span className="font-semibold text-warning">.zshrc</span> to Terminal
											group
										</p>
										<p className="text-sm text-gray-500 dark:text-gray-400">
											In Personal Dotfiles project
										</p>
									</div>
									<div className="text-right text-sm text-gray-500 dark:text-gray-400">
										<p>Yesterday</p>
									</div>
								</div>

								<div className="flex items-center gap-4 p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
									<div className="icon-container bg-accent/10 text-accent">
										<Folder className="h-5 w-5" />
									</div>
									<div className="flex-1">
										<p className="font-medium">
											Created <span className="font-semibold text-accent">Backend Dev</span>{" "}
											project
										</p>
										<p className="text-sm text-gray-500 dark:text-gray-400">
											New private project with 2 config groups
										</p>
									</div>
									<div className="text-right text-sm text-gray-500 dark:text-gray-400">
										<p>2 days ago</p>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Popular Configurations Section */}
					<section className="mb-12">
						<div className="mb-6 flex items-center justify-between">
							<h2 className="text-xl font-semibold gradient-text">Your Projects</h2>
							<Button variant="outline" size="sm" className="btn-glass rounded-xl text-sm">
								View All
							</Button>
						</div>

						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							<div className="card-modern group cursor-pointer">
								<div className="mb-4 flex items-center justify-between">
									<div className="icon-container bg-primary/10 text-primary">
										<Code className="h-full w-full" />
									</div>
									<span className="badge bg-success/10 text-success">Public</span>
								</div>
								<h3 className="mb-1 font-medium gradient-text">My Dev Setup</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									4 Config Groups • Updated today
								</p>
								<div className="mt-4">
									<div className="flex flex-wrap gap-2">
										<span className="tag bg-primary/10 text-primary">VSCode</span>
										<span className="tag bg-secondary/10 text-secondary">Neovim</span>
										<span className="tag bg-success/10 text-success">Terminal</span>
										<span className="tag bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
											+1
										</span>
									</div>
								</div>
							</div>

							<div className="card-modern group cursor-pointer">
								<div className="mb-4 flex items-center justify-between">
									<div className="icon-container bg-secondary/10 text-secondary">
										<Database className="h-full w-full" />
									</div>
									<span className="badge bg-warning/10 text-warning">Private</span>
								</div>
								<h3 className="mb-1 font-medium gradient-text">Backend Dev</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									2 Config Groups • Updated 2 days ago
								</p>
								<div className="mt-4">
									<div className="flex flex-wrap gap-2">
										<span className="tag bg-warning/10 text-warning">Docker</span>
										<span className="tag bg-accent/10 text-accent">PostgreSQL</span>
									</div>
								</div>
							</div>

							<div className="card-modern group cursor-pointer">
								<div className="mb-4 flex items-center justify-between">
									<div className="icon-container bg-success/10 text-success">
										<GitFork className="h-full w-full" />
									</div>
									<span className="badge bg-success/10 text-success">Public</span>
								</div>
								<h3 className="mb-1 font-medium gradient-text">React Dev Setup</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									3 Config Groups • Forked from sarah.dev
								</p>
								<div className="mt-4">
									<div className="flex flex-wrap gap-2">
										<span className="tag bg-primary/10 text-primary">ESLint</span>
										<span className="tag bg-secondary/10 text-secondary">Prettier</span>
										<span className="tag bg-success/10 text-success">VSCode</span>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Discover Section */}
					<section>
						<div className="mb-6 flex items-center justify-between">
							<h2 className="text-xl font-semibold gradient-text">Discover Popular Configs</h2>
							<Button variant="outline" size="sm" className="btn-glass rounded-xl text-sm">
								Browse All
							</Button>
						</div>

						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							<div className="card-modern group cursor-pointer">
								<div className="mb-4 flex items-center justify-between">
									<div className="icon-container bg-primary/10 text-primary">
										<Code className="h-full w-full" />
									</div>
									<div className="flex items-center gap-1.5">
										<Star className="h-4 w-4 fill-warning text-warning" />
										<span className="text-sm font-medium">148</span>
									</div>
								</div>
								<h3 className="mb-1 font-medium gradient-text">Ultimate VSCode Setup</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">By VSCodeNinja</p>
								<div className="mt-4">
									<div className="flex flex-wrap gap-2">
										<span className="tag bg-primary/10 text-primary">Frontend</span>
										<span className="tag bg-secondary/10 text-secondary">React</span>
									</div>
								</div>
							</div>

							<div className="card-modern group cursor-pointer">
								<div className="mb-4 flex items-center justify-between">
									<div className="icon-container bg-success/10 text-success">
										<Terminal className="h-full w-full" />
									</div>
									<div className="flex items-center gap-1.5">
										<Star className="h-4 w-4 fill-warning text-warning" />
										<span className="text-sm font-medium">89</span>
									</div>
								</div>
								<h3 className="mb-1 font-medium gradient-text">Productivity Zsh Setup</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">By terminal_pro</p>
								<div className="mt-4">
									<div className="flex flex-wrap gap-2">
										<span className="tag bg-warning/10 text-warning">Shell</span>
										<span className="tag bg-success/10 text-success">Productivity</span>
									</div>
								</div>
							</div>

							<div className="card-modern group cursor-pointer">
								<div className="mb-4 flex items-center justify-between">
									<div className="icon-container bg-secondary/10 text-secondary">
										<FileCode className="h-full w-full" />
									</div>
									<div className="flex items-center gap-1.5">
										<Star className="h-4 w-4 fill-warning text-warning" />
										<span className="text-sm font-medium">76</span>
									</div>
								</div>
								<h3 className="mb-1 font-medium gradient-text">Neovim for Go Development</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">By gopher_vim</p>
								<div className="mt-4">
									<div className="flex flex-wrap gap-2">
										<span className="tag bg-accent/10 text-accent">Golang</span>
										<span className="tag bg-secondary/10 text-secondary">Neovim</span>
									</div>
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</PageTransition>
	);
}
