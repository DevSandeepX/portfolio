import React, { Suspense } from 'react'
import Navbar from "./_components/Navbar"
import Footer from '@/components/Footer'

export default function MarketingLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <div className='w-full'>
            <Suspense>
                <Navbar />
                <main className='w-full'>

                    {children}
                </main>
                <Footer />
            </Suspense>
        </div>
    )
}
