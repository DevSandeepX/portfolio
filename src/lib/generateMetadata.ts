import { getSeoSettings } from "@/db/setting";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const siteMetadata = await getSeoSettings();

    return {
        title: siteMetadata?.seoTitle ?? "sandeep.dev",
        description: siteMetadata?.seoDescription ?? "",
        keywords: siteMetadata?.seoKeywords
            ?.split(",")
            .map((keyword) => keyword.trim()),

        icons: siteMetadata?.faviconUrl
            ? {
                icon: siteMetadata.faviconUrl,
            }
            : undefined,

        twitter: {
            card: "summary_large_image",
            creator: siteMetadata?.twitterUrl ?? undefined,
        },
    };
}