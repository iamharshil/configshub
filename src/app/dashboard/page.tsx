"use client";
import { Loader2, LogOut, Settings, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

export default function Dashboard() {
    const [user, setUser] = useState<{ name?: string; email: string; emailVerified?: boolean } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            try {
                const session = await authClient.getSession();
                if (session?.data?.user) {
                    setUser(session.data.user);
                } else {
                    // Redirect to signin if not authenticated
                    window.location.href = "/auth/signin";
                }
            } catch (error) {
                console.error("Error getting session:", error);
                window.location.href = "/auth/signin";
            } finally {
                setIsLoading(false);
            }
        };

        getUser();
    }, []);

    const handleSignOut = async () => {
        try {
            await authClient.signOut();
            window.location.href = "/";
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back, {user?.name || user?.email}</p>
                    </div>
                    <Button variant="outline" onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </Button>
                </div>

                {/* User Profile Card */}
                <Card className="mb-6 apple-fade-in">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <User className="mr-2 h-5 w-5" />
                            Profile Information
                        </CardTitle>
                        <CardDescription>Your account details and preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="text-sm font-medium text-muted-foreground">Name</div>
                            <p className="text-lg font-medium">{user?.name || "Not provided"}</p>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-muted-foreground">Email</div>
                            <p className="text-lg font-medium">{user?.email}</p>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-muted-foreground">Account Type</div>
                            <p className="text-lg font-medium">
                                {user?.emailVerified ? "Verified Account" : "Unverified Account"}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* ConfigsHub Features */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="apple-fade-in">
                        <CardHeader>
                            <CardTitle>Configuration Management</CardTitle>
                            <CardDescription>Manage your application configurations</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                Store, version, and deploy your application configurations securely.
                            </p>
                            <Button variant="outline" className="w-full">
                                <Settings className="mr-2 h-4 w-4" />
                                Manage Configs
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="apple-fade-in">
                        <CardHeader>
                            <CardTitle>Getting Started</CardTitle>
                            <CardDescription>Learn how to use ConfigsHub</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                New to ConfigsHub? Check out our documentation and tutorials.
                            </p>
                            <Button variant="outline" className="w-full">
                                View Documentation
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
