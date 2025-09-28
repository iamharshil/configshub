import type { Metadata } from "next";
import Header from "@/components/common/header";

export const metadata: Metadata = {
    title: "Settings | ConfigsHub",
    description: "Manage your ConfigsHub application settings",
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
