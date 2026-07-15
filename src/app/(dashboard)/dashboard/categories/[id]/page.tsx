import CreateCategoryForm from '@/app/(dashboard)/_components/CreateCategoryForm'
import CustomNotFound from '@/components/CustomNotFound'
import { getPaginatedCategories, getCategoryById } from '@/db/category'
import { notFound } from 'next/navigation'

export default async function CategoryIdPage({ params }: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params
    return (
        <SuspendedForm id={id} />
    )
}


async function SuspendedForm({ id }: { id: string }) {
    const [category, { categories }] = await Promise.all([
        getCategoryById(id),
        getPaginatedCategories({})
    ])

    if (category == null) {
        return (
            <CustomNotFound
                title='Category not found'
                description="The category you' re looking for doesn't exist or may have been removed."
                actionHref='/dashboard/categories'
                actionLabel='Browse Categories'
            />
        )
    }
    return (
        <div className='w-full'>
            <CreateCategoryForm category={category} categories={categories} />
        </div>
    )
}