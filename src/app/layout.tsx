import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  League_Spartan,
} from "next/font/google";

import "./globals.css";

import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { shadcn } from "@clerk/themes";
import { assets } from "./assets/assets";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ally-desk-ai.vercel.app"),

  title: {
    default: "AllyDesk | AI-Powered Customer Support",
    template: "%s · AllyDesk",
  },

  description:
    "AllyDesk is an AI-assisted customer support workspace designed to help teams manage conversations and deliver better customer experiences.",

  applicationName: "AllyDesk",

  icons: {
    icon: assets.logoIcon.src,
    shortcut: assets.logoIcon.src,
    apple: assets.logoIcon.src,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    siteName: "AllyDesk",
    title: "AllyDesk | AI-Powered Customer Support",
    description:
      "Manage customer conversations and deliver better support with AllyDesk.",
  },

  twitter: {
    card: "summary",
    title: "AllyDesk | AI-Powered Customer Support",
    description:
      "An AI-assisted workspace for managing customer support.",
  },

  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ theme: shadcn }}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`
            ${geistSans.variable}
            ${geistMono.variable}
            ${inter.variable}
            ${leagueSpartan.variable}
          `}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <a
              href="#main-content"
              className="sr-only z-50 rounded-md bg-background p-3 text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-2 focus:outline-offset-2 focus:outline-primary"
            >
              Skip to main content
            </a>

            {children}

            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
