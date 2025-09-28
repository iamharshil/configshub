"use client";

import { animate } from "framer-motion";
import { Database, Menu, X } from "lucide-react";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
	{ href: "#features", label: "Features" },
	{ href: "#pricing", label: "Pricing" },
	{ href: "#about", label: "About" },
];

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];
const scrollPadding = 24;

function scrollToHash(hash: string) {
	if (typeof window === "undefined") {
		return;
	}

	const target = document.querySelector(hash);
	if (!target) {
		return;
	}

	const nav = document.getElementById("landing-nav");
	const navHeight = nav?.offsetHeight ?? 0;
	const targetPosition = window.scrollY + target.getBoundingClientRect().top - navHeight - scrollPadding;

	animate(window.scrollY, Math.max(targetPosition, 0), {
		duration: 0.9,
		ease: easing,
		onUpdate: (latest) => window.scrollTo({ top: latest }),
	});

	window.history.replaceState(null, "", hash);
}

export function LandingNav() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const handleClick = useCallback(
		(hash: string) => (event: MouseEvent<HTMLAnchorElement>) => {
			if (!hash.startsWith("#")) {
				return;
			}

			event.preventDefault();
			event.stopPropagation();

			scrollToHash(hash);
			setIsMobileMenuOpen(false);
		},
		[],
	);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<nav
			id="landing-nav"
			className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-slate-950/80"
		>
			<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
				<div className="flex items-center gap-3">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
						<Database className="h-4 w-4 text-white" />
					</div>
					<span className="text-lg font-bold sm:text-xl">ConfigsHub</span>
				</div>

				{/* Desktop Navigation */}
				<div className="hidden items-center gap-6 md:flex lg:gap-8">
					{navigationItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							onClick={handleClick(item.href)}
							className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
						>
							{item.label}
						</Link>
					))}
					<Link href="/auth/signin">
						<Button variant="ghost" size="sm">
							Sign In
						</Button>
					</Link>
					<Link href="/auth/signup">
						<Button size="sm">Get Started</Button>
					</Link>
				</div>

				{/* Mobile Menu Button */}
				<Button
					variant="ghost"
					size="sm"
					className="md:hidden"
					onClick={toggleMobileMenu}
					aria-label="Toggle mobile menu"
				>
					{isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
				</Button>
			</div>

			{/* Mobile Menu */}
			<div
				className={cn(
					"absolute left-0 right-0 top-full bg-white/95 backdrop-blur-md transition-all duration-300 dark:bg-slate-950/95 md:hidden",
					isMobileMenuOpen
						? "max-h-96 border-b border-gray-200 opacity-100 dark:border-gray-800"
						: "max-h-0 overflow-hidden opacity-0",
				)}
			>
				<div className="flex flex-col space-y-4 px-4 py-6 sm:px-6">
					{navigationItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							onClick={handleClick(item.href)}
							className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
						>
							{item.label}
						</Link>
					))}
					<div className="flex flex-col gap-3 pt-4">
						<Link href="/auth/signin" className="w-full">
							<Button variant="ghost" className="w-full justify-center">
								Sign In
							</Button>
						</Link>
						<Link href="/auth/signup" className="w-full">
							<Button className="w-full justify-center">Get Started</Button>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
