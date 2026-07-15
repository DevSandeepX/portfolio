import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { cn } from "@/lib/utils";
import { getSeoSettings } from "@/db/setting";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteMetadata = await getSeoSettings();

  return {
    title: siteMetadata?.seoTitle ?? "sandeep.dev",
    description:
      siteMetadata?.seoDescription ??
      "Portfolio of Sandeep Chauhan - Full Stack Web Developer",

    keywords: siteMetadata?.seoKeywords
      ? siteMetadata.seoKeywords
        .split(",")
        .map((keyword) => keyword.trim())
      : ["Sandeep", "Full Stack Developer", "Next.js", "React"],

    icons: siteMetadata?.faviconUrl
      ? {
        icon: siteMetadata.faviconUrl,
        shortcut: siteMetadata.faviconUrl,
        apple: siteMetadata.faviconUrl,
      }
      : undefined,

    metadataBase: new URL("https://sandeep.dev"),

    openGraph: {
      title: siteMetadata?.seoTitle ?? "sandeep.dev",
      description:
        siteMetadata?.seoDescription ??
        "Portfolio of Sandeep Chauhan - Full Stack Web Developer",
      type: "website",
      locale: "en_US",
      url: "https://sandeep.dev",
      siteName: "sandeep.dev",
    },

    twitter: {
      card: "summary_large_image",
      title: siteMetadata?.seoTitle ?? "sandeep.dev",
      description:
        siteMetadata?.seoDescription ??
        "Portfolio of Sandeep Chauhan - Full Stack Web Developer",
      creator: siteMetadata?.twitterUrl
        ? siteMetadata.twitterUrl
          .replace("https://x.com/", "@")
          .replace("https://twitter.com/", "@")
        : undefined,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <Toaster position="top-right" />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}