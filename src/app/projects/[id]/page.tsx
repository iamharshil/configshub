"use client";

import {
	ChevronLeft,
	Download,
	Edit,
	FileCode,
	GitBranch,
	Globe,
	History,
	Server,
	Settings,
	Share,
	Trash2,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";

// Define Project type
type Project = {
	id: string;
	name: string;
	description: string;
	created_at: string;
	updated_at: string;
	owner_id: string;
	is_public: boolean;
	config_count?: number;
	environment_count?: number;
	tags?: string[];
};

export default function ProjectPage() {
	const params = useParams();
	const router = useRouter();
	const [project, setProject] = useState<Project | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const projectId = params.id;
				if (!projectId || typeof projectId !== "string") {
					throw new Error("Invalid project ID");
				}

				// Get current user
				const { data: userData, error: userError } = await supabase.auth.getUser();
				if (userError) throw userError;

				// Fetch project details
				const { data, error: projectError } = await supabase
					.from("projects")
					.select("*")
					.eq("id", projectId)
					.single();

				if (projectError) throw projectError;
				if (!data) throw new Error("Project not found");

				// Ensure user has access to this project
				if (data.owner_id !== userData.user?.id && !data.is_public) {
					throw new Error("You do not have permission to view this project");
				}

				setProject(data as Project);
			} catch (err: unknown) {
				console.error("Error fetching project:", err);
				setError(err instanceof Error ? err.message : "Failed to load project");
			} finally {
				setLoading(false);
			}
		};

		fetchProject();
	}, [params.id]);

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-background to-background/80">
				<header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
					<div className="container flex h-16 items-center px-4">
						<div className="mr-4 flex">
							<Link href="/" className="flex items-center">
								<Globe className="h-6 w-6 text-primary" />
								<span className="ml-2 text-xl font-semibold">ConfigsHub</span>
							</Link>
						</div>
						<div className="flex-1" />
					</div>
				</header>

				<main className="container px-4 py-10">
					<div className="mb-6 flex animate-pulse">
						<div className="h-8 w-40 rounded-md bg-muted"></div>
					</div>
					<div className="mb-8 flex flex-col gap-2 animate-pulse">
						<div className="h-10 w-3/4 rounded-md bg-muted"></div>
						<div className="h-5 w-1/2 rounded-md bg-muted"></div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
						<div className="h-40 rounded-xl bg-muted"></div>
						<div className="h-40 rounded-xl bg-muted"></div>
					</div>
				</main>
			</div>
		);
	}

	if (error || !project) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-background to-background/80">
				<header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
					<div className="container flex h-16 items-center px-4">
						<div className="mr-4 flex">
							<Link href="/" className="flex items-center">
								<Globe className="h-6 w-6 text-primary" />
								<span className="ml-2 text-xl font-semibold">ConfigsHub</span>
							</Link>
						</div>

						<div className="flex-1" />

						<nav className="flex items-center gap-4">
							<Link href="/dashboard">
								<Button variant="ghost" size="sm">
									Dashboard
								</Button>
							</Link>
							<Link href="/projects">
								<Button variant="ghost" size="sm">
									Projects
								</Button>
							</Link>
						</nav>
					</div>
				</header>

				<main className="container px-4 py-10">
					<Button variant="ghost" size="sm" className="mb-6" onClick={() => router.push("/projects")}>
						<ChevronLeft className="h-4 w-4 mr-1" />
						Back to Projects
					</Button>

					<Card className="mx-auto max-w-md">
						<CardHeader>
							<CardTitle className="text-destructive">Error</CardTitle>
							<CardDescription>{error || "Failed to load project"}</CardDescription>
						</CardHeader>
						<CardContent>
							<Button onClick={() => router.push("/projects")} className="w-full">
								Return to Projects
							</Button>
						</CardContent>
					</Card>
				</main>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-background to-background/80">
			<header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-16 items-center px-4">
					<div className="mr-4 flex">
						<Link href="/" className="flex items-center">
							<Globe className="h-6 w-6 text-primary" />
							<span className="ml-2 text-xl font-semibold">ConfigsHub</span>
						</Link>
					</div>

					<div className="flex-1" />

					<nav className="flex items-center gap-4">
						<Link href="/dashboard">
							<Button variant="ghost" size="sm">
								Dashboard
							</Button>
						</Link>
						<Link href="/projects">
							<Button variant="ghost" size="sm" className="bg-accent/30">
								Projects
							</Button>
						</Link>
						<Link href="/settings">
							<Button variant="ghost" size="icon">
								<Settings className="h-5 w-5" />
								<span className="sr-only">Settings</span>
							</Button>
						</Link>
					</nav>
				</div>
			</header>

			<main className="container px-4 py-10">
				<div className="mb-6">
					<Button variant="ghost" size="sm" className="mb-2" onClick={() => router.push("/projects")}>
						<ChevronLeft className="h-4 w-4 mr-1" />
						Back to Projects
					</Button>

					<div className="flex flex-wrap items-start justify-between gap-4">
						<div>
							<div className="flex items-center gap-2">
								<h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
								{project.is_public && (
									<div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
										<Globe className="h-3 w-3 mr-1" />
										Public
									</div>
								)}
							</div>
							{project.description && (
								<p className="text-muted-foreground mt-1 max-w-2xl">{project.description}</p>
							)}
						</div>

						<div className="flex flex-wrap gap-2">
							<Button variant="outline" size="sm">
								<Share className="h-4 w-4 mr-1.5" />
								Share
							</Button>
							<Button variant="outline" size="sm">
								<Download className="h-4 w-4 mr-1.5" />
								Export
							</Button>
							<Button variant="outline" size="sm">
								<Edit className="h-4 w-4 mr-1.5" />
								Edit
							</Button>
							<Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
								<Trash2 className="h-4 w-4 mr-1.5" />
								Delete
							</Button>
						</div>
					</div>
				</div>

				{project.tags && project.tags.length > 0 && (
					<div className="mb-8 flex flex-wrap gap-1.5">
						{project.tags.map((tag) => (
							<span
								key={`${project.id}-tag-${tag}`}
								className="inline-flex items-center rounded-full bg-accent/40 px-2.5 py-0.5 text-xs"
							>
								{tag}
							</span>
						))}
					</div>
				)}

				<div className="mb-6 flex items-center justify-between">
					<h2 className="text-xl font-semibold">Project Overview</h2>
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<GitBranch className="h-4 w-4" />
						<span>Updated {new Date(project.updated_at).toLocaleString()}</span>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between">
							<div>
								<CardTitle className="flex items-center gap-2">
									<FileCode className="h-5 w-5 text-primary" />
									Configurations
								</CardTitle>
								<CardDescription>Manage all configurations for this project</CardDescription>
							</div>
							<span className="text-2xl font-medium">{project.config_count || 0}</span>
						</CardHeader>
						<CardContent>
							<Button className="w-full">View Configurations</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between">
							<div>
								<CardTitle className="flex items-center gap-2">
									<Server className="h-5 w-5 text-primary" />
									Environments
								</CardTitle>
								<CardDescription>Manage deployment environments</CardDescription>
							</div>
							<span className="text-2xl font-medium">{project.environment_count || 0}</span>
						</CardHeader>
						<CardContent>
							<Button className="w-full">View Environments</Button>
						</CardContent>
					</Card>

					<Card className="md:col-span-2">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<History className="h-5 w-5 text-primary" />
								Recent Activity
							</CardTitle>
						</CardHeader>
						<CardContent className="text-center py-12 text-muted-foreground">
							No recent activity for this project.
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}
