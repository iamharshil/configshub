"use client";

import { ArrowLeft, Calendar, Camera, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface UserProfile {
    id: string;
    name?: string;
    email: string;
    avatar_url?: string;
    created_at: string;
    updated_at?: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            setIsLoading(true);
            setError(null); // Reset any previous errors

            try {
                console.log("Fetching user profile...");

                // Check if Supabase client is initialized properly
                if (!supabase) {
                    throw new Error("Supabase client is not initialized");
                }

                const authResponse = await supabase.auth.getUser();
                console.log("Auth response:", authResponse);

                const { data: sessionData, error: sessionError } = authResponse;

                if (sessionError) {
                    throw sessionError;
                }

                if (!sessionData.user) {
                    router.push("/auth/signin");
                    return;
                }

                console.log("User data:", {
                    id: sessionData.user.id,
                    email: sessionData.user.email,
                    created_at: sessionData.user.created_at,
                    metadata: sessionData.user.user_metadata,
                });

                // Try to safely extract user metadata values
                const metadata = sessionData.user.user_metadata || {};
                const fullName = typeof metadata.full_name === "string" ? metadata.full_name : undefined;
                const avatarUrl = typeof metadata.avatar_url === "string" ? metadata.avatar_url : undefined;

                const userData: UserProfile = {
                    id: sessionData.user.id,
                    name: fullName,
                    email: sessionData.user.email || "",
                    avatar_url: avatarUrl,
                    created_at: sessionData.user.created_at || new Date().toISOString(),
                };

                setUser(userData);
                setFormData({
                    name: userData.name || "",
                    email: userData.email,
                });
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setError(error instanceof Error ? error.message : "Failed to load profile data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, [router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user types
        if (formErrors[name as keyof typeof formErrors]) {
            setFormErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const errors = { name: "", email: "" };

        if (!formData.name.trim()) {
            errors.name = "Name is required";
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            errors.email = "Email is required";
            isValid = false;
        } else if (!emailPattern.test(formData.email)) {
            errors.email = "Please enter a valid email address";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleUpdateProfile = async () => {
        if (!validateForm()) return;

        setIsUpdating(true);
        try {
            const { error } = await supabase.auth.updateUser({
                email: formData.email !== user?.email ? formData.email : undefined,
                data: {
                    full_name: formData.name,
                },
            });

            if (error) throw error;

            // Update local state
            setUser((prev) => (prev ? { ...prev, name: formData.name, email: formData.email } : null));

            // Show success message (you could add a toast notification here)
            alert("Profile updated successfully");
        } catch (error: unknown) {
            console.error("Error updating profile:", error);
            const errorMessage = error instanceof Error ? error.message : "Failed to update profile. Please try again.";
            alert(errorMessage);
        } finally {
            setIsUpdating(false);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (error) {
        return (
            <div className="min-h-screen bg-white dark:bg-slate-950">
                {/* Background Grid */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

                <div className="min-h-screen flex items-center justify-center px-4">
                    <div className="max-w-md w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-red-200 dark:border-red-900/30 rounded-xl p-8 shadow-lg">
                        <div className="flex flex-col items-center text-center">
                            <div className="h-16 w-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-red-600 dark:text-red-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    role="img"
                                    aria-label="Error icon"
                                >
                                    <title>Error loading profile</title>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-3">
                                Error Loading Profile
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
                            <div className="flex gap-4">
                                <Button
                                    onClick={() => window.location.reload()}
                                    className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
                                >
                                    Try Again
                                </Button>
                                <Link href="/dashboard">
                                    <Button variant="outline" className="rounded-lg group flex items-center gap-2">
                                        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                                        Return to Dashboard
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white dark:bg-slate-950">
                {/* Background Grid */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

                {/* Gradient Orbs */}
                <div className="absolute top-0 -left-4 w-48 h-48 sm:w-72 sm:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-48 h-48 sm:w-72 sm:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-48 h-48 sm:w-72 sm:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

                <div className="min-h-screen flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6">
                            <div className="h-8 w-8 border-t-2 border-white rounded-full animate-spin"></div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                Loading Profile
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Please wait while we retrieve your information...
                            </p>
                        </div>
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

            {/* Main Content */}
            <main className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
                {/* Back button */}
                <div className="mb-8">
                    <Link href="/dashboard">
                        <Button
                            variant="outline"
                            size="lg"
                            className="group flex items-center gap-3 rounded-full bg-white px-5 py-2 text-gray-700 shadow-md transition-all hover:bg-gray-50 hover:shadow-lg dark:bg-slate-900/60 dark:text-gray-200 dark:hover:bg-slate-900/90"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                            <span className="font-medium">Back to Dashboard</span>
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Header */}
                    <div className="col-span-1 lg:col-span-3">
                        <div className="relative backdrop-blur-md bg-white/80 dark:bg-slate-900/70 border border-white/20 dark:border-slate-700/20 rounded-2xl shadow-lg p-8">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                {/* Avatar */}
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl overflow-hidden">
                                        {user?.avatar_url ? (
                                            <Image
                                                src={user.avatar_url}
                                                alt={user.name || "User"}
                                                className="w-full h-full object-cover"
                                                width={120}
                                                height={120}
                                            />
                                        ) : (
                                            <User className="h-10 w-10 text-white" />
                                        )}
                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                                            <Camera className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* User info */}
                                <div className="flex-1">
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {user?.name || "User"}
                                    </h1>
                                    <div className="flex items-center mt-1 text-gray-600 dark:text-gray-300">
                                        <Mail className="h-4 w-4 mr-2" />
                                        <span>{user?.email}</span>
                                    </div>
                                    <div className="flex items-center mt-1 text-gray-600 dark:text-gray-300">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        <span>Member since {formatDate(user?.created_at)}</span>
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="mt-4 md:mt-0">
                                    <Link href="/settings">
                                        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all">
                                            Settings
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <div className="col-span-1 lg:col-span-2">
                        <div className="backdrop-blur-md bg-white/80 dark:bg-slate-900/70 border border-white/20 dark:border-slate-700/20 rounded-2xl shadow-lg p-8">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Edit Profile</h2>

                            <div className="space-y-6">
                                {/* Name field */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="name"
                                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Full Name
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={cn("pl-10 rounded-xl", formErrors.name && "border-red-500")}
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
                                </div>

                                {/* Email field */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="email"
                                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={cn("pl-10 rounded-xl", formErrors.email && "border-red-500")}
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                    {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
                                </div>

                                {/* Update button */}
                                <div className="pt-4">
                                    <Button
                                        onClick={handleUpdateProfile}
                                        disabled={isUpdating}
                                        className="group relative w-full sm:w-auto rounded-xl 
                    bg-gradient-to-b from-blue-500 to-indigo-600
                    border border-white/20 dark:border-slate-700/30 
                    backdrop-blur-lg shadow-sm
                    hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]
                    py-2 px-6 
                    transition-all duration-300 ease-out
                    hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                                    >
                                        <div className="absolute inset-0 rounded-xl overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                                        </div>
                                        <span className="relative z-10 font-medium text-sm text-white">
                                            {isUpdating ? "Updating..." : "Update Profile"}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info Card */}
                    <div className="col-span-1">
                        <div className="backdrop-blur-md bg-white/80 dark:bg-slate-900/70 border border-white/20 dark:border-slate-700/20 rounded-2xl shadow-lg p-8">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                Account Information
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">User ID</h3>
                                    <p className="text-sm font-mono text-gray-700 dark:text-gray-300 mt-1 break-all">
                                        {user?.id}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                        {formatDate(user?.created_at)}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Last Updated
                                    </h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                        {user?.updated_at ? formatDate(user.updated_at) : "Never updated"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
