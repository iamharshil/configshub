import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In - Access Your ConfigsHub Account",
    description:
        "Sign in to your ConfigsHub account to manage your application configurations. Secure, fast, and reliable configuration management platform.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function SigninLayout({ children }: { children: React.ReactNode }) {
    return children;
}
