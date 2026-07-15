import { SignUp } from '@clerk/nextjs'
import { Loader2Icon } from 'lucide-react'
import { Suspense } from 'react'

export default function SignUpPage() {
    return (
        <Suspense fallback={
            <div className='w-full h-full flex items-center justify-center'>
                <Loader2Icon className='size-16 animate-spin' />
            </div>
        }>
            <SignUp />
        </Suspense>
    )
}