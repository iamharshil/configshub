"use client";

import { animate } from "framer-motion";
import { Database } from "lucide-react";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";

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
	const handleClick = useCallback(
		(hash: string) => (event: MouseEvent<HTMLAnchorElement>) => {
			if (!hash.startsWith("#")) {
				return;
			}

			event.preventDefault();
			event.stopPropagation();

			scrollToHash(hash);
		},
		[],
	);

	return (
		<nav
			id="landing-nav"
			className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-slate-950/80"
		>
			<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
				<div className="flex items-center gap-3">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
						<Database className="h-4 w-4 text-white" />
					</div>
					<span className="text-xl font-bold">ConfigsHub</span>
				</div>
				<div className="hidden items-center gap-8 md:flex">
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
						<Button variant="ghost">Sign In</Button>
					</Link>
					<Link href="/auth/signup">
						<Button>Get Started</Button>
					</Link>
				</div>
			</div>
		</nav>
	);
}
