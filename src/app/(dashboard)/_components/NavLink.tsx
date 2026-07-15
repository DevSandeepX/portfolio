"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

type NavLinkProps = {
    icon: any,
    label: string,
    href: string
}
export function NavLink({ href, icon: Icon, label }: NavLinkProps) {
    const pathname = usePathname()
    return (
        <Link href={href} className={cn("flex items-center px-2 rounded text-sm text-gray-300 py-2", pathname === href && "bg-blue-700 text-white")}>
            {Icon} {label}
        </Link>
    )
}