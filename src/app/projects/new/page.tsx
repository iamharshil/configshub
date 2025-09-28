"use client";

import { Check, ChevronLeft, Globe, Plus, Settings, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase/client";

export default function NewProjectPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form validation
    const isNameValid = name.trim().length >= 3 && name.trim().length <= 50;
    const isDescriptionValid = description.trim().length <= 500;
    const isFormValid = isNameValid && isDescriptionValid;

    const handleAddTag = () => {
        const trimmedTag = newTag.trim().toLowerCase();
        if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 10) {
            setTags([...tags, trimmedTag]);
            setNewTag("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && newTag) {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsSubmitting(true);
        try {
            // Get the current user
            const { data: userData, error: userError } = await supabase.auth.getUser();

            if (userError) throw userError;
            if (!userData?.user) {
                toast.error("You must be signed in to create a project");
                router.push("/auth/signin");
                return;
            }

            // Create the project
            const { data, error } = await supabase
                .from('projects')
                .insert([
                    {
                        name: name.trim(),
                        description: description.trim() || null,
                        is_public: isPublic,
                        owner_id: userData.user.id,
                        tags: tags.length > 0 ? tags : null,
                    }
                ])
                .select()
                .single();

            if (error) throw error;

            toast.success("Project created successfully!");
            router.push(`/projects/${data.id}`);
        } catch (error) {
            console.error("Error creating project:", error);
            toast.error("Failed to create project. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="mb-2"
                        onClick={() => router.back()}
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Projects
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
                    <p className="text-muted-foreground mt-1">
                        Set up a new configuration project to organize your settings.
                    </p>
                </div>

                <Card className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Project Details</CardTitle>
                            <CardDescription>
                                Fill in the information below to create your new project.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Project Name <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="My Awesome Project"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={!name ? "" : isNameValid ? "border-green-500/50" : "border-destructive"}
                                />
                                <p className="text-xs text-muted-foreground">
                                    {name.length}/50 characters
                                    {name && !isNameValid && (
                                        <span className="text-destructive block mt-1">
                                            Name must be between 3 and 50 characters
                                        </span>
                                    )}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe what this project is about..."
                                    value={description}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                                    className={!description ? "" : isDescriptionValid ? "" : "border-destructive"}
                                    rows={3}
                                />
                                <p className="text-xs text-muted-foreground">
                                    {description.length}/500 characters
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags</Label>
                                <div className="flex">
                                    <Input
                                        id="tags"
                                        placeholder="Add tags to organize your projects..."
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        disabled={tags.length >= 10}
                                    />
                                    <Button
                                        type="button"
                                        onClick={handleAddTag}
                                        disabled={!newTag.trim() || tags.includes(newTag.trim().toLowerCase()) || tags.length >= 10}
                                        className="ml-2 whitespace-nowrap"
                                    >
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {tags.length}/10 tags (press Enter to add)
                                </p>

                                {tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {tags.map(tag => (
                                            <div
                                                key={tag}
                                                className="flex items-center gap-1 rounded-full bg-accent/40 px-2.5 py-1 text-xs"
                                            >
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveTag(tag)}
                                                    className="rounded-full bg-accent/50 p-0.5 hover:bg-accent/80 transition-colors"
                                                >
                                                    <X className="h-3 w-3" />
                                                    <span className="sr-only">Remove {tag} tag</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="public"
                                    checked={isPublic}
                                    onCheckedChange={setIsPublic}
                                />
                                <div className="grid gap-0.5">
                                    <Label htmlFor="public">Public Project</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Anyone with the link can view this project's configurations.
                                    </p>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex justify-between border-t pt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push('/projects')}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={!isFormValid || isSubmitting}
                                className="relative overflow-hidden group"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></span>
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-1.5"></div>
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Check className="h-4 w-4 mr-1.5" />
                                        Create Project
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </main>
        </div>
    );
}