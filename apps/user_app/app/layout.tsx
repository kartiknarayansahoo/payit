import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";
import "./globals.css";
import { AppbarClient } from "@/components/ui_self/appbar";
import { Toaster } from 'react-hot-toast'


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "PayIt",
  description: "PayIt - A new wallet for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${geistSans.variable} ${geistMono.variable} bg-light`}>
          <AppbarClient></AppbarClient>
          {children}
          <Toaster position="bottom-right" />
        </body>
      </Providers>
    </html>
  );
}
