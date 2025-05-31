import { Sidebar } from "@repo/ui/sidebar";

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <Sidebar></Sidebar>
            {children}
        </div>
    );
}