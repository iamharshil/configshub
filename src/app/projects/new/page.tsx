"use client";

import { AlertCircle, Check, ChevronLeft, Globe, Lock, Sparkles, Tag, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/common/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

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
		setTags(tags.filter((tag) => tag !== tagToRemove));
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && newTag) {
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
				.from("projects")
				.insert([
					{
						name: name.trim(),
						description: description.trim() || null,
						is_public: isPublic,
						owner_id: userData.user.id,
						tags: tags.length > 0 ? tags : null,
					},
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
		<div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
			{/* Dashboard Header */}
			<DashboardHeader />

			<main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
				{/* Streamlined Header */}
				<div className="">
					<Button
						variant="ghost"
						size="sm"
						className="mb-8 text-muted-foreground hover:text-foreground transition-colors"
						onClick={() => router.back()}
					>
						<ChevronLeft className="h-4 w-4 mr-2" />
						Back to Projects
					</Button>

					{/* <div className="text-center max-w-2xl mx-auto">
                        <h1 className="text-4xl font-bold tracking-tight">Create New Project</h1>
                    </div> */}
				</div>

				{/* Modern Form Layout */}
				<div className="grid lg:grid-cols-3 gap-8 items-start">
					{/* Main Form */}
					<div className="lg:col-span-2">
						<Card className="border border-border/50 shadow-sm">
							<form onSubmit={handleSubmit}>
								<CardHeader className="pb-6">
									<CardTitle className="text-xl">Project Information</CardTitle>
									<CardDescription>Basic details about your configuration project.</CardDescription>
								</CardHeader>

								<CardContent className="space-y-8">
									{/* Project Name */}
									<div className="space-y-3">
										<Label htmlFor="name" className="text-sm font-medium">
											Project Name <span className="text-destructive">*</span>
										</Label>
										<Input
											id="name"
											placeholder="My Development Environment"
											value={name}
											onChange={(e) => setName(e.target.value)}
											className={cn(
												"h-11 transition-all",
												!name
													? ""
													: isNameValid
														? "border-green-500/50 focus:border-green-500"
														: "border-destructive focus:border-destructive",
											)}
										/>
										<div className="flex items-center justify-between text-xs">
											<span className="text-muted-foreground">
												Choose a clear, descriptive name
											</span>
											<span
												className={cn(
													"font-medium",
													name.length > 40
														? "text-orange-500"
														: name.length > 50
															? "text-destructive"
															: "text-muted-foreground",
												)}
											>
												{name.length}/50
											</span>
										</div>
										{name && !isNameValid && (
											<div className="flex items-center gap-2 text-sm text-destructive">
												<AlertCircle className="h-4 w-4" />
												Name must be between 3 and 50 characters
											</div>
										)}
									</div>

									{/* Description */}
									<div className="space-y-3">
										<Label htmlFor="description" className="text-sm font-medium">
											Description
										</Label>
										<Textarea
											id="description"
											placeholder="Describe your project's purpose, the types of configurations it will contain, and how your team will use it..."
											value={description}
											onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
												setDescription(e.target.value)
											}
											className="min-h-[100px] resize-none"
											rows={4}
										/>
										<div className="flex items-center justify-between text-xs">
											<span className="text-muted-foreground">
												Help others understand your project's purpose
											</span>
											<span
												className={cn(
													"font-medium",
													description.length > 400
														? "text-orange-500"
														: description.length > 500
															? "text-destructive"
															: "text-muted-foreground",
												)}
											>
												{description.length}/500
											</span>
										</div>
									</div>

									{/* Tags */}
									<div className="space-y-3">
										<Label htmlFor="tags" className="text-sm font-medium">
											Tags
										</Label>
										<div className="flex gap-2">
											<Input
												id="tags"
												placeholder="react, typescript, docker..."
												value={newTag}
												onChange={(e) => setNewTag(e.target.value)}
												onKeyDown={handleKeyDown}
												disabled={tags.length >= 10}
												className="h-11"
											/>
											<Button
												type="button"
												onClick={handleAddTag}
												disabled={
													!newTag.trim() ||
													tags.includes(newTag.trim().toLowerCase()) ||
													tags.length >= 10
												}
												className="px-4"
											>
												Add
											</Button>
										</div>

										{tags.length > 0 && (
											<div className="flex flex-wrap gap-2 p-3 rounded-lg bg-accent/30 border border-border/30">
												{tags.map((tag) => (
													<div
														key={tag}
														className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-sm font-medium border border-primary/20"
													>
														<Tag className="h-3 w-3" />
														{tag}
														<button
															type="button"
															onClick={() => handleRemoveTag(tag)}
															className="ml-1 hover:bg-primary/20 rounded p-0.5 transition-colors"
														>
															<X className="h-3 w-3" />
														</button>
													</div>
												))}
											</div>
										)}

										<div className="flex items-center justify-between text-xs">
											<span className="text-muted-foreground">
												Add tags to categorize and discover your project
											</span>
											<span className="font-medium text-muted-foreground">
												{tags.length}/10 tags
											</span>
										</div>
									</div>
								</CardContent>

								<CardFooter className="border-t border-border/20 bg-accent/5 pt-6">
									<div className="flex gap-3 w-full">
										<Button
											type="button"
											variant="outline"
											onClick={() => router.push("/projects")}
											className="flex-1"
										>
											Cancel
										</Button>
										<Button
											type="submit"
											disabled={!isFormValid || isSubmitting}
											className="flex-1"
										>
											{isSubmitting ? (
												<>
													<div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
													Creating...
												</>
											) : (
												<>
													<Check className="h-4 w-4 mr-2" />
													Create Project
												</>
											)}
										</Button>
									</div>
								</CardFooter>
							</form>
						</Card>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Visibility Settings */}
						<Card className="border border-border/50">
							<CardHeader className="pb-4">
								<CardTitle className="text-lg flex items-center gap-2">
									{isPublic ? <Globe className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
									Project Visibility
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="space-y-1">
										<Label htmlFor="public" className="text-sm font-medium">
											{isPublic ? "Public Project" : "Private Project"}
										</Label>
										<p className="text-xs text-muted-foreground">
											{isPublic
												? "Anyone can view and fork this project"
												: "Only you and collaborators can access"}
										</p>
									</div>
									<Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
								</div>

								<div className="p-3 rounded-lg bg-accent/30 border border-border/30">
									<div className="flex items-start gap-3">
										<div className="mt-0.5">
											{isPublic ? (
												<Globe className="h-4 w-4 text-green-600" />
											) : (
												<Lock className="h-4 w-4 text-orange-600" />
											)}
										</div>
										<div className="text-xs space-y-1">
											<p className="font-medium">
												{isPublic ? "Public Access" : "Private Access"}
											</p>
											<p className="text-muted-foreground leading-relaxed">
												{isPublic
													? "Your project will be visible to everyone and can be discovered through search. Others can view and copy configurations."
													: "Your project is completely private. Only invited team members can access the configurations and collaborate."}
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Tips Card */}
						<Card className="border border-border/50 bg-gradient-to-br from-accent/20 to-accent/10">
							<CardHeader className="pb-4">
								<CardTitle className="text-lg flex items-center gap-2">
									<Sparkles className="h-5 w-5 text-primary" />
									Pro Tips
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3 text-sm">
								<div className="flex items-start gap-3">
									<div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
									<p className="text-muted-foreground leading-relaxed">
										Use descriptive names that clearly indicate the project's purpose
									</p>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
									<p className="text-muted-foreground leading-relaxed">
										Add relevant tags to make your project discoverable
									</p>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
									<p className="text-muted-foreground leading-relaxed">
										Start with private projects and make them public when ready
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}
