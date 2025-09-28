"use client";

import { ArrowLeft, Eye, EyeOff, Loader2, Lock, Mail, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase/client";

function SignupContent() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [error, setError] = useState("");
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsMounted(true);
        const checkAuth = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (user) {
                router.replace("/dashboard");
            } else {
                setIsCheckingAuth(false);
            }
        };
        checkAuth();

        const urlError = searchParams.get("error");
        if (urlError) {
            setError(urlError);
            // Reset Google loading state if there's an error
            setIsGoogleLoading(false);
        }
    }, [router, searchParams]);

    // Reset Google loading state after timeout
    useEffect(() => {
        if (isGoogleLoading) {
            const timeout = setTimeout(() => {
                setIsGoogleLoading(false);
                setError("Google sign-in timed out. Please try again.");
            }, 10000); // 10 second timeout

            return () => clearTimeout(timeout);
        }
    }, [isGoogleLoading]);

    const handleGoogleSignin = useCallback(async () => {
        setIsGoogleLoading(true);
        setError("");

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/dashboard`,
                    queryParams: {
                        access_type: "offline",
                        prompt: "consent",
                    },
                },
            }); if (error) {
                console.error("Error signing in with Google:", error);
                setError(error.message || "Could not authenticate with Google");
                setIsGoogleLoading(false);
            }
            // If successful, user will be redirected to Google
        } catch (error) {
            console.error("Unexpected error in Google sign-in:", error);
            setError("An unexpected error occurred. Please try again.");
            setIsGoogleLoading(false);
        }
    }, []);

    const handleSignup = useCallback(async () => {
        if (!name || !email || !password) {
            setError("Please fill in all fields");
            return;
        }
        setIsLoading(true);
        setError("");
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
                data: { full_name: name },
            },
        });
        if (error) {
            setError(error.message || "An error occurred");
            toast.error(error.message || "An error occurred during signup");
            setIsLoading(false);
            return;
        }

        if (data.user) {
            try {
                const response = await fetch("/api/auth/user", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user: data.user }),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to save user data.");
                }
            } catch (apiError: unknown) {
                if (apiError instanceof Error) {
                    toast.error(apiError.message || "An error occurred while saving user data.");
                } else {
                    toast.error("An unknown error occurred while saving user data.");
                }
            }
        }

        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session) {
            router.push("/dashboard");
        } else {
            toast.success("Check your email to confirm your account.");
        }
        setIsLoading(false);
    }, [name, email, password, router]);

    if (!isMounted || isCheckingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
                <div className="relative z-10">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-blue-950/20 dark:to-purple-950/10"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-32 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 flex items-center justify-center px-6 min-h-screen">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Join ConfigsHub</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Start managing your configurations like a pro
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
                        <div className="mb-6">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-all duration-200 group"
                            >
                                <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                                Back to home
                            </Link>
                        </div>

                        {error && (
                            <Alert variant="destructive" className="mb-6">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Full Name
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="pl-10 h-12 border-gray-300 dark:border-gray-600 rounded-xl"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 h-12 border-gray-300 dark:border-gray-600 rounded-xl"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a strong password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 pr-12 h-12 border-gray-300 dark:border-gray-600 rounded-xl"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        disabled={isLoading || isGoogleLoading}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={handleSignup}
                            disabled={isLoading || isGoogleLoading || !name || !email || !password}
                            className="w-full h-12 mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </Button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-300 dark:border-gray-600" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-slate-900 px-3 text-gray-500 font-medium">or</span>
                            </div>
                        </div>

                        <Button
                            onClick={handleGoogleSignin}
                            variant="outline"
                            className="w-full h-12 border-gray-300 dark:border-gray-600 rounded-xl font-medium text-base hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                            disabled={isLoading || isGoogleLoading}
                        >
                            {isGoogleLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Connecting to Google...
                                </>
                            ) : (
                                <>
                                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" aria-label="Google">
                                        <title>Google</title>
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    Continue with Google
                                </>
                            )}
                        </Button>

                        <div className="text-center text-sm mt-6">
                            <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
                            <Link
                                href="/auth/signin"
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>

                    <div className="text-center mt-6 text-xs text-gray-500">
                        By creating an account, you agree to our{" "}
                        <Link href="/terms" className="text-blue-600 hover:underline">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                            Privacy Policy
                        </Link>
                        .
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Signup() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
                    <div className="relative z-10">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                </div>
            }
        >
            <SignupContent />
        </Suspense>
    );
}
