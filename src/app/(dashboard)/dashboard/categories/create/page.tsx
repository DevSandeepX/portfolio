import BackButton from '@/app/(dashboard)/_components/BackButton'
import CreateCategoryForm from '@/app/(dashboard)/_components/CreateCategoryForm'
import { getAllCategories } from '@/db/category'


export default async function CreateCategoryPage() {
    const categories = await getAllCategories()
    return (
        <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-2 md:px-6">
            <div className="flex items-center justify-between gap-6 w-full">
                <BackButton title="Categories" href="/dashboard/categories" />
            </div>
            <CreateCategoryForm categories={categories} />
        </div>
    )
}
