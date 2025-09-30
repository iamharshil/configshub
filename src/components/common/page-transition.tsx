"use client";

import { motion, type Transition } from "framer-motion";
import type { ReactNode } from "react";

interface PageTransitionProps {
	children: ReactNode;
	className?: string;
}

const pageVariants = {
	initial: {
		opacity: 0,
		y: 20,
		scale: 0.98,
	},
	in: {
		opacity: 1,
		y: 0,
		scale: 1,
	},
	out: {
		opacity: 0,
		y: -20,
		scale: 1.02,
	},
};

const pageTransition: Transition = {
	type: "tween",
	ease: "anticipate",
	duration: 0.4,
};

export function PageTransition({ children, className = "" }: PageTransitionProps) {
	return (
		<motion.div
			initial="initial"
			animate="in"
			exit="out"
			variants={pageVariants}
			transition={pageTransition}
			className={className}
		>
			{children}
		</motion.div>
	);
}

// Staggered children animation for lists and grids
export const staggerContainer = {
	initial: {},
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export const staggerItem = {
	initial: {
		opacity: 0,
		y: 20,
	},
	animate: {
		opacity: 1,
		y: 0,
	},
};

// Fade in animation
export const fadeInUp = {
	initial: {
		opacity: 0,
		y: 30,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			type: "tween",
			ease: "easeOut",
			duration: 0.5,
		},
	},
};

// Scale in animation for cards
export const scaleIn = {
	initial: {
		opacity: 0,
		scale: 0.9,
	},
	animate: {
		opacity: 1,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 200,
			damping: 20,
			duration: 0.4,
		},
	},
};

// Slide in from left
export const slideInLeft = {
	initial: {
		opacity: 0,
		x: -50,
	},
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			type: "spring",
			stiffness: 200,
			damping: 25,
			duration: 0.5,
		},
	},
};

// Slide in from right
export const slideInRight = {
	initial: {
		opacity: 0,
		x: 50,
	},
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			type: "spring",
			stiffness: 200,
			damping: 25,
			duration: 0.5,
		},
	},
};
