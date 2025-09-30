"use client";

import {
  ArrowUpRight,
  Eye,
  FileCode,
  Folder,
  GitBranch,
  Grid3X3,
  List,
  Lock,
  Plus,
  Search,
  Server,
  Sparkles,
  Star,
  Tags,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/common/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

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
  last_activity?: string;
  team_members?: number;
};

// Skeleton card for loading state
function SkeletonCard() {
  return (
    <Card className="glass-card opacity-70 animate-pulse apple-fade-in">
      <CardHeader className="space-y-3">
        <div className="h-6 w-2/3 rounded-lg bg-muted"></div>
        <div className="h-4 w-full rounded-md bg-muted"></div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="h-4 w-full rounded-md bg-muted"></div>
        <div className="h-4 w-3/4 rounded-md bg-muted"></div>
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded-full bg-muted"></div>
          <div className="h-6 w-20 rounded-full bg-muted"></div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="h-8 w-full rounded-lg bg-muted"></div>
      </CardFooter>
    </Card>
  );
}

// Enhanced Project Card Component
function ProjectCard({ project }: { project: Project }) {
  const [isStarred, setIsStarred] = useState(false);

  return (
    <Link href={`/projects/${project.id}`} className="block group">
      <Card className="glass-card h-full transition-all duration-300 apple-scale hover:shadow-xl hover:-translate-y-1 border-transparent hover:border-primary/20 flex flex-col relative overflow-hidden">
        {/* Liquid glass shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

        <CardHeader className="relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary apple-bounce">
                <Folder className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  {project.name}
                  {project.is_public ? (
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Public</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Private</span>
                    </div>
                  )}
                </CardTitle>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsStarred(!isStarred);
              }}
            >
              <Star
                className={cn(
                  "h-4 w-4",
                  isStarred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                )}
              />
            </Button>
          </div>
          <CardDescription className="line-clamp-2 mt-2 text-sm leading-relaxed">
            {project.description || "No description provided"}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 flex-1">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-accent/30 text-sm">
              <FileCode className="h-4 w-4 text-primary" />
              <span className="font-medium">{project.config_count || 0}</span>
              <span className="text-muted-foreground">configs</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-accent/30 text-sm">
              <Server className="h-4 w-4 text-primary" />
              <span className="font-medium">{project.environment_count || 0}</span>
              <span className="text-muted-foreground">envs</span>
            </div>
          </div>

          {/* Activity indicator */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span>Last activity {new Date(project.updated_at).toLocaleDateString()}</span>
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={`${project.id}-tag-${tag}`}
                  className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2.5 py-1 text-xs font-medium"
                >
                  <Tags className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="inline-flex items-center rounded-full bg-accent/60 px-2.5 py-1 text-xs font-medium">
                  +{project.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t border-border/30 pt-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <GitBranch className="h-3.5 w-3.5" />
              <span>Updated {new Date(project.updated_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-muted-foreground">Open</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
            .from("projects")
            .select("*")
            .eq("owner_id", userData.user.id)
            .order("created_at", { ascending: false });

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
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <div className="min-h-screen bg-gradient-modern relative overflow-hidden">
      {/* Dashboard Header */}
      <DashboardHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Enhanced Header Section */}
        <div className="mb-12 space-y-6 apple-fade-in">
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10 flex items-center justify-center shadow-lg">
                <Folder className="w-8 h-8 text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-white">{projects.length}</span>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">Projects</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Manage your configuration projects with enterprise-grade security and seamless
                collaboration. Organize, version, and deploy your configs across environments.
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4">
            <div className="glass-card px-4 py-3 rounded-xl border border-border/30">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-sm font-medium text-foreground">{projects.length}</span>
                <span className="text-sm text-muted-foreground">total projects</span>
              </div>
            </div>
            <div className="glass-card px-4 py-3 rounded-xl border border-border/30">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-foreground">
                  {projects.filter((p) => p.is_public).length}
                </span>
                <span className="text-sm text-muted-foreground">public</span>
              </div>
            </div>
            <div className="glass-card px-4 py-3 rounded-xl border border-border/30">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-sm font-medium text-foreground">
                  {projects.filter((p) => !p.is_public).length}
                </span>
                <span className="text-sm text-muted-foreground">private</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Controls Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {/* Enhanced Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects, descriptions, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl border-border/50 bg-background/50 backdrop-blur focus:border-primary/50 transition-all"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-accent/20">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0 rounded-md"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0 rounded-md"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Enhanced Create Button */}
          <Link href="/projects/new">
            <Button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 apple-scale">
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></span>
              <Sparkles className="h-4 w-4 mr-2" />
              Create Project
              <ArrowUpRight className="h-4 w-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Button>
          </Link>
        </div>

        {/* Projects Grid/List */}
        {loading ? (
          <div
            className={cn(
              "grid gap-6 items-start",
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
            )}
          >
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : filteredProjects.length > 0 ? (
          <div
            className={cn(
              "grid gap-6 items-start apple-fade-in",
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-4xl",
            )}
          >
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="apple-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          /* Enhanced Empty State */
          <Card className="glass-card p-12 text-center max-w-2xl mx-auto apple-fade-in">
            <div className="space-y-6">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Folder className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">
                  {searchTerm ? "No matching projects" : "Welcome to ConfigsHub"}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                  {searchTerm
                    ? `No projects matching "${searchTerm}" were found. Try adjusting your search or create a new project.`
                    : "Start managing your configurations like a pro. Create your first project to organize configs, collaborate with teams, and deploy with confidence."}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/projects/new">
                  <Button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                    <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></span>
                    <Plus className="h-4 w-4 mr-2" />
                    {searchTerm ? "Create New Project" : "Create Your First Project"}
                  </Button>
                </Link>
                {searchTerm && (
                  <Button variant="outline" onClick={() => setSearchTerm("")} className="rounded-xl">
                    Clear Search
                  </Button>
                )}
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
