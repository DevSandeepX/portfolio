import PostForm from '../_components/PostForm'
import { CATEGORY_QUERIES } from '@/server/db/category'

export default async function AdminCreatePostPage() {
    const categories = await CATEGORY_QUERIES.getAdminCategories()

    return (
        <div>
            <PostForm categories={categories} />
        </div>
    )
}
