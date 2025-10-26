import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Source Of Releases",
  description: "Static release pages generated from your storage backend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
              <Link href="/" className="text-lg font-semibold tracking-tight">
                Source Of
              </Link>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                GitHub release style pages, statically rendered
              </span>
            </div>
          </header>
          <main className="flex-1">
            <div className="mx-auto w-full max-w-5xl px-6 py-10">{children}</div>
          </main>
          <footer className="border-t border-zinc-200 bg-white/60 py-4 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-400">
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6">
              <span>© {new Date().getFullYear()} Source Of</span>
              <span>Built with Next.js SSG</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
