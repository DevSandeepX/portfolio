import React from 'react'
import Navbar from './_components/Navbar'

export default function MarkettingPage({ children }: {
    children: React.ReactNode
}) {
    return (
        <div className='flex flex-col'>
            <Navbar />
            <main className='mt-16'>
                {children}
            </main>
        </div>
    )
}
