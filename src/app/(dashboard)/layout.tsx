"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons (using lucide-react or any icon library)
import {
    Menu,
    X,
    Home,
    Users,
    Settings,
    BarChart3,
    FileText,
    Bell,
    Search,
    Folder
} from "lucide-react";

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
}

const navItems: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: <Home size={20} /> },
    { label: "Analytics", href: "/dashboard/analytics", icon: <BarChart3 size={20} /> },
    { label: "Users", href: "/dashboard/users", icon: <Users size={20} /> },
    { label: "Projects", href: "/dashboard/projects", icon: <Folder size={20} /> },
    { label: "Blogs", href: "/dashboard/blogs", icon: <FileText size={20} /> },
    { label: "Settings", href: "/dashboard/settings", icon: <Settings size={20} /> },
];

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/dashboard") {
            return pathname === "/dashboard";
        }
        return pathname?.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Desktop Sidebar - Fixed */}
            <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-gray-200 bg-white lg:flex">
                {/* Logo */}
                <div className="flex h-16 items-center border-b border-gray-200 px-6">
                    <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-gray-900">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                            D
                        </div>
                        Dashboard
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-4 py-4">
                    <ul className="space-y-1">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive(item.href)
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        }`}
                                >
                                    <span className={isActive(item.href) ? "text-blue-600" : "text-gray-400"}>
                                        {item.icon}
                                    </span>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* User Profile */}
                <div className="border-t border-gray-200 p-4">
                    <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50">
                        <div className="h-9 w-9 rounded-full bg-gray-300" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                            <p className="text-xs text-gray-500 truncate">john@example.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar - Drawer */}
            {mobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Drawer */}
                    <aside className="fixed left-0 top-0 z-50 h-screen w-64 bg-white shadow-xl lg:hidden">
                        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
                            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                                    D
                                </div>
                                Dashboard
                            </Link>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <nav className="p-4">
                            <ul className="space-y-1">
                                {navItems.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${isActive(item.href)
                                                ? "bg-blue-50 text-blue-700"
                                                : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            {item.icon}
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>
                </>
            )}

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Top Header */}
                <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 sm:px-6">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
                    >
                        <Menu size={20} />
                    </button>

                    {/* Search */}
                    <div className="flex flex-1 items-center gap-2">
                        <div className="relative max-w-md flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100">
                            <Bell size={20} />
                            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
                        </button>
                        <div className="h-8 w-8 rounded-full bg-gray-300 lg:hidden" />
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}