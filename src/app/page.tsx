import {
  ArrowRight,
  CheckCircle,
  Code,
  Database,
  GitBranch,
  Globe,
  Play,
  Shield,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { LandingNav } from "@/components/landing/landing-nav";
import { Button } from "@/components/ui/button";

const ratingStars = ["one", "two", "three", "four", "five"] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <LandingNav />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="relative mx-auto max-w-5xl text-center">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-full text-sm text-blue-700 dark:text-blue-300">
            <Sparkles className="w-4 h-4" />
            <span>Now supporting 10,000+ active configurations</span>
            <ArrowRight className="w-3 h-3" />
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            Ship faster with
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              smart configs
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            The modern configuration management platform that scales with your startup.
            Deploy faster, break less, and focus on building what matters.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8 py-4 h-auto min-w-[200px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Start free trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto min-w-[200px]">
              <Play className="mr-2 h-5 w-5" />
              Watch demo
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white dark:border-slate-950"></div>
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-2 border-white dark:border-slate-950"></div>
                <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full border-2 border-white dark:border-slate-950"></div>
              </div>
              <span>Trusted by 2,500+ developers</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 from 200+ reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>SOC 2 compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="py-12 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Trusted by innovative startups</p>
          <div className="flex items-center justify-center gap-12 opacity-60 grayscale">
            {['Stripe', 'Vercel', 'Supabase', 'Linear', 'Framer', 'Railway'].map((company) => (
              <div key={company} className="text-2xl font-bold text-gray-400">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section id="about" className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Stop wrestling with configuration chaos
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Your startup deserves better than scattered .env files, manual deployments,
                and configuration nightmares that slow down your team.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Configuration drift across environments</h3>
                    <p className="text-gray-600 dark:text-gray-400">Production breaks because staging had different configs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Security vulnerabilities</h3>
                    <p className="text-gray-600 dark:text-gray-400">Secrets in code repos and unencrypted config files</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Slow deployment cycles</h3>
                    <p className="text-gray-600 dark:text-gray-400">Config changes require full redeployments</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 rounded-2xl p-8 border border-red-200 dark:border-red-800">
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex items-center gap-2 text-red-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>❌ Production server down</span>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    <span className="text-red-500">Error:</span> Database connection failed
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    <span className="text-red-500">Cause:</span> DATABASE_URL mismatch
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    <span className="text-red-500">Impact:</span> 2.5k users affected
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-8 bg-gray-50 dark:bg-slate-900/50" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Built for modern startups
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to manage configurations at scale, without the enterprise complexity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Deploy in seconds</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Update configurations instantly across all environments without redeploying your app
              </p>
              <div className="text-sm text-blue-600 font-medium">↗ 10x faster deployments</div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Enterprise security</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                AES-256 encryption, role-based access, and audit logs. SOC 2 compliant from day one
              </p>
              <div className="text-sm text-green-600 font-medium">✓ Zero security incidents</div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6">
                <GitBranch className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Git-like versioning</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Full change history, branch configurations, and one-click rollbacks when things go wrong
              </p>
              <div className="text-sm text-purple-600 font-medium">↶ Instant rollbacks</div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-environment</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Manage dev, staging, and production configs separately with environment promotion
              </p>
              <div className="text-sm text-orange-600 font-medium">→ Seamless promotion</div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Team collaboration</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Approval workflows, team permissions, and real-time notifications for your entire team
              </p>
              <div className="text-sm text-cyan-600 font-medium">⚡ Real-time sync</div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mb-6">
                <Code className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Developer friendly</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                REST APIs, TypeScript SDKs, CLI tools, and integrations with your favorite tools
              </p>
              <div className="text-sm text-pink-600 font-medium">{ } API-first design</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 lg:px-8" id="pricing">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Start free, scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-full">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Perfect for side projects</p>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Up to 3 projects</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>100 configurations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>2 environments</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Basic support</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Link href="/auth/signup">
                  <Button variant="outline" className="w-full">Get started free</Button>
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-2xl p-8 shadow-sm border-2 border-blue-200 dark:border-blue-800 relative flex flex-col h-full">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most popular
                </span>
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">For growing startups</p>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Unlimited projects</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>10,000 configurations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Unlimited environments</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Team collaboration</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Advanced analytics</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Link href="/auth/signup">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Start free trial
                  </Button>
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-full">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">For scaling companies</p>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>SSO & SAML</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Advanced security</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>SLA guarantee</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Button variant="outline" className="w-full">Contact sales</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-20 px-6 lg:px-8 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Loved by developers worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what teams are saying about ConfigsHub
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {ratingStars.map((identifier) => (
                  <Star key={`alex-${identifier}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                "ConfigsHub eliminated our config drift issues overnight. We went from manual deploys to automated everything."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div>
                  <div className="font-semibold">Alex Chen</div>
                  <div className="text-sm text-gray-500">CTO, TechFlow</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {ratingStars.map((identifier) => (
                  <Star key={`sarah-${identifier}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                "The security features are enterprise-grade. We passed SOC 2 audit in record time thanks to ConfigsHub."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                  S
                </div>
                <div>
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-sm text-gray-500">DevOps Lead, SecureApp</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {ratingStars.map((identifier) => (
                  <Star key={`mike-${identifier}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                "Setup took 5 minutes. We're now managing 50+ microservices with zero config incidents."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <div>
                  <div className="font-semibold">Mike Rodriguez</div>
                  <div className="text-sm text-gray-500">Founder, DataStream</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-5xl font-bold mb-6">
            Ready to ship faster?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join thousands of developers who trust ConfigsHub to manage their configurations.
            Start your free trial today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8 py-4 h-auto min-w-[200px] bg-white text-gray-900 hover:bg-gray-100">
                Start free trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto min-w-[200px] border-white/30 text-white hover:bg-white/10">
              <Play className="mr-2 h-5 w-5" />
              Watch demo
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Database className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">ConfigsHub</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <Link href="#" className="hover:text-gray-900 dark:hover:text-white">Privacy</Link>
              <Link href="#" className="hover:text-gray-900 dark:hover:text-white">Terms</Link>
              <Link href="#" className="hover:text-gray-900 dark:hover:text-white">Support</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500">
            © 2025 ConfigsHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
