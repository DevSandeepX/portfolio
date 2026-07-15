"use client"
import { NavLink } from '@/app/(marketing)/_components/Navbar'
import { cn } from '@/lib/utils';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

export default function Sidebar({ navLinks, className }: {
    navLinks: NavLink[],
    className?: string
}) {

    const pathname = usePathname();

    return (
        <Suspense fallback={null}>

            <div className={cn("flex flex-col gap-2", className)}>
                {navLinks.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "rounded-md px-4 py-3 text-base transition",
                            pathname === item.href
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted"
                        )}
                    >
                        {item.title}
                    </Link>
                ))}
            </div>
        </Suspense>
    )
}
