"use client"
import Link from 'next/link'
import { Button } from './ui/button'
import { useAuth } from '@clerk/nextjs';

export default function AuthButton() {
    const { sessionClaims } = useAuth();
    if (sessionClaims?.metadata?.role?.toLowerCase() !== "admin") {
        return null
    }
    return (
        <Link href="/dashboard" className="w-full">
            <Button className="w-full btn-primary">
                Dashboard
            </Button>
        </Link>
    )
}
