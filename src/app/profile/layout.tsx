import type { Metadata } from "next";
import Header from "@/components/common/header";

export const metadata: Metadata = {
    title: "Profile | ConfigsHub",
    description: "Manage your ConfigsHub profile settings",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
