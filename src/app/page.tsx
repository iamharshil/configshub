import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<main className="flex min-h-screen w-full justify-center items-center flex-col">
				<h4 className="text-5xl font-bold">ConfigsHub</h4>
				<p className="mt-4 text-sm text-zinc-400 animate-accordion-down">
					Single place to manage all your development configurations
				</p>
				<Button asChild className="mt-8">
					<Link href="/signup" prefetch>
						Get Started
					</Link>
				</Button>
			</main>
		</div>
	);
}
