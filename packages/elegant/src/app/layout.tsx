import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from 'next-themes';
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Analytics from "@/components/Analytics";
import VercelAnalytics from "@/components/VercelAnalytics";
import { cn } from "@/utils/utils";
import MetaTitle from "@/utils/Meta/MetaTitle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:  MetaTitle(
    process.env.NEXT_PUBLIC_APP_NAME || "Elegant", 
    process.env.NEXT_PUBLIC_APP_TAGLINE || ""
  ),
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "",
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_APP_URL || ""}/feeds/feed.xml`,
      'application/atom+xml': `${process.env.NEXT_PUBLIC_APP_URL || ""}/feeds/atom.xml`,
      'application/json': `${process.env.NEXT_PUBLIC_APP_URL || ""}/feeds/feed.json`
    },
  },
  openGraph: {
    title:  MetaTitle(
      process.env.NEXT_PUBLIC_APP_NAME || "Elegant", 
      process.env.NEXT_PUBLIC_APP_TAGLINE || ""
    ),
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "",
    images: [
      {url: "/social-card-large.jpg"}
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
        <Analytics GA_ID={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ""}/>
      )}
      <body className={cn(
        "bg-white dark:bg-slate-900 antialiased text-slate-500 dark:text-slate-400",
        inter.className
      )}>
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
        {process.env.VERCEL_ANALYTICS && (
          <VercelAnalytics />
        )}
      </body>
    </html>
  );
}
