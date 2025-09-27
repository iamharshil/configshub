import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 apple-scale",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-shadow",
				destructive:
					"bg-destructive text-white hover:bg-destructive/90 shadow-lg hover:shadow-xl focus-visible:ring-destructive/20",
				outline:
					"glass-card border hover:bg-accent/50 hover:text-accent-foreground hover:shadow-lg transition-all",
				secondary: "glass-card bg-secondary/80 text-secondary-foreground hover:bg-secondary hover:shadow-lg",
				ghost: "hover:glass-card hover:bg-accent/30 hover:text-accent-foreground transition-all",
				link: "text-primary underline-offset-4 hover:underline",
				glass: "glass-card hover:bg-accent/20 hover:shadow-xl transition-all duration-300",
			},
			size: {
				default: "h-10 px-6 py-2 has-[>svg]:px-4",
				sm: "h-8 rounded-lg gap-1.5 px-4 has-[>svg]:px-3",
				lg: "h-12 rounded-xl px-8 has-[>svg]:px-6 text-base",
				icon: "size-10 rounded-xl",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
