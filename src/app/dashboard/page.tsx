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
        <div className="min-h-screen bg-white dark:bg-slate-950">
            {/* Background Grid */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

            {/* Gradient Orbs */}
            <div className="absolute top-0 -left-4 w-48 h-48 sm:w-72 sm:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-48 h-48 sm:w-72 sm:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-48 h-48 sm:w-72 sm:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

            {/* Navigation Header */}
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-slate-950/80">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                            <Database className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-lg font-bold sm:text-xl">ConfigsHub</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden items-center gap-6 md:flex">
                            <button
                                type="button"
                                onClick={() => setActiveTab("overview")}
                                className={cn(
                                    "text-sm font-medium transition-colors",
                                    activeTab === "overview"
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
                                )}
                            >
                                Overview
                            </button>
                            <Link
                                href="/projects"
                                className={cn(
                                    "text-sm font-medium transition-colors",
                                    "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
                                )}
                            >
                                Projects
                            </Link>
                            <button
                                type="button"
                                onClick={() => setActiveTab("discover")}
                                className={cn(
                                    "text-sm font-medium transition-colors",
                                    activeTab === "discover"
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
                                )}
                            >
                                Discover
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("cli")}
                                className={cn(
                                    "text-sm font-medium transition-colors",
                                    activeTab === "cli"
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
                                )}
                            >
                                CLI
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Bell className="h-4 w-4" />
                            </Button>

                            {/* User dropdown menu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
                                    >
                                        <div className="relative">
                                            <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                                                <User className="h-4 w-4 text-white" />
                                            </div>
                                            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-white dark:ring-slate-900"></span>
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
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
                                        className="text-red-500 focus:bg-red-50 dark:focus:bg-red-950/20"
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
                    <div className="relative overflow-hidden rounded-3xl">
                        {/* Frosted glass effect container */}
                        <div className="relative backdrop-blur-md bg-white/10 dark:bg-slate-900/30 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-3xl">
                            {/* Background gradients */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 dark:from-blue-600/20 dark:to-purple-600/20"></div>
                            <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-blue-500/20 mix-blend-multiply filter blur-3xl animate-blob"></div>
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-purple-500/20 mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

                            {/* Pattern overlay */}
                            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

                            {/* Content */}
                            <div className="relative z-10 p-8 sm:p-12">
                                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-blue-600/90 backdrop-blur-sm rounded-full text-sm text-white shadow-sm">
                                            <div className="flex items-center justify-center h-5 w-5 bg-white/20 rounded-full">
                                                <BarChart3 className="w-3 h-3" />
                                            </div>
                                            <span className="font-medium">Dashboard</span>
                                        </div>
                                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 sm:text-4xl">
                                            Welcome back{user?.name ? `, ${user.name}` : ""}
                                        </h1>
                                        <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-lg">
                                            Store, manage, and share your configuration files in one place. Sync across
                                            devices with our CLI.
                                        </p>

                                        {/* Quick stat summary */}
                                        <div className="flex flex-wrap gap-4 mt-6">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    3 Projects
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    12 Config Groups
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    25 Config Files
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Create button with enhanced modern styling */}
                                    <div className="flex-shrink-0">
                                        <Link href="/projects/new">
                                            <Button
                                                className="group relative overflow-hidden flex items-center justify-center gap-3 w-full sm:w-auto 
                                                rounded-full
                                                bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
                                                dark:from-blue-500 dark:via-indigo-500 dark:to-purple-500
                                                text-white font-medium
                                                shadow-md shadow-blue-500/20 dark:shadow-blue-600/20
                                                hover:shadow-lg hover:shadow-indigo-500/30 dark:hover:shadow-indigo-600/30
                                                py-3 px-8
                                                transition-all duration-300 ease-out
                                                hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]"
                                            >
                                                {/* Moving background effect */}
                                                <div className="absolute top-0 left-0 w-full h-full">
                                                    {/* Animated gradient overlay */}
                                                    <div
                                                        className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-white/20 to-indigo-600/0 
                                                        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                                                    ></div>

                                                    {/* Subtle noise texture */}
                                                    <div
                                                        className="absolute inset-0 opacity-5 
                                                        [background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"
                                                    ></div>
                                                </div>

                                                {/* Glowing circle bursts */}
                                                <div
                                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full 
                                                    bg-white/10 opacity-0 group-hover:opacity-100 group-hover:animate-ping-slow"
                                                ></div>
                                                <div
                                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full 
                                                    bg-white/5 opacity-0 group-hover:opacity-100 group-hover:animate-ping-slow animation-delay-200"
                                                ></div>

                                                {/* Icon with enhanced styling */}
                                                <div
                                                    className="relative flex items-center justify-center h-7 w-7 rounded-full 
                                                    bg-white/20 backdrop-blur-sm
                                                    shadow-inner shadow-white/10 
                                                    transition-all duration-300
                                                    group-hover:scale-110 group-hover:bg-white/30"
                                                >
                                                    <Plus className="h-4 w-4 text-white stroke-[2.5]" />
                                                </div>

                                                {/* Text with dynamic effects */}
                                                <span className="relative font-medium text-sm text-white transition-all duration-300">
                                                    Create New Project
                                                </span>

                                                {/* Directional arrow indicator */}
                                                <svg
                                                    className="h-4 w-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    aria-labelledby="arrowRightTitle"
                                                >
                                                    <title id="arrowRightTitle">Arrow right</title>
                                                    <path
                                                        d="M3.33337 8H12.6667M12.6667 8L8.00004 3.33333M12.6667 8L8.00004 12.6667"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Overview Section */}
                <section className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="group overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-slate-900 dark:shadow-slate-800/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Projects</p>
                                    <p className="mt-2 text-3xl font-bold">3</p>
                                    <div className="mt-2 flex items-center text-sm text-green-500">
                                        <Folder className="mr-1 h-3 w-3" />
                                        <span>1 Private, 2 Public</span>
                                    </div>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-blue-100 p-2 text-blue-600 transition-transform duration-300 group-hover:scale-110 dark:bg-blue-900/30 dark:text-blue-400">
                                    <Folder className="h-full w-full" />
                                </div>
                            </div>
                        </div>

                        <div className="group overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-slate-900 dark:shadow-slate-800/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Config Groups
                                    </p>
                                    <p className="mt-2 text-3xl font-bold">12</p>
                                    <div className="mt-2 flex items-center text-sm text-blue-500">
                                        <Code className="mr-1 h-3 w-3" />
                                        <span>VSCode, Neovim, Zsh...</span>
                                    </div>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-green-100 p-2 text-green-600 transition-transform duration-300 group-hover:scale-110 dark:bg-green-900/30 dark:text-green-400">
                                    <Code className="h-full w-full" />
                                </div>
                            </div>
                        </div>

                        <div className="group overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-slate-900 dark:shadow-slate-800/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Config Files</p>
                                    <p className="mt-2 text-3xl font-bold">25</p>
                                    <div className="mt-2 flex items-center text-sm text-purple-500">
                                        <FileCode className="mr-1 h-3 w-3" />
                                        <span>8 New this week</span>
                                    </div>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-purple-100 p-2 text-purple-600 transition-transform duration-300 group-hover:scale-110 dark:bg-purple-900/30 dark:text-purple-400">
                                    <FileCode className="h-full w-full" />
                                </div>
                            </div>
                        </div>

                        <div className="group overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-slate-900 dark:shadow-slate-800/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Storage Used</p>
                                    <p className="mt-2 text-3xl font-bold">14MB</p>
                                    <div className="mt-2 flex items-center text-sm text-amber-500">
                                        <Database className="mr-1 h-3 w-3" />
                                        <span>50MB Limit (Free)</span>
                                    </div>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-amber-100 p-2 text-amber-600 transition-transform duration-300 group-hover:scale-110 dark:bg-amber-900/30 dark:text-amber-400">
                                    <Database className="h-full w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recent Activity Section */}
                <section className="mb-12">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Recent Activity</h2>
                        <Button variant="outline" size="sm" className="rounded-full text-sm">
                            View All
                        </Button>
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-white shadow-md dark:bg-slate-900">
                        <div className="divide-y divide-gray-200 dark:divide-gray-800">
                            <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                    <History className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">
                                        New version of <span className="font-semibold">settings.json</span> created
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        In VSCode group of My Dev Setup project
                                    </p>
                                </div>
                                <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                                    <p>30m ago</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                    <GitFork className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">
                                        You forked <span className="font-semibold">React Dev Setup</span> project
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        From sarah.dev/react-configs
                                    </p>
                                </div>
                                <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                                    <p>2h ago</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                                    <Terminal className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">
                                        CLI pull completed for <span className="font-semibold">Neovim</span> configs
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        5 files synced to local machine
                                    </p>
                                </div>
                                <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                                    <p>5h ago</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                                    <FileCode className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">
                                        Added <span className="font-semibold">.zshrc</span> to Terminal group
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        In Personal Dotfiles project
                                    </p>
                                </div>
                                <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                                    <p>Yesterday</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                    <Folder className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">
                                        Created <span className="font-semibold">Backend Dev</span> project
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
                        <h2 className="text-xl font-semibold">Your Projects</h2>
                        <Button variant="outline" size="sm" className="rounded-full text-sm">
                            View All
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="group cursor-pointer overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-slate-900 dark:shadow-slate-800/20">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="h-10 w-10 rounded-full bg-blue-100 p-2 text-blue-600 transition-transform duration-300 group-hover:scale-110 dark:bg-blue-900/30 dark:text-blue-400">
                                    <Code className="h-full w-full" />
                                </div>
                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                    Public
                                </span>
                            </div>
                            <h3 className="mb-1 font-medium">My Dev Setup</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">4 Config Groups • Updated today</p>
                            <div className="mt-4">
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                        VSCode
                                    </span>
                                    <span className="inline-flex rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                                        Neovim
                                    </span>
                                    <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                        Terminal
                                    </span>
                                    <span className="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                                        +1
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="group cursor-pointer overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-slate-900 dark:shadow-slate-800/20">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="h-10 w-10 rounded-full bg-purple-100 p-2 text-purple-600 transition-transform duration-300 group-hover:scale-110 dark:bg-purple-900/30 dark:text-purple-400">
                                    <Database className="h-full w-full" />
                                </div>
                                <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                                    Private
                                </span>
                            </div>
                            <h3 className="mb-1 font-medium">Backend Dev</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                2 Config Groups • Updated 2 days ago
                            </p>
                            <div className="mt-4">
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                        Docker
                                    </span>
                                    <span className="inline-flex rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                                        PostgreSQL
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="group cursor-pointer overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-slate-900 dark:shadow-slate-800/20">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="h-10 w-10 rounded-full bg-green-100 p-2 text-green-600 transition-transform duration-300 group-hover:scale-110 dark:bg-green-900/30 dark:text-green-400">
                                    <GitFork className="h-full w-full" />
                                </div>
                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                    Public
                                </span>
                            </div>
                            <h3 className="mb-1 font-medium">React Dev Setup</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                3 Config Groups • Forked from sarah.dev
                            </p>
                            <div className="mt-4">
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                        ESLint
                                    </span>
                                    <span className="inline-flex rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                                        Prettier
                                    </span>
                                    <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                        VSCode
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Discover Section */}
                <section>
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Discover Popular Configs</h2>
                        <Button variant="outline" size="sm" className="rounded-full text-sm">
                            Browse All
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="group cursor-pointer overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-slate-900 dark:shadow-slate-800/20">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="h-10 w-10 rounded-full bg-blue-100 p-2 text-blue-600 transition-transform duration-300 group-hover:scale-110 dark:bg-blue-900/30 dark:text-blue-400">
                                    <Code className="h-full w-full" />
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                    <span className="text-sm font-medium">148</span>
                                </div>
                            </div>
                            <h3 className="mb-1 font-medium">Ultimate VSCode Setup</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">By VSCodeNinja</p>
                            <div className="mt-4">
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                        Frontend
                                    </span>
                                    <span className="inline-flex rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                                        React
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="group cursor-pointer overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-slate-900 dark:shadow-slate-800/20">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="h-10 w-10 rounded-full bg-green-100 p-2 text-green-600 transition-transform duration-300 group-hover:scale-110 dark:bg-green-900/30 dark:text-green-400">
                                    <Terminal className="h-full w-full" />
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                    <span className="text-sm font-medium">89</span>
                                </div>
                            </div>
                            <h3 className="mb-1 font-medium">Productivity Zsh Setup</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">By terminal_pro</p>
                            <div className="mt-4">
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                        Shell
                                    </span>
                                    <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                        Productivity
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="group cursor-pointer overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-slate-900 dark:shadow-slate-800/20">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="h-10 w-10 rounded-full bg-purple-100 p-2 text-purple-600 transition-transform duration-300 group-hover:scale-110 dark:bg-purple-900/30 dark:text-purple-400">
                                    <FileCode className="h-full w-full" />
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                    <span className="text-sm font-medium">76</span>
                                </div>
                            </div>
                            <h3 className="mb-1 font-medium">Neovim for Go Development</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">By gopher_vim</p>
                            <div className="mt-4">
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                                        Golang
                                    </span>
                                    <span className="inline-flex rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                                        Neovim
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
