"use client";
import { Eye, EyeOff, Loader2, Lock, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [error, setError] = useState("");
    const [isCheckingAuth, setIsCheckingAuth] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Check if user is already authenticated
    useEffect(() => {
        setIsMounted(true);

        const checkAuth = async () => {
            setIsCheckingAuth(true);
            try {
                const session = await authClient.getSession();
                if (session?.data?.user) {
                    // User is already logged in, redirect to dashboard
                    window.location.href = "/dashboard";
                    return;
                }
            } catch (_error) {
                // User is not logged in, which is expected for signin page
                console.log("No active session, continuing with signin");
            } finally {
                setIsCheckingAuth(false);
            }
        };

        checkAuth();
    }, []);

    const handleSignin = async () => {
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        setError("");

        const { data, error: authError } = await authClient.signIn.email({
            email,
            password,
        });

        if (authError) {
            setError(authError.message || "An error occurred");
        } else {
            console.log("Signed in:", data.user);
            // Redirect to dashboard or handle success
            window.location.href = "/";
        }

        setIsLoading(false);
    };

    const handleGoogleSignin = async () => {
        setIsGoogleLoading(true);
        setError("");

        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: window.location.origin + "/dashboard",
            });
        } catch {
            setError("Failed to sign in with Google");
            setIsGoogleLoading(false);
        }
    };

    // Prevent hydration mismatch by showing loading on client side only
    if (!isMounted) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
                <div className="relative z-10">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            </div>
        );
    }

    // Show loading while checking authentication
    if (isCheckingAuth) {
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
            {/* Modern gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-blue-950/20 dark:to-purple-950/10"></div>

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Modern floating elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-32 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-3xl"></div>
            </div>

            {/* Header with back button */}
            <div className="relative z-10 w-full pt-8 pb-4">
                <div className="max-w-md mx-auto px-6">
                    <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-8">
                        ← Back to home
                    </Link>
                </div>
            </div>

            <div className="relative z-10 flex items-center justify-center px-6 min-h-[calc(100vh-120px)]">
                <div className="w-full max-w-md">
                    {/* Brand header */}
                    <div className="text-center mb-8">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
                        <p className="text-gray-600 dark:text-gray-400">Sign in to your ConfigsHub account</p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-semibold mb-2">Sign in to your account</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Enter your credentials to continue</p>
                        </div>

                        {error && (
                            <Alert variant="destructive" className="mb-6">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-4">
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
                                        disabled={isLoading || isGoogleLoading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Password
                                    </Label>
                                    <Link href="/auth/forgot-password" className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 pr-12 h-12 border-gray-300 dark:border-gray-600 rounded-xl"
                                        disabled={isLoading || isGoogleLoading}
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
                            onClick={handleSignin}
                            disabled={isLoading || isGoogleLoading || !email || !password}
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                "Sign In"
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
                            variant="outline"
                            className="w-full h-12 border-gray-300 dark:border-gray-600 rounded-xl font-medium text-base hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                            disabled={isLoading || isGoogleLoading}
                            onClick={handleGoogleSignin}
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
                            <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
                            <Link href="/auth/signup" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline">
                                Sign up
                            </Link>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-6 text-xs text-gray-500">
                        © 2025 ConfigsHub. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
}
