import { getSocailLinks } from "@/db/setting";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import {
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaFacebook,
    FaXTwitter,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Footer() {
    return (
        <footer className="border-t   ">
            <div className="container flex flex-col items-start justify-between gap-6 py-8 md:flex-row">
                {/* Left */}
                <div>
                    <Link
                        href="/"
                        className="flex items-center"
                    >
                        <Image
                            src="/assets/images/brand-logo.png"
                            alt="sandeep.dev Logo"
                            width={160}
                            height={48}
                            priority
                            className="h-10 w-auto"
                        />
                    </Link>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Building modern web applications with Next.js & TypeScript.
                    </p>
                </div>
                <Suspense>
                    <SuspendedSocialLinks />
                </Suspense>
            </div>

            <div className="border-t">
                <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-6 py-4 text-sm text-muted-foreground md:flex-row">
                    <p>
                        © {2026} DevSandeepX. All rights reserved.
                    </p>

                </div>
            </div>
        </footer>
    );
}

export async function SuspendedSocialLinks() {
    const data = await getSocailLinks();

    if (!data) {
        return null
    }

    const links = [
        {
            label: "Email",
            href: data.email ? `mailto:${data.email}` : null,
            icon: MdEmail,
        },
        {
            label: "GitHub",
            href: data.githubUrl,
            icon: FaGithub,
        },
        {
            label: "LinkedIn",
            href: data.linkedinUrl,
            icon: FaLinkedin,
        },
        {
            label: "X",
            href: data.twitterUrl,
            icon: FaXTwitter,
        },
        {
            label: "Instagram",
            href: data.instagramUrl,
            icon: FaInstagram,
        },
        {
            label: "Facebook",
            href: data.facebookUrl,
            icon: FaFacebook,
        },
    ].filter(
        (
            item
        ) => Boolean(item.href)
    );

    if (links.length === 0) {
        return (
            <div className="rounded-xl border border-dashed p-10 text-center pt-10">
                <h2 className="text-xl font-semibold">No Social Links</h2>
                <p className="mt-2 text-muted-foreground">
                    Social links will appear here once they are added.
                </p>
            </div>
        );
    }

    return (
        <section className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">
                    Connect With Me
                </h2>

                <p className="mt-2 text-muted-foreground">
                    Feel free to connect with me on these platforms.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {links.map(({ label, href, icon: Icon }) => (
                    <Link
                        key={label}
                        href={href!}
                        target={label === "Email" ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 rounded-xl border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
                    >
                        <div className="shrink-0 rounded-lg bg-primary/10 p-3 text-primary">
                            <Icon className="h-6 w-6" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="font-semibold">{label}</p>

                            <p className="truncate text-sm text-muted-foreground">
                                {label === "Email" ? data.email : "Open Profile"}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}