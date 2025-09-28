import {
	ArrowRight,
	CheckCircle,
	Code,
	Database,
	GitBranch,
	Globe,
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
			<section className="relative pt-24 pb-16 px-4 sm:pt-32 sm:pb-20 sm:px-6 lg:px-8 overflow-hidden">
				{/* Background Grid */}
				<div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

				{/* Gradient Orbs */}
				<div className="absolute top-0 -left-4 w-48 h-48 sm:w-72 sm:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
				<div className="absolute top-0 -right-4 w-48 h-48 sm:w-72 sm:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
				<div className="absolute -bottom-8 left-20 w-48 h-48 sm:w-72 sm:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

				<div className="relative mx-auto max-w-5xl text-center">
					{/* Announcement Badge */}
					<div className="inline-flex items-center gap-2 px-3 py-2 mb-6 sm:px-4 sm:mb-8 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-full text-xs sm:text-sm text-blue-700 dark:text-blue-300">
						<Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
						<span className="hidden xs:inline">Now supporting 10,000+ active configurations</span>
						<span className="xs:hidden">10,000+ active configs</span>
						<ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
					</div>

					{/* Main Headline */}
					<h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 sm:mb-6 relative">
						Ship faster with
						<span className="block relative text-bloom-bg z-10">
							<div className="absolute -inset-3 sm:-inset-5 z-0">
								<div className="absolute top-1/4 left-1/4 w-1/3 h-1/2 bg-blue-400/30 dark:bg-blue-600/30 rounded-full blur-2xl animate-[color-blossom-1_7s_ease-in-out_infinite]"></div>
								<div className="absolute top-1/3 right-1/4 w-1/2 h-2/3 bg-purple-400/30 dark:bg-purple-600/30 rounded-full blur-2xl animate-[color-blossom-2_9s_ease-in-out_infinite_1s]"></div>
								<div className="absolute bottom-1/4 left-1/3 w-1/2 h-1/2 bg-teal-400/30 dark:bg-teal-600/30 rounded-full blur-2xl animate-[color-blossom-3_8s_ease-in-out_infinite_2s]"></div>
							</div>
							<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent pb-3 relative z-10">
								Configs Hub
							</span>
						</span>
					</h1>

					{/* Subheadline */}
					<p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2">
						The modern configuration management platform that scales with your startup. Deploy faster, break
						less, and focus on building what matters.
					</p>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4">
						<Link href="/auth/signup" className="w-full sm:w-auto">
							<Button
								size="lg"
								className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto w-full sm:min-w-[200px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
							>
								Get started
								<ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
							</Button>
						</Link>
					</div>					{/* Social Proof */}
					<div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-4">
						<div className="flex items-center gap-2">
							<div className="flex -space-x-2">
								<div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white dark:border-slate-950"></div>
								<div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-2 border-white dark:border-slate-950"></div>
								<div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full border-2 border-white dark:border-slate-950"></div>
							</div>
							<span className="whitespace-nowrap">Trusted by 2,500+ developers</span>
						</div>
						<div className="flex items-center gap-2">
							<Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
							<span className="whitespace-nowrap">4.9/5 from 200+ reviews</span>
						</div>
						<div className="flex items-center gap-2">
							<Shield className="h-3 w-3 sm:h-4 sm:w-4" />
							<span className="whitespace-nowrap">SOC 2 compliant</span>
						</div>
					</div>
				</div>
			</section>

			{/* About (Project) Section */}
			<section className="py-20 px-4 sm:py-24 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900/50 dark:via-blue-950/20 dark:to-purple-950/20" id="about-project">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="text-center mb-16 sm:mb-20">
						<div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-blue-100/80 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full text-sm text-blue-700 dark:text-blue-300">
							<Sparkles className="w-4 h-4" />
							Built for the future
						</div>
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent pb-3">
							Meet ConfigsHub
						</h2>
						<p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
							Where cutting-edge technology meets intuitive design. Born from the need for better configuration management,
							crafted with the latest tools and an obsession for developer experience.
						</p>
					</div>

					{/* Stats */}
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
						<div className="text-center">
							<div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">99.9%</div>
							<div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Uptime SLA</div>
						</div>
						<div className="text-center">
							<div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">&lt;100ms</div>
							<div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">API Response</div>
						</div>
						<div className="text-center">
							<div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">2.5k+</div>
							<div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Developers</div>
						</div>
						<div className="text-center">
							<div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">10k+</div>
							<div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Configurations</div>
						</div>
					</div>

					{/* Mission Statement */}
					<div className="liquid-glass rounded-3xl p-8 sm:p-12 mb-16 sm:mb-20">
						<div className="max-w-4xl mx-auto text-center">
							<h3 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-900 dark:text-white">Our Mission</h3>
							<p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
								To eliminate configuration chaos and empower developers to ship faster with confidence.
								We believe configuration management should be as elegant and reliable as the applications it powers.
							</p>
							<div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
								<span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">Zero Downtime</span>
								<span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">Enterprise Security</span>
								<span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">Developer First</span>
							</div>
						</div>
					</div>

					{/* Technology Stack */}
					{/* <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
						<div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
							<div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
								<Code className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
							</div>
							<h3 className="text-xl sm:text-2xl font-bold mb-3 text-slate-900 dark:text-white">Next.js 15</h3>
							<p className="text-gray-600 dark:text-gray-300 mb-4">Built on the latest React 19 with App Router, server components, and Turbopack for lightning-fast development.</p>
							<div className="text-sm text-blue-600 dark:text-blue-400 font-medium">→ Bleeding edge performance</div>
						</div>

						<div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
							<div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
								<Shield className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
							</div>
							<h3 className="text-xl sm:text-2xl font-bold mb-3 text-slate-900 dark:text-white">Better Auth</h3>
							<p className="text-gray-600 dark:text-gray-300 mb-4">Modern authentication without the complexity. Session-based security with middleware protection.</p>
							<div className="text-sm text-green-600 dark:text-green-400 font-medium">→ Simple yet secure</div>
						</div>

						<div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
							<div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
								<Database className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
							</div>
							<h3 className="text-xl sm:text-2xl font-bold mb-3 text-slate-900 dark:text-white">MongoDB</h3>
							<p className="text-gray-600 dark:text-gray-300 mb-4">Direct driver integration for maximum performance. No ORM overhead, just pure speed and flexibility.</p>
							<div className="text-sm text-purple-600 dark:text-purple-400 font-medium">→ Database optimized</div>
						</div>

						<div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
							<div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
								<Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
							</div>
							<h3 className="text-xl sm:text-2xl font-bold mb-3 text-slate-900 dark:text-white">Design System</h3>
							<p className="text-gray-600 dark:text-gray-300 mb-4">Apple-inspired UI with shadcn/ui, Radix primitives, and glass morphism effects that feel magical.</p>
							<div className="text-sm text-pink-600 dark:text-pink-400 font-medium">→ Beautifully crafted</div>
						</div>

						<div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
							<div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
								<Globe className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
							</div>
							<h3 className="text-xl sm:text-2xl font-bold mb-3 text-slate-900 dark:text-white">Tailwind v4</h3>
							<p className="text-gray-600 dark:text-gray-300 mb-4">Next-generation CSS with advanced features, custom variants, and seamless dark mode support.</p>
							<div className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">→ Future of styling</div>
						</div>

						<div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
							<div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
								<Zap className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
							</div>
							<h3 className="text-xl sm:text-2xl font-bold mb-3 text-slate-900 dark:text-white">Developer Experience</h3>
							<p className="text-gray-600 dark:text-gray-300 mb-4">Turbopack + Bun runtime, Biome for lightning-fast linting, and TypeScript for rock-solid development.</p>
							<div className="text-sm text-orange-600 dark:text-orange-400 font-medium">→ Built for speed</div>
						</div>
					</div> */}

					{/* CTA */}
					{/* <div className="text-center mt-16 sm:mt-20">
						<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
							<Link href="#features">
								<Button size="lg" className="px-8 py-4 h-auto text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
									Explore Features
									<ArrowRight className="ml-2 h-5 w-5" />
								</Button>
							</Link>
							<Link href="https://github.com/iamharshil/configshub" target="_blank" rel="noopener noreferrer">
								<Button variant="outline" size="lg" className="px-8 py-4 h-auto text-lg border-2">
									<Code className="mr-2 h-5 w-5" />
									View Source
								</Button>
							</Link>
						</div>
					</div> */}
				</div>
			</section>


			{/* Tech Stack Showcase */}
			{/* <section className="py-12 sm:py-16 relative overflow-hidden bg-gradient-to-r from-blue-50 via-slate-50 to-purple-50 dark:from-blue-950/40 dark:via-slate-950/60 dark:to-purple-950/40">
				<div className="absolute inset-0 opacity-10">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(120,119,198,0.3)_0%,rgba(0,0,0,0)_70%)]"></div>
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(78,152,237,0.3)_0%,rgba(0,0,0,0)_70%)]"></div>
				</div>

				<div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
					<div className="flex flex-col items-center mb-10 sm:mb-12">
						<div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-blue-100/80 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full text-sm text-blue-700 dark:text-blue-300">
							<span className="font-mono text-xs">import * from</span>
						</div>
						<h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-white mb-2">Powered by the best</h2>
						<p className="text-center text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
							Built with modern technologies trusted by the world's most innovative companies
						</p>
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center justify-items-center gap-8 sm:gap-10">
						{["Stripe", "Vercel", "Supabase", "Linear", "Framer", "Railway"].map((company) => (
							<div
								key={company}
								className="liquid-glass p-4 sm:p-5 rounded-xl w-full flex items-center justify-center aspect-[3/2]"
							>
								<div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-500 to-slate-700 dark:from-slate-300 dark:to-slate-100 bg-clip-text text-transparent">
									{company}
								</div>
							</div>
						))}
					</div>
				</div>
			</section> */}

			{/* Problem/Solution Section */}
			<section className="py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
				<div className="max-w-6xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
						<div>
							<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Stop wrestling with configuration chaos</h2>
							<p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
								Your startup deserves better than scattered .env files, manual deployments, and
								configuration nightmares that slow down your team.
							</p>
							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mt-0.5">
										<div className="w-2 h-2 bg-red-500 rounded-full"></div>
									</div>
									<div>
										<h3 className="font-semibold mb-1">Configuration drift across environments</h3>
										<p className="text-gray-600 dark:text-gray-400">
											Production breaks because staging had different configs
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mt-0.5">
										<div className="w-2 h-2 bg-red-500 rounded-full"></div>
									</div>
									<div>
										<h3 className="font-semibold mb-1">Security vulnerabilities</h3>
										<p className="text-gray-600 dark:text-gray-400">
											Secrets in code repos and unencrypted config files
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mt-0.5">
										<div className="w-2 h-2 bg-red-500 rounded-full"></div>
									</div>
									<div>
										<h3 className="font-semibold mb-1">Slow deployment cycles</h3>
										<p className="text-gray-600 dark:text-gray-400">
											Config changes require full redeployments
										</p>
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
			<section className="py-16 px-4 sm:py-20 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-900/50" id="features">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-12 sm:mb-16">
						<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Built for modern startups</h2>
						<p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
							Everything you need to manage configurations at scale, without the enterprise complexity
						</p>
					</div>

					<div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
						<div className="liquid-glass rounded-2xl p-6 sm:p-8">
							<div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
								<Zap className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
							</div>
							<h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Deploy in seconds</h3>
							<p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
								Update configurations instantly across all environments without redeploying your app
							</p>
							<div className="text-xs sm:text-sm text-blue-600 font-medium">↗ 10x faster deployments</div>
						</div>

						<div className="liquid-glass rounded-2xl p-6 sm:p-8">
							<div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
								<Shield className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
							</div>
							<h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Enterprise security</h3>
							<p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
								AES-256 encryption, role-based access, and audit logs. SOC 2 compliant from day one
							</p>
							<div className="text-xs sm:text-sm text-green-600 font-medium">✓ Zero security incidents</div>
						</div>

						<div className="liquid-glass rounded-2xl p-6 sm:p-8">
							<div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
								<GitBranch className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
							</div>
							<h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Git-like versioning</h3>
							<p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
								Full change history, branch configurations, and one-click rollbacks when things go wrong
							</p>
							<div className="text-xs sm:text-sm text-purple-600 font-medium">↶ Instant rollbacks</div>
						</div>

						<div className="liquid-glass rounded-2xl p-6 sm:p-8">
							<div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
								<Globe className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
							</div>
							<h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Multi-environment</h3>
							<p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
								Manage dev, staging, and production configs separately with environment promotion
							</p>
							<div className="text-xs sm:text-sm text-orange-600 font-medium">→ Seamless promotion</div>
						</div>

						<div className="liquid-glass rounded-2xl p-6 sm:p-8">
							<div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
								<Users className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-600" />
							</div>
							<h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Team collaboration</h3>
							<p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
								Approval workflows, team permissions, and real-time notifications for your entire team
							</p>
							<div className="text-xs sm:text-sm text-cyan-600 font-medium">⚡ Real-time sync</div>
						</div>

						<div className="liquid-glass rounded-2xl p-6 sm:p-8">
							<div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
								<Code className="h-5 w-5 sm:h-6 sm:w-6 text-pink-600" />
							</div>
							<h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Developer friendly</h3>
							<p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
								REST APIs, TypeScript SDKs, CLI tools, and integrations with your favorite tools
							</p>
							<div className="text-xs sm:text-sm text-pink-600 font-medium">API-first design</div>
						</div>
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section className="py-16 px-4 sm:py-20 sm:px-6 lg:px-8" id="pricing">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-12 sm:mb-16">
						<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Simple, transparent pricing</h2>
						<p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
							Start free, scale as you grow. No hidden fees, no surprises.
						</p>
					</div>

					<div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
						{/* Free Plan */}
						<div className="liquid-glass rounded-2xl p-6 sm:p-8 flex flex-col h-full">
							<div className="mb-6 sm:mb-8">
								<h3 className="text-xl sm:text-2xl font-bold mb-2">Starter</h3>
								<div className="flex items-baseline gap-1">
									<span className="text-3xl sm:text-4xl font-bold">$0</span>
									<span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">/month</span>
								</div>
								<p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">Perfect for side projects</p>
							</div>
							<ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
								<li className="flex items-center gap-2 sm:gap-3">
									<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
									<span className="text-sm sm:text-base">Up to 3 projects</span>
								</li>
								<li className="flex items-center gap-2 sm:gap-3">
									<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
									<span className="text-sm sm:text-base">100 configurations</span>
								</li>
								<li className="flex items-center gap-2 sm:gap-3">
									<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
									<span className="text-sm sm:text-base">2 environments</span>
								</li>
								<li className="flex items-center gap-2 sm:gap-3">
									<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
									<span className="text-sm sm:text-base">Basic support</span>
								</li>
							</ul>
							<div className="mt-auto">
								<Link href="/auth/signup">
									<Button variant="outline" className="w-full">
										Get started free
									</Button>
								</Link>
							</div>
						</div>

						{/* Pro Plan */}
						<div className="liquid-glass rounded-2xl p-6 sm:p-8 relative flex flex-col h-full">
							<div className="mb-6 sm:mb-8">
								<div className="flex items-center justify-between mb-2">
									<h3 className="text-xl sm:text-2xl font-bold">Pro</h3>
									<div className="inline-block overflow-hidden rounded-full">
										<span className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow-sm block">
											Most popular
										</span>
									</div>
								</div>
								<div className="flex items-baseline gap-1">
									<span className="text-3xl sm:text-4xl font-bold">$10</span>
									<span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">/month</span>
								</div>
								<p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">For growing startups</p>
							</div>
							<ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
								<li className="flex items-center gap-2 sm:gap-3">
									<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
									<span className="text-sm sm:text-base">Unlimited projects</span>
								</li>
								<li className="flex items-center gap-2 sm:gap-3">
									<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
									<span className="text-sm sm:text-base">10,000 configurations</span>
								</li>
								<li className="flex items-center gap-2 sm:gap-3">
									<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
									<span className="text-sm sm:text-base">Unlimited environments</span>
								</li>
								<li className="flex items-center gap-2 sm:gap-3">
									<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
									<span className="text-sm sm:text-base">Team collaboration</span>
								</li>
								<li className="flex items-center gap-2 sm:gap-3">
									<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
									<span className="text-sm sm:text-base">Priority support</span>
								</li>
								<li className="flex items-center gap-2 sm:gap-3">
									<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
									<span className="text-sm sm:text-base">Advanced analytics</span>
								</li>
							</ul>
							<div className="mt-auto">
								<Link href="/auth/signup">
									<Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
										Get started free
									</Button>
								</Link>
							</div>
						</div>

						{/* Support/Donate Card */}
						<div className="liquid-glass rounded-2xl p-6 sm:p-8 flex flex-col h-full relative">
							<div className="mb-6 sm:mb-8">
								<div className="flex items-center justify-between mb-2">
									<h3 className="text-xl sm:text-2xl font-bold">Buy me a coffee</h3>
									<div className="inline-block overflow-hidden rounded-full">
										<span className="bg-gradient-to-r from-yellow-500/90 to-orange-500/90 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow-sm block">
											Support us
										</span>
									</div>
								</div>
								<div className="flex items-center gap-3 mt-2">
									<div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
										<span className="text-2xl">☕</span>
									</div>
									<p className="text-gray-600 dark:text-gray-300">Support the development of ConfigsHub</p>
								</div>
							</div>

							<div className="space-y-4 mb-6 sm:mb-8 flex-grow">
								<p className="text-gray-600 dark:text-gray-300">
									ConfigsHub is built with ❤️ by developers just like you. Your support helps us:
								</p>

								<ul className="space-y-3">
									<li className="flex items-center gap-2 sm:gap-3">
										<Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
										<span className="text-sm sm:text-base">Keep ConfigsHub free for small teams</span>
									</li>
									<li className="flex items-center gap-2 sm:gap-3">
										<Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
										<span className="text-sm sm:text-base">Add new features and improvements</span>
									</li>
									<li className="flex items-center gap-2 sm:gap-3">
										<Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
										<span className="text-sm sm:text-base">Build more open-source tools</span>
									</li>
								</ul>
							</div>

							<div className="mt-auto">
								<a href="https://www.buymeacoffee.com" target="_blank" rel="noopener noreferrer">
									<Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
										Buy me a coffee
									</Button>
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* About Us Section */}
			<section className="py-16 px-4 sm:py-20 sm:px-6 lg:px-8" id="about">
				<div className="max-w-6xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
						{/* Left Content */}
						<div>
							<div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-purple-100/80 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-full text-sm text-purple-700 dark:text-purple-300">
								<Users className="w-4 h-4" />
								Built by developers, for developers
							</div>
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
								Why developers choose ConfigsHub
							</h2>
							<p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
								We understand the pain of managing configurations across multiple environments.
								That's why we built ConfigsHub to be the configuration management platform we always wished we had.
							</p>

							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
										<Zap className="w-4 h-4 text-blue-600" />
									</div>
									<div>
										<h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Lightning Fast Setup</h3>
										<p className="text-gray-600 dark:text-gray-300">
											Get started in under 5 minutes. Import your existing configs, set up environments, and you're ready to deploy.
										</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
										<Shield className="w-4 h-4 text-green-600" />
									</div>
									<div>
										<h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Security First</h3>
										<p className="text-gray-600 dark:text-gray-300">
											Your secrets are encrypted at rest and in transit. Role-based access controls ensure only the right people see sensitive data.
										</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
										<GitBranch className="w-4 h-4 text-purple-600" />
									</div>
									<div>
										<h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Version Control</h3>
										<p className="text-gray-600 dark:text-gray-300">
											Every change is tracked. Roll back to any previous version instantly when something goes wrong.
										</p>
									</div>
								</div>
							</div>

							<div className="mt-8">
								<Link href="/auth/signup">
									<Button size="lg" className="px-8 py-4 h-auto text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
										Try ConfigsHub free
										<ArrowRight className="ml-2 h-5 w-5" />
									</Button>
								</Link>
							</div>
						</div>

						{/* Right Content */}
						<div className="relative">
							<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-3xl p-8 sm:p-10 border border-blue-200/50 dark:border-blue-800/50">
								<div className="mb-8">
									<h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Our Story</h3>
									<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
										ConfigsHub was born from frustration. After countless late-night debugging sessions caused by configuration mismatches,
										we knew there had to be a better way.
									</p>
									<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
										Today, we're proud to serve thousands of developers who trust us with their most critical configurations.
										From solo developers to enterprise teams, ConfigsHub scales with your needs.
									</p>
								</div>

								<div className="grid grid-cols-2 gap-6">
									<div className="text-center">
										<div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">2025</div>
										<div className="text-sm text-gray-600 dark:text-gray-400">Founded</div>
									</div>
									<div className="text-center">
										<div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">2.5k+</div>
										<div className="text-sm text-gray-600 dark:text-gray-400">Happy Users</div>
									</div>
									<div className="text-center">
										<div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">10k+</div>
										<div className="text-sm text-gray-600 dark:text-gray-400">Configurations</div>
									</div>
									<div className="text-center">
										<div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">99.9%</div>
										<div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
									</div>
								</div>
							</div>

							{/* Decorative elements */}
							<div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
							<div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
						</div>
					</div>

					{/* Trust Indicators */}
					{/* <div className="mt-16 sm:mt-20 text-center">
						<p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-8">Trusted by teams at</p>
						<div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60">
							{["Stripe", "Vercel", "Supabase", "Linear", "Framer", "Railway"].map((company) => (
								<div key={company} className="text-lg sm:text-xl font-bold text-gray-400">
									{company}
								</div>
							))}
						</div>
					</div> */}
				</div>
			</section>

			{/* Social Proof / Testimonials */}
			<section className="py-16 px-4 sm:py-20 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-900/50">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-12 sm:mb-16">
						<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Loved by developers worldwide</h2>
						<p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
							See what teams are saying about ConfigsHub
						</p>
					</div>

					<div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
						<div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow border border-white/20 dark:border-slate-700/50">
							<div className="flex items-center gap-1 mb-3 sm:mb-4">
								{ratingStars.map((identifier) => (
									<Star
										key={`alex-${identifier}`}
										className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
									/>
								))}
							</div>
							<p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
								"ConfigsHub eliminated our config drift issues overnight. We went from manual deploys to
								automated everything."
							</p>
							<div className="flex items-center gap-2 sm:gap-3">
								<div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
									A
								</div>
								<div>
									<div className="font-semibold text-sm sm:text-base">Alex Chen</div>
									<div className="text-xs sm:text-sm text-gray-500">CTO, TechFlow</div>
								</div>
							</div>
						</div>

						<div className="liquid-glass rounded-2xl p-6 sm:p-8">
							<div className="flex items-center gap-1 mb-3 sm:mb-4">
								{ratingStars.map((identifier) => (
									<Star
										key={`sarah-${identifier}`}
										className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
									/>
								))}
							</div>
							<p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
								"The security features are enterprise-grade. We passed SOC 2 audit in record time thanks
								to ConfigsHub."
							</p>
							<div className="flex items-center gap-2 sm:gap-3">
								<div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
									S
								</div>
								<div>
									<div className="font-semibold text-sm sm:text-base">Sarah Johnson</div>
									<div className="text-xs sm:text-sm text-gray-500">DevOps Lead, SecureApp</div>
								</div>
							</div>
						</div>

						<div className="liquid-glass rounded-2xl p-6 sm:p-8">
							<div className="flex items-center gap-1 mb-3 sm:mb-4">
								{ratingStars.map((identifier) => (
									<Star
										key={`mike-${identifier}`}
										className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
									/>
								))}
							</div>
							<p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
								"Setup took 5 minutes. We're now managing 50+ microservices with zero config incidents."
							</p>
							<div className="flex items-center gap-2 sm:gap-3">
								<div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
									M
								</div>
								<div>
									<div className="font-semibold text-sm sm:text-base">Mike Rodriguez</div>
									<div className="text-xs sm:text-sm text-gray-500">Founder, DataStream</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Final CTA Section */}
			<section className="py-16 px-4 sm:py-20 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
				<div className="absolute inset-0 opacity-20">
					<div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-3xl"></div>
					<div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-white/5 rounded-full blur-3xl"></div>
				</div>

				<div className="max-w-4xl mx-auto text-center relative">
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Transform your config chaos</h2>
					<p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-12 max-w-2xl mx-auto">
						Stop fighting configuration drift and security vulnerabilities. Join the developers who've already
						eliminated config chaos with ConfigsHub.
					</p>

					<div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
						<Link href="/auth/signup" className="w-full sm:w-auto">
							<Button
								size="lg"
								className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto w-full sm:min-w-[200px] bg-white text-gray-900 hover:bg-gray-100"
							>
								Start transforming today
								<ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
							</Button>
						</Link>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
						<div className="text-center">
							<div className="text-2xl sm:text-3xl font-bold text-blue-200 mb-2">5 min</div>
							<div className="text-sm text-blue-300">Setup time</div>
						</div>
						<div className="text-center">
							<div className="text-2xl sm:text-3xl font-bold text-green-200 mb-2">Zero</div>
							<div className="text-sm text-blue-300">Security incidents</div>
						</div>
						<div className="text-center">
							<div className="text-2xl sm:text-3xl font-bold text-purple-200 mb-2">10x</div>
							<div className="text-sm text-blue-300">Faster deploys</div>
						</div>
					</div>

					{/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm text-blue-200">
						<div className="flex items-center gap-2">
							<CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
							<span>Built for startups</span>
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
							<span>Scales with your growth</span>
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
							<span>Ship with confidence</span>
						</div>
					</div> */}
				</div>
			</section>			{/* Footer */}
			<footer className="py-12 px-4 sm:py-16 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-gray-800">
				<div className="max-w-6xl mx-auto">
					<div className="grid gap-8 sm:gap-10 lg:grid-cols-4">
						<div>
							<div className="flex items-center gap-3 mb-4">
								<div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
									<Database className="w-4 h-4 text-white" />
								</div>
								<span className="text-xl font-bold">ConfigsHub</span>
							</div>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
								Config management that scales with you. Secure, fast, and developer-friendly.
							</p>
							<div className="flex items-center gap-4 text-gray-500">
								<Link href="#" aria-label="Twitter" className="hover:text-gray-900 dark:hover:text-white">𝕏</Link>
								<Link href="#" aria-label="GitHub" className="hover:text-gray-900 dark:hover:text-white">GH</Link>
								<Link href="#" aria-label="Discord" className="hover:text-gray-900 dark:hover:text-white">💬</Link>
							</div>
						</div>

						<div>
							<h4 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">Product</h4>
							<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
								<li><Link href="#features" className="hover:text-gray-900 dark:hover:text-white">Features</Link></li>
								<li><Link href="#pricing" className="hover:text-gray-900 dark:hover:text-white">Pricing</Link></li>
								<li><Link href="#about-project" className="hover:text-gray-900 dark:hover:text-white">About</Link></li>
								<li><Link href="#" className="hover:text-gray-900 dark:hover:text-white">Changelog</Link></li>
							</ul>
						</div>

						<div>
							<h4 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">Resources</h4>
							<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
								<li><Link href="#" className="hover:text-gray-900 dark:hover:text-white">Docs</Link></li>
								<li><Link href="#" className="hover:text-gray-900 dark:hover:text-white">Guides</Link></li>
								<li><Link href="#" className="hover:text-gray-900 dark:hover:text-white">Status</Link></li>
								<li><Link href="#" className="hover:text-gray-900 dark:hover:text-white">Support</Link></li>
							</ul>
						</div>

						<div>
							<h4 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">Company</h4>
							<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
								<li><Link href="#about-project" className="hover:text-gray-900 dark:hover:text-white">About</Link></li>
								<li><Link href="#" className="hover:text-gray-900 dark:hover:text-white">Blog</Link></li>
								<li><Link href="#" className="hover:text-gray-900 dark:hover:text-white">Careers</Link></li>
								<li><Link href="#" className="hover:text-gray-900 dark:hover:text-white">Contact</Link></li>
							</ul>
						</div>
					</div>

					<div className="mt-10 pt-6 sm:mt-12 sm:pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-500">
						<div>© 2025 ConfigsHub. All rights reserved.</div>
						<div className="flex items-center gap-4">
							<Link href="#" className="hover:text-gray-900 dark:hover:text-white">Privacy</Link>
							<Link href="#" className="hover:text-gray-900 dark:hover:text-white">Terms</Link>
							<Link href="#" className="hover:text-gray-900 dark:hover:text-white">Security</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
