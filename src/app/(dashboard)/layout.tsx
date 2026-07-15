import React, { Suspense } from 'react'
import DashboardNav from './_components/DashboardNav'
import DashboardSidebar from './_components/DashboardSidebar'

const navLinks = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Projects", href: "/dashboard/projects" },
    { title: "Skills", href: "/dashboard/skills" },
    { title: "Categories", href: "/dashboard/categories" },
    { title: "Analytics", href: "/dashboard/analytics" },
    { title: "Settings", href: "/dashboard/settings" },
]

export default function DashboardLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <div className='w-full flex'>
                <aside className='w-64 min-h-screen bg-[#1a1626] text-white overflow-y-auto'>
                    <DashboardSidebar />
                </aside>
                <section className='flex flex-col w-full'>
                    <DashboardNav />
                    <main className='p-4 bg-[#ebf5f3]/50 min-h-[calc(100vh-72px)] '>
                        {children}
                    </main>
                </section>
            </div>
        </Suspense>
    )
}
