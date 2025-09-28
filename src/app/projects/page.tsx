"use client";

import { FileCode, Folder, GitBranch, Globe, Plus, Server, Settings, Star, Tags } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

// Skeleton card for loading state
function SkeletonCard() {
  return (
    <Card className="opacity-70 animate-pulse">
      <CardHeader className="space-y-2">
        <div className="h-6 w-2/3 rounded-md bg-muted"></div>
        <div className="h-4 w-full rounded-md bg-muted"></div>
      </CardHeader>
      <CardContent>
        <div className="h-4 w-full rounded-md bg-muted mb-2"></div>
        <div className="h-4 w-3/4 rounded-md bg-muted"></div>
      </CardContent>
      <CardFooter>
        <div className="h-8 w-full rounded-md bg-muted"></div>
      </CardFooter>
    </Card>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch user and projects on component mount
  useEffect(() => {
    const fetchUserAndProjects = async () => {
      try {
        // Get current user
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (userData?.user) {
          // Fetch projects for the user
          const { data: projectsData, error: projectsError } = await supabase
            .from('projects')
            .select('*')
            .eq('owner_id', userData.user.id)
            .order('created_at', { ascending: false });

          if (projectsError) {
            throw projectsError;
          }

          setProjects(projectsData || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndProjects();
  }, []);

  // Filter projects based on search term
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80">
      {/* Header with navigation */}
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
              <Button variant="ghost" size="sm">Dashboard</Button>
            </Link>
            <Link href="/projects">
              <Button variant="ghost" size="sm" className="bg-accent/30">Projects</Button>
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
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage all your configuration projects in one place.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="relative max-w-sm">
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl shadow-sm"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-labelledby="searchIconTitle"
            >
              <title id="searchIconTitle">Search</title>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>

          <Link href="/projects/new">
            <Button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></span>
              <Plus className="h-5 w-5 mr-1.5" />
              New Project
              <svg
                className="h-4 w-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-labelledby="arrowRightTitle"
              >
                <title id="arrowRightTitle">Arrow right</title>
                <path d="M3.33337 8H12.6667M12.6667 8L8.00004 3.33333M12.6667 8L8.00004 12.6667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round" />
              </svg>
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {filteredProjects.map((project) => (
              <Link href={`/projects/${project.id}`} key={project.id} className="block group">
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-0.5 border-transparent hover:border-primary/20 flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Folder className="h-5 w-5 text-primary" />
                        <span>{project.name}</span>
                      </CardTitle>
                      {project.is_public && (
                        <Globe className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <CardDescription className="line-clamp-2 mt-2">
                      {project.description || "No description provided"}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1.5">
                        <FileCode className="h-4 w-4 text-muted-foreground" />
                        <span>{project.config_count || 0} configs</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Server className="h-4 w-4 text-muted-foreground" />
                        <span>{project.environment_count || 0} environments</span>
                      </div>
                    </div>

                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={`${project.id}-tag-${tag}`}
                            className="inline-flex items-center rounded-full bg-accent/40 px-2 py-0.5 text-xs"
                          >
                            <Tags className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="inline-flex items-center rounded-full bg-accent/40 px-2 py-0.5 text-xs">
                            +{project.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="border-t border-border/50 pt-4 text-xs text-muted-foreground">
                    <div className="flex w-full justify-between">
                      <div className="flex items-center gap-1.5">
                        <GitBranch className="h-3.5 w-3.5" />
                        <span>Updated {new Date(project.updated_at).toLocaleDateString()}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Star className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="glass-card p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="rounded-full bg-primary/10 p-3">
                <Folder className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">No projects found</h3>
                <p className="text-muted-foreground max-w-lg">
                  {searchTerm ?
                    `No projects matching "${searchTerm}" were found. Try a different search term or create a new project.` :
                    "You don't have any projects yet. Create your first project to get started managing your configurations."
                  }
                </p>
                <Link href="/projects/new">
                  <Button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                    <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></span>
                    <Plus className="h-5 w-5 mr-1.5" />
                    Create first project
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}