import BackButton from '@/app/(dashboard)/_components/BackButton'
import CreateSkillForm from '@/app/(dashboard)/_components/CreateSkillForm'
import { getAllCategories } from '@/db/category'
import { Suspense } from 'react'

export default function CreateSkillPage() {
    return (
        <div className='w-full'>
            <div className='w-full py-4 border-b'>
                <BackButton title='Skills' href='/dashboard/skills' />
            </div>
            <Suspense fallback={<p>Loading...</p>}>
                <SuspendedForm />
            </Suspense>
        </div>
    )
}



async function SuspendedForm() {
    const categories = await getAllCategories()
    return (
        <CreateSkillForm categories={categories} />
    )
}