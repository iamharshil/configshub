"use client";
import {
    Activity,
    BarChart3,
    Bell,
    Clock,
    Database,
    FileText,
    GitBranch,
    Globe,
    Loader2,
    LogOut,
    Plus,
    Search,
    Server,
    Settings,
    Shield,
    TrendingUp,
    User
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            {/* Modern background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-blue-950/20 dark:to-purple-950/10"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Navigation Header */}
            <header className="sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Database className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">ConfigsHub</h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Configuration Management</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="sm" className="rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800">
                                <Bell className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800">
                                <Search className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleSignOut}
                                className="rounded-xl border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-800"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto p-6">
                {/* Welcome Section */}
                {/* Main Content */}
                <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">
                                    Welcome back{user?.name ? `, ${user.name}` : ""}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-lg">
                                    Manage your configurations with ease and precision
                                </p>
                            </div>
                            <Button className="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                                <Plus className="mr-2 h-5 w-5" />
                                New Config
                            </Button>
                        </div>

                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Configs</p>
                                        <p className="text-3xl font-bold mt-1">10k+</p>
                                        <p className="text-xs text-green-600 flex items-center mt-2">
                                            <TrendingUp className="w-3 h-3 mr-1" />
                                            Active & Growing
                                        </p>
                                    </div>
                                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <FileText className="w-7 h-7 text-white" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Environments</p>
                                        <p className="text-3xl font-bold mt-1">3</p>
                                        <p className="text-xs text-blue-600 flex items-center mt-2">
                                            <Globe className="w-3 h-3 mr-1" />
                                            Prod, Staging, Dev
                                        </p>
                                    </div>
                                    <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <Server className="w-7 h-7 text-white" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Deployments</p>
                                        <p className="text-3xl font-bold mt-1">847</p>
                                        <p className="text-xs text-purple-600 flex items-center mt-2">
                                            <Activity className="w-3 h-3 mr-1" />
                                            This month
                                        </p>
                                    </div>
                                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <GitBranch className="w-7 h-7 text-white" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Security Score</p>
                                        <p className="text-3xl font-bold mt-1">98%</p>
                                        <p className="text-xs text-green-600 flex items-center mt-2">
                                            <Shield className="w-3 h-3 mr-1" />
                                            Excellent
                                        </p>
                                    </div>
                                    <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <Shield className="w-7 h-7 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Configuration Components Display */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-800 mb-8">
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Configuration Components</h3>
                                <p className="text-gray-600 dark:text-gray-400">10,247 total configurations across all environments</p>
                            </div>
                        </div>
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Database Configs */}
                                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                            <Database className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm">Database Configs</h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">2,847 entries</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                            <span>DATABASE_URL</span>
                                            <span className="text-green-600">Active</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                            <span>DB_POOL_SIZE</span>
                                            <span className="text-green-600">Active</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                            <span>REDIS_URL</span>
                                            <span className="text-green-600">Active</span>
                                        </div>
                                        <div className="text-center py-1 text-gray-600 dark:text-gray-400">
                                            +2,844 more...
                                        </div>
                                    </div>
                                </div>

                                {/* API Configs */}
                                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                                            <Server className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm">API Configs</h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">1,923 entries</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                            <span>API_BASE_URL</span>
                                            <span className="text-green-600">Active</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                            <span>API_TIMEOUT</span>
                                            <span className="text-green-600">Active</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                            <span>RATE_LIMIT</span>
                                            <span className="text-yellow-600">Warning</span>
                                        </div>
                                        <div className="text-center py-1 text-gray-600 dark:text-gray-400">
                                            +1,920 more...
                                        </div>
                                    </div>
                                </div>

                                {/* Security Configs */}
                                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                                            <Shield className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm">Security Configs</h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">1,456 entries</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                            <span>JWT_SECRET</span>
                                            <span className="text-green-600">Encrypted</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                            <span>CORS_ORIGINS</span>
                                            <span className="text-green-600">Active</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                            <span>SSL_CERT_PATH</span>
                                            <span className="text-green-600">Active</span>
                                        </div>
                                        <div className="text-center py-1 text-gray-600 dark:text-gray-400">
                                            +1,453 more...
                                        </div>
                                    </div>
                                </div>

                                {/* Environment Configs */}
                                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                                            <Globe className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm">Environment Configs</h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">2,134 entries</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                            <span>NODE_ENV</span>
                                            <span className="text-green-600">Production</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                            <span>PORT</span>
                                            <span className="text-green-600">Active</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                            <span>DEBUG_MODE</span>
                                            <span className="text-red-600">Disabled</span>
                                        </div>
                                        <div className="text-center py-1 text-gray-600 dark:text-gray-400">
                                            +2,131 more...
                                        </div>
                                    </div>
                                </div>

                                {/* Feature Flags */}
                                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                                            <Settings className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm">Feature Flags</h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">987 entries</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                            <span>NEW_DASHBOARD</span>
                                            <span className="text-green-600">Enabled</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                            <span>BETA_FEATURES</span>
                                            <span className="text-green-600">Enabled</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                            <span>A_B_TESTING</span>
                                            <span className="text-yellow-600">Testing</span>
                                        </div>
                                        <div className="text-center py-1 text-gray-600 dark:text-gray-400">
                                            +984 more...
                                        </div>
                                    </div>
                                </div>

                                {/* Third Party Integrations */}
                                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                            <GitBranch className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm">Integrations</h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">900 entries</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                            <span>STRIPE_KEY</span>
                                            <span className="text-green-600">Active</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                            <span>SENDGRID_API</span>
                                            <span className="text-green-600">Active</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                            <span>AWS_S3_BUCKET</span>
                                            <span className="text-green-600">Active</span>
                                        </div>
                                        <div className="text-center py-1 text-gray-600 dark:text-gray-400">
                                            +897 more...
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">9,247 Active</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">847 Warnings</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">153 Errors</span>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    <FileText className="w-4 h-4 mr-2" />
                                    View All Configs
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Quick Actions & Profile */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Quick Actions */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
                                <div className="mb-6">
                                    <div className="flex items-center mb-2">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                                            <Plus className="w-4 h-4 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold">Quick Actions</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Get started with ConfigsHub</p>
                                </div>
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Button className="h-auto p-4 justify-start" variant="outline">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                                    <Plus className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-semibold">Create Configuration</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Add your first config</p>
                                                </div>
                                            </div>
                                        </Button>

                                        <Button className="h-auto p-4 justify-start" variant="outline">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                                                    <Server className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-semibold">Setup Environment</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Configure dev/prod</p>
                                                </div>
                                            </div>
                                        </Button>

                                        <Button className="h-auto p-4 justify-start" variant="outline">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                                                    <Settings className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-semibold">API Integration</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Connect your apps</p>
                                                </div>
                                            </div>
                                        </Button>

                                        <Button className="h-auto p-4 justify-start" variant="outline">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                                                    <FileText className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-semibold">Documentation</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Learn the basics</p>
                                                </div>
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
                                <div className="mb-6">
                                    <div className="flex items-center mb-2">
                                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                                            <Activity className="w-4 h-4 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold">Recent Activity</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Your latest configuration changes</p>
                                </div>
                                <div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-slate-800">
                                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                                <User className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">Account created successfully</p>
                                                <p className="text-xs text-gray-500">Welcome to ConfigsHub!</p>
                                            </div>
                                            <div className="text-xs text-gray-500">Just now</div>
                                        </div>

                                        <div className="text-center py-8">
                                            <Clock className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                                            <p className="text-sm text-gray-600 dark:text-gray-400">No recent activity</p>
                                            <p className="text-xs text-gray-500">Your configuration changes will appear here</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Profile & Getting Started */}
                        <div className="space-y-6">
                            {/* Profile Card */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
                                <div className="mb-6">
                                    <div className="flex items-center mb-2">
                                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold">Profile</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Account information</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                            <User className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{user?.name || "User"}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Status</span>
                                            <span className={`px-2 py-1 rounded-full text-xs ${user?.emailVerified
                                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                                                }`}>
                                                {user?.emailVerified ? "Verified" : "Unverified"}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Plan</span>
                                            <span className="text-foreground">Free Tier</span>
                                        </div>
                                    </div>

                                    <Button variant="outline" className="w-full">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Account Settings
                                    </Button>
                                </div>
                            </div>

                            {/* Getting Started */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
                                <div className="mb-6">
                                    <div className="flex items-center mb-2">
                                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                                            <BarChart3 className="w-4 h-4 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold">Getting Started</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Complete your setup</p>
                                </div>
                                <div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-2 rounded-lg">
                                            <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                            </div>
                                            <span className="text-sm">Create account</span>
                                        </div>

                                        <div className="flex items-center gap-3 p-2 rounded-lg opacity-60">
                                            <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded-full"></div>
                                            <span className="text-sm text-gray-500">Add first configuration</span>
                                        </div>

                                        <div className="flex items-center gap-3 p-2 rounded-lg opacity-60">
                                            <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded-full"></div>
                                            <span className="text-sm text-gray-500">Setup environment</span>
                                        </div>

                                        <div className="flex items-center gap-3 p-2 rounded-lg opacity-60">
                                            <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded-full"></div>
                                            <span className="text-sm text-gray-500">Integrate with app</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center justify-between text-sm mb-2">
                                            <span className="text-gray-600 dark:text-gray-400">Progress</span>
                                            <span className="font-medium">25%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-1/4 transition-all duration-300"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
