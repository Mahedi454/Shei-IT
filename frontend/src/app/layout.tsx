import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RootShell } from "@/components/layout/root-shell";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AnalyticsBodyScripts, AnalyticsHeadScripts } from "@/lib/analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "shei-it",
  description: "Excellent IT in Bengali. Premium digital product and agency website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased light`}
    >
      <head>
        <AnalyticsHeadScripts />
      </head>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          themes={["light", "dark"]}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <RootShell>{children}</RootShell>
          </SmoothScrollProvider>
        </ThemeProvider>
        <AnalyticsBodyScripts />
      </body>
    </html>
  );
}
