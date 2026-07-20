import { Button } from '@/components/ui/button'
import { db } from '../../drizzle/db'
import { blogTable, categoryTable } from '../../drizzle/schema'
import { categories, mockBlogs } from '@/data/post-mock-data';

export default async function SendboxPage() {
    try {
        // const blogs = await db.select().from(blogTable);
        // console.log(blogs);
        const categories = await db.select().from(categoryTable);
        console.log(categories);
    } catch (err: any) {
        console.error("Drizzle Error:", err);
        console.error("Cause:", err.cause);
    }

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <form
                action={async () => {
                    "use server"

                    const insertableData = categories.map((c) => ({ name: c, slug: c.toLowerCase() }))
                    await db.insert(categoryTable).values(insertableData)
                }}
            >
                <Button type='submit'>
                    Sendbox
                </Button>
            </form>
        </div>
    )
}
