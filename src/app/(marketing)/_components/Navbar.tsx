"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import { Show, UserButton } from "@clerk/nextjs";
import { Suspense, useState } from "react";
import Sidebar from "@/components/Sidebar";
import AuthButton from "@/components/AuthButton";
import Image from "next/image";

export type NavLink = {
    title: string, href: string
}
const navLinks: NavLink[] = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Projects", href: "/projects" },
    { title: "Skills", href: "/skills" },
    { title: "Contact", href: "/contact" },
    { title: "Gallery", href: "/gallery" },

];

export default function Navbar() {
    const pathname = usePathname();


    return (
        <header className="sticky top-0 z-50 glass w-full border-b border-white/10 bg-background/70 backdrop-blur-xl">
            <div className="container flex h-16 items-center justify-between">

                {/* Logo */}
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

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href
                                    ? "text-primary after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.title}
                        </Link>
                    ))}

                </nav>

                <div className="hidden lg:flex">
                    <Suspense>
                        <Show when="signed-in">
                            <div className="flex gap-4">
                                <AuthButton />
                                <UserButton />
                            </div>
                        </Show>
                        <Show when="signed-out">
                            <div className="flex items-center gap-3">
                                <Link href="/sign-in" className="w-full">
                                    <Button variant="outline" className="w-full rounded">
                                        Sign In
                                    </Button>
                                </Link>

                                <Link href="/sign-up" className="w-full">
                                    <Button className="w-full rounded">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        </Show>
                    </Suspense>
                </div>

                {/* Desktop Right */}
                <div className="hidden items-center gap-3 lg:flex">
                    {/* Theme Toggle Component */}
                    {/* <ModeToggle /> */}


                </div>

                {/* Mobile */}
                <div className="flex items-center gap-2 lg:hidden">
                    {/* <ModeToggle /> */}

                    <Sheet>
                        <SheetTrigger render={
                            <Button variant="ghost" className="rounded">
                                <Menu className="size-4" />
                            </Button>
                        } />
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Sandeep.dev</SheetTitle>
                            </SheetHeader>
                            <div className="px-4">
                                <div className="mt-10 flex flex-col gap-2">
                                    <Sidebar navLinks={navLinks} />

                                </div>
                            </div>
                            <SheetFooter className="mt-6 border-t pt-6">
                                <Show when="signed-in">
                                    <Suspense>
                                        <div className="flex flex-col gap-4">
                                            <Link href="/dashboard" className="w-full">
                                                <Button className="w-full btn-primary">
                                                    Dashboard
                                                </Button>
                                            </Link>

                                            <div className="flex items-center justify-between rounded-lg border p-3">
                                                <span className="text-sm text-muted-foreground">
                                                    Signed in
                                                </span>
                                                <UserButton />
                                            </div>
                                        </div>
                                    </Suspense>
                                </Show>

                                <Show when="signed-out">
                                    <Suspense>
                                        <div className="flex flex-col gap-3">
                                            <Link href="/sign-in" className="w-full">
                                                <Button variant="outline" className="w-full">
                                                    Sign In
                                                </Button>
                                            </Link>

                                            <Link href="/sign-up" className="w-full">
                                                <Button className="w-full">
                                                    Sign Up
                                                </Button>
                                            </Link>
                                        </div>
                                    </Suspense>
                                </Show>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}