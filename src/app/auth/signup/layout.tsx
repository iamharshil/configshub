import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sign Up - Create Your ConfigsHub Account",
	description:
		"Create your ConfigsHub account and start managing your application configurations securely. Join thousands of developers using our modern configuration management platform.",
	robots: {
		index: false,
		follow: false,
	},
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
	return children;
}
