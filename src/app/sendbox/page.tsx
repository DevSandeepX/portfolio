import { Button } from '@/components/ui/button'
import { db } from '../../drizzle/db'
import { blogTable } from '../../drizzle/schema'
import { mockBlogs } from '@/data/post-mock-data';

export default async function SendboxPage() {
    try {
        const blogs = await db.select().from(blogTable);
        console.log(blogs);
    } catch (err: any) {
        console.error("Drizzle Error:", err);
        console.error("Cause:", err.cause);
    }

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <form
                action={async () => {
                    "use server"
                    const insertableData = mockBlogs.map((p) => ({
                        ...p

                    }))
                    await db.insert(blogTable).values(insertableData)
                }}
            >
                <Button type='submit'>
                    Sendbox
                </Button>
            </form>
        </div>
    )
}
