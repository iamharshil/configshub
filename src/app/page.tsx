import { ArrowRight, CheckCircle, Clock, GitBranch, Globe, Lock, Shield, Sparkles, Users, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Brand Logo */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl apple-bounce">
            <Sparkles className="w-10 h-10 text-white" />
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl apple-fade-in">
            Modern Configuration
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Management Platform
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-8 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto apple-fade-in">
            Secure, scalable configuration management for modern applications. Store, version, and deploy
            your app configs with enterprise-grade security and beautiful Apple-inspired design.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex items-center justify-center gap-6 apple-fade-in">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8 py-4 h-auto">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground apple-fade-in">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>1,000+ Developers</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 lg:px-8" id="features">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need for configuration management
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful features designed for modern development workflows
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <Card className="apple-fade-in">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Enterprise Security</CardTitle>
                <CardDescription>
                  Bank-grade encryption and security measures to protect your sensitive configuration
                  data
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="apple-fade-in">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                  <GitBranch className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Version Control</CardTitle>
                <CardDescription>
                  Track changes, rollback configurations, and maintain full audit trails for
                  compliance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="apple-fade-in">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Instant configuration deployments with global CDN and optimized delivery
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="apple-fade-in">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Multi-Environment</CardTitle>
                <CardDescription>
                  Manage configurations across development, staging, and production environments
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="apple-fade-in">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle>Access Control</CardTitle>
                <CardDescription>
                  Granular permissions and role-based access control for team collaboration
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="apple-fade-in">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-cyan-600" />
                </div>
                <CardTitle>Beautiful UI</CardTitle>
                <CardDescription>
                  Apple-inspired design with liquid glass effects and smooth animations
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
            Why developers choose ConfigsHub
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="flex items-start gap-4 text-left">
              <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Reduce Configuration Errors</h3>
                <p className="text-muted-foreground">
                  Eliminate human errors with automated validation and deployment pipelines
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-left">
              <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Faster Development Cycles</h3>
                <p className="text-muted-foreground">
                  Deploy configuration changes instantly without code deployments
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-left">
              <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Enhanced Security</h3>
                <p className="text-muted-foreground">
                  Keep sensitive data encrypted and access-controlled at all times
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-left">
              <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Better Collaboration</h3>
                <p className="text-muted-foreground">
                  Team-friendly workflows with approval processes and change tracking
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to modernize your configuration management?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of developers who trust ConfigsHub for their application configurations
          </p>
          <div className="mt-8">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8 py-4 h-auto">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
