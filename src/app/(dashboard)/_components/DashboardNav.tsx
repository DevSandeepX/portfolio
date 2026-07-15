import { UserAvatar, UserButton } from '@clerk/nextjs';
import React from 'react'
import { CgDetailsMore } from "react-icons/cg";

export default function DashboardNav() {
    return (
        <div className='h-14 md:h-16 lg:h-18 px-4  bg-white shadow-sm flex justify-between items-center'>
            <div className='flex gap-4 items-center'>
                <CgDetailsMore className='size-6' />
                <span className='font-semibold'>  Dashboard</span>
            </div>
            <div >
                <UserButton />
            </div>
        </div>
    )
}
