import { Button } from '@/components/ui/button'
import { categories, mockBlogs, projects } from '@/data/post-mock-data';
import { db } from '@/drizzle/db';
import { categoryTable, ProjectStatus, projectTable } from '@/drizzle/schema';

export default async function SendboxPage() {
    try {
        // const blogs = await db.select().from(blogTable);
        // console.log(blogs);
        // const categories = await db.select().from(categoryTable);
        // console.log(categories);

        const projects = await db.select().from(projectTable);
        console.log(projects);

    } catch (err: any) {
        console.error("Drizzle Error:", err);
        console.error("Cause:", err.cause);
    }


    return (
        <div className='w-full h-full flex justify-center items-center'>
            <form
                action={async () => {
                    "use server"

                    const insertableData = projects.map((p) => ({
                        ...p,
                        techStack: p.tags

                    }))
                    await db.insert(projectTable).values(insertableData)
                }}
            >
                <Button type='submit'>
                    Sendbox
                </Button>
            </form>
        </div>
    )
}
