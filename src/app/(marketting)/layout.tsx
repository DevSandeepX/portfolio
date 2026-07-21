"use client"
import React, { useEffect } from 'react'
import Navbar from './_components/Navbar'
import { usePathname } from 'next/navigation';
import { createView } from '@/server/actions/view';

export default function MarkettingPage({ children }: {
    children: React.ReactNode
}) {
    const pathname = usePathname();

    useEffect(() => {
        createView(pathname)
            .then()
            .catch(() => { });
    }, [pathname]);

    return (
        <div className='flex flex-col'>
            <Navbar />
            <main className='mt-16'>
                {children}
            </main>
        </div>
    )
}
