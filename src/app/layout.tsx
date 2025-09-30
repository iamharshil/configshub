import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/toast-provider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://configshub.dev"),
	title: {
		default: "ConfigsHub - Modern Configuration Management Platform",
		template: "%s | ConfigsHub",
	},
	description:
		"Secure, scalable configuration management for modern applications. Store, version, and deploy your app configs with enterprise-grade security and Apple-inspired design.",
	keywords: [
		"configuration management",
		"app config",
		"environment variables",
		"config deployment",
		"secure configuration",
		"devops tools",
		"application settings",
		"config versioning",
		"configuration as code",
		"modern development tools",
	],
	authors: [{ name: "ConfigsHub Team" }],
	creator: "ConfigsHub",
	publisher: "ConfigsHub",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://configshub.dev",
		siteName: "ConfigsHub",
		title: "ConfigsHub - Modern Configuration Management Platform",
		description:
			"Secure, scalable configuration management for modern applications. Store, version, and deploy your app configs with enterprise-grade security.",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "ConfigsHub - Modern Configuration Management Platform",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "ConfigsHub - Modern Configuration Management Platform",
		description: "Secure, scalable configuration management for modern applications with Apple-inspired design.",
		images: ["/twitter-image.png"],
		creator: "@configshub",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	verification: {
		google: "your-google-verification-code",
		yandex: "your-yandex-verification-code",
	},
	alternates: {
		canonical: "https://configshub.dev",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="apple-mobile-web-app-title" content="ConfigsHub" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="msapplication-TileColor" content="#3b82f6" />
				<meta name="theme-color" content="#3b82f6" />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					{children}
					<ToastProvider />
					<JsonLd />
				</ThemeProvider>
			</body>
		</html>
	);
}
