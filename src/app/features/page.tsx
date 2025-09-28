import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
	title: "Features - Powerful Configuration Management Tools",
	description:
		"Discover ConfigsHub's comprehensive feature set: enterprise security, version control, multi-environment support, access control, and more. Built for modern development teams.",
	keywords: [
		"configuration features",
		"enterprise security",
		"version control",
		"multi-environment",
		"access control",
		"config management features",
		"devops features",
		"application configuration",
	],
	openGraph: {
		title: "ConfigsHub Features - Powerful Configuration Management Tools",
		description:
			"Explore the comprehensive feature set that makes ConfigsHub the leading configuration management platform for modern development teams.",
		images: ["/og-features.png"],
	},
};

const features = [
	{
		title: "Enterprise Security",
		description:
			"Bank-grade encryption, SOC 2 compliance, and advanced security measures to protect your sensitive configuration data.",
		benefits: [
			"AES-256 encryption at rest and in transit",
			"SOC 2 Type II compliance",
			"Role-based access control (RBAC)",
			"Audit logging and compliance reporting",
			"Single Sign-On (SSO) integration",
		],
	},
	{
		title: "Version Control & Rollback",
		description: "Track every configuration change with full version history and instant rollback capabilities.",
		benefits: [
			"Complete change history tracking",
			"One-click rollback to any version",
			"Diff visualization between versions",
			"Automated backup and recovery",
			"Branch-based configuration workflows",
		],
	},
	{
		title: "Multi-Environment Support",
		description:
			"Seamlessly manage configurations across development, staging, production, and custom environments.",
		benefits: [
			"Environment-specific configurations",
			"Automatic environment promotion",
			"Environment templates and inheritance",
			"Cross-environment comparison tools",
			"Environment-based access controls",
		],
	},
	{
		title: "API-First Architecture",
		description:
			"Comprehensive REST and GraphQL APIs for seamless integration with your existing development workflow.",
		benefits: [
			"RESTful and GraphQL APIs",
			"SDK support for popular languages",
			"Webhook notifications",
			"Real-time configuration updates",
			"Developer-friendly documentation",
		],
	},
	{
		title: "Team Collaboration",
		description: "Built-in collaboration tools with approval workflows, team management, and activity feeds.",
		benefits: [
			"Approval workflows for changes",
			"Team-based permissions",
			"Activity feeds and notifications",
			"Comment and review system",
			"Integration with Slack and Teams",
		],
	},
	{
		title: "Performance & Reliability",
		description: "Global CDN, 99.9% uptime SLA, and lightning-fast configuration delivery worldwide.",
		benefits: [
			"99.9% uptime SLA guarantee",
			"Global CDN for fast delivery",
			"Sub-second configuration updates",
			"Automatic failover and recovery",
			"Performance monitoring and alerts",
		],
	},
];

export default function Features() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
			{/* Hero Section */}
			<section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
					<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
				</div>

				<div className="relative mx-auto max-w-4xl text-center">
					<div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl apple-bounce">
						<Sparkles className="w-8 h-8 text-white" />
					</div>

					<h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl apple-fade-in">
						Powerful Features for
						<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
							Modern Teams
						</span>
					</h1>

					<p className="mt-8 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto apple-fade-in">
						Everything you need to manage application configurations at scale. Built for enterprise
						security, team collaboration, and developer productivity.
					</p>

					<div className="mt-12 apple-fade-in">
						<Link href="/auth/signup">
							<Button size="lg" className="text-lg px-8 py-4 h-auto">
								Start Free Trial
								<ArrowRight className="ml-2 h-5 w-5" />
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Features Grid */}
			<section className="py-24 px-6 lg:px-8">
				<div className="mx-auto max-w-6xl">
					<div className="grid lg:grid-cols-2 gap-12">
						{features.map((feature) => (
							<Card key={feature.title} className="apple-fade-in">
								<CardHeader>
									<CardTitle className="text-2xl">{feature.title}</CardTitle>
									<CardDescription className="text-lg">{feature.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										{feature.benefits.map((benefit) => (
											<div key={benefit} className="flex items-start gap-3">
												<CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
												<span className="text-muted-foreground">{benefit}</span>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-24 px-6 lg:px-8 bg-muted/30">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						Ready to experience these features?
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						Start your free trial today and see how ConfigsHub can transform your configuration management
						workflow.
					</p>
					<div className="mt-8 flex items-center justify-center gap-6">
						<Link href="/auth/signup">
							<Button size="lg" className="text-lg px-8 py-4 h-auto">
								Get Started Free
								<ArrowRight className="ml-2 h-5 w-5" />
							</Button>
						</Link>
						<Link href="/">
							<Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
								Learn More
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
