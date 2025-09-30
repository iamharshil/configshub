"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Code, Database, Globe, Rocket, Shield, Star, Users, Zap } from "lucide-react";
import Link from "next/link";
import { staggerContainer, staggerItem } from "@/components/common/page-transition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gradient-modern relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
			<div className="absolute inset-0 bg-gradient-animated opacity-10"></div>

			{/* Floating Orbs */}
			<div className="absolute top-0 -left-4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
			<div className="absolute top-0 -right-4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
			<div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float animation-delay-4000"></div>

			{/* Navigation */}
			<nav className="glass-nav relative z-50 pt-4">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center gap-3">
							<div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-primary shadow-modern">
								<Database className="h-4 w-4 text-white" />
							</div>
							<span className="text-lg font-bold gradient-text">ConfigsHub</span>
						</div>

						<div className="hidden md:flex items-center gap-8">
							<Link href="#features" className="text-sm font-medium hover-glow transition-all">
								Features
							</Link>
							<Link href="#pricing" className="text-sm font-medium hover-glow transition-all">
								Pricing
							</Link>
							<Link href="#about" className="text-sm font-medium hover-glow transition-all">
								About
							</Link>
						</div>

						<div className="flex items-center gap-3">
							<Link href="/auth/signin">
								<Button variant="ghost" className="btn-glass">
									Sign In
								</Button>
							</Link>
							<Link href="/auth/signup">
								<Button className="btn-primary">
									Get Started
									<ArrowRight className="h-4 w-4 ml-2" />
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="relative z-10 pt-24 pb-32">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<motion.div
						className="text-center"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
					>
						<div className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass-badge rounded-full text-sm text-primary font-medium">
							<Rocket className="h-4 w-4" />
							<span>The Future of Configuration Management</span>
						</div>

						<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text mb-8 leading-tight">
							Manage Configs
							<br />
							<span className="text-primary">Like a Pro</span>
						</h1>

						<p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
							Store, organize, and sync your configuration files across devices with enterprise-grade
							security. From dotfiles to deployment configs, we've got you covered.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
							<Link href="/auth/signup">
								<Button className="btn-primary px-8 py-4 text-lg">
									Start Free Trial
									<ArrowRight className="h-5 w-5 ml-2" />
								</Button>
							</Link>
							<Link href="#demo">
								<Button variant="outline" className="btn-glass px-8 py-4 text-lg">
									Watch Demo
									<Star className="h-5 w-5 ml-2" />
								</Button>
							</Link>
						</div>

						{/* Social Proof */}
						<div className="flex flex-col items-center gap-4 opacity-70">
							<p className="text-sm text-gray-500">Trusted by developers worldwide</p>
							<div className="flex items-center gap-8">
								<div className="flex items-center gap-2">
									<Users className="h-4 w-4 text-primary" />
									<span className="text-sm font-medium">10K+ Users</span>
								</div>
								<div className="flex items-center gap-2">
									<Database className="h-4 w-4 text-success" />
									<span className="text-sm font-medium">1M+ Configs</span>
								</div>
								<div className="flex items-center gap-2">
									<Shield className="h-4 w-4 text-warning" />
									<span className="text-sm font-medium">Enterprise Ready</span>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="relative z-10 py-24">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
							Everything you need to manage configs
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
							From simple dotfiles to complex deployment configurations, ConfigsHub provides the tools
							you need.
						</p>
					</div>

					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
						variants={staggerContainer}
						initial="initial"
						whileInView="animate"
						viewport={{ once: true, margin: "-100px" }}
					>
						{/* Feature Cards */}
						<motion.div variants={staggerItem}>
							<Card className="card-modern group">
								<CardHeader>
									<div className="icon-container bg-primary/10 text-primary mb-4">
										<Database className="h-6 w-6" />
									</div>
									<CardTitle className="gradient-text">Centralized Storage</CardTitle>
									<CardDescription>
										Store all your configuration files in one secure, accessible location with
										version control.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
										<li className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4 text-success" />
											<span>Git-based versioning</span>
										</li>
										<li className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4 text-success" />
											<span>Unlimited repositories</span>
										</li>
										<li className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4 text-success" />
											<span>Advanced search</span>
										</li>
									</ul>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div variants={staggerItem}>
							<Card className="card-modern group">
								<CardHeader>
									<div className="icon-container bg-success/10 text-success mb-4">
										<Zap className="h-6 w-6" />
									</div>
									<CardTitle className="gradient-text">Instant Sync</CardTitle>
									<CardDescription>
										Sync configurations across all your devices with our powerful CLI and API.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
										<li className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4 text-success" />
											<span>Real-time synchronization</span>
										</li>
										<li className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4 text-success" />
											<span>Cross-platform CLI</span>
										</li>
										<li className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4 text-success" />
											<span>Automated deployments</span>
										</li>
									</ul>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div variants={staggerItem}>
							<Card className="card-modern group">
								<CardHeader>
									<div className="icon-container bg-secondary/10 text-secondary mb-4">
										<Shield className="h-6 w-6" />
									</div>
									<CardTitle className="gradient-text">Enterprise Security</CardTitle>
									<CardDescription>
										Bank-level encryption and security controls to keep your configurations
										safe.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
										<li className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4 text-success" />
											<span>End-to-end encryption</span>
										</li>
										<li className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4 text-success" />
											<span>Role-based access</span>
										</li>
										<li className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4 text-success" />
											<span>Audit logs</span>
										</li>
									</ul>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div variants={staggerItem}>
							<Card className="card-modern group">
								<CardHeader>
									<div className="icon-container bg-warning/10 text-warning mb-4">
										<Users className="h-6 w-6" />
									</div>
									<CardTitle className="gradient-text">Team Collaboration</CardTitle>
									<CardDescription>
										Share configurations with your team and manage permissions with ease.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
										<li className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4 text-success" />
											<span>Team workspaces</span>
										</li>
										<li className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4 text-success" />
											<span>Permission management</span>
										</li>
										<li className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4 text-success" />
											<span>Activity tracking</span>
										</li>
									</ul>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div variants={staggerItem}>
							<Card className="card-modern group">
								<CardHeader>
									<div className="icon-container bg-accent/10 text-accent mb-4">
										<Globe className="h-6 w-6" />
									</div>
									<CardTitle className="gradient-text">Global CDN</CardTitle>
									<CardDescription>
										Lightning-fast access to your configurations from anywhere in the world.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
										<li className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4 text-success" />
											<span>99.9% uptime SLA</span>
										</li>
										<li className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4 text-success" />
											<span>Edge caching</span>
										</li>
										<li className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4 text-success" />
											<span>Global distribution</span>
										</li>
									</ul>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div variants={staggerItem}>
							<Card className="card-modern group">
								<CardHeader>
									<div className="icon-container bg-primary/10 text-primary mb-4">
										<Code className="h-6 w-6" />
									</div>
									<CardTitle className="gradient-text">Developer Tools</CardTitle>
									<CardDescription>
										Powerful APIs and integrations for seamless development workflows.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
										<li className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4 text-success" />
											<span>REST & GraphQL APIs</span>
										</li>
										<li className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4 text-success" />
											<span>Webhook support</span>
										</li>
										<li className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4 text-success" />
											<span>CI/CD integrations</span>
										</li>
									</ul>
								</CardContent>
							</Card>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="relative z-10 py-24">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="glass-card rounded-3xl p-12 text-center relative overflow-hidden">
						<div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-secondary/5"></div>
						<div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-float"></div>
						<div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-secondary/10 blur-3xl animate-float animation-delay-4000"></div>

						<div className="relative z-10">
							<h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
								Ready to revolutionize your config management?
							</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
								Join thousands of developers who trust ConfigsHub for their configuration needs.
							</p>

							<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
								<Link href="/auth/signup">
									<Button className="btn-primary px-8 py-4 text-lg">
										Start Your Free Trial
										<ArrowRight className="h-5 w-5 ml-2" />
									</Button>
								</Link>
								<Link href="/auth/signin">
									<Button variant="outline" className="btn-glass px-8 py-4 text-lg">
										Sign In
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="relative z-10 border-t border-gray-200/50 dark:border-gray-700/50">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-primary shadow-modern">
								<Database className="h-4 w-4 text-white" />
							</div>
							<span className="text-lg font-bold gradient-text">ConfigsHub</span>
						</div>

						<div className="text-sm text-gray-500">© 2025 ConfigsHub. All rights reserved.</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
