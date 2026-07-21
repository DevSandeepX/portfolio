import { Button } from '@/components/ui/button'
import { categories, mockBlogs, projects } from '@/data/post-mock-data';
import { db } from '@/drizzle/db';
import { categoryTable, ProjectStatus, projectTable, viewTable } from '@/drizzle/schema';

function randomDate(year: number, month: number, maxDay: number) {
    return new Date(
        year,
        month,
        Math.floor(Math.random() * maxDay) + 1,
        Math.floor(Math.random() * 24),
        Math.floor(Math.random() * 60)
    );
}

const mockViews = [
    // January (120)
    ...Array.from({ length: 120 }, (_, i) => ({
        path: "/",
        createdAt: randomDate(2026, 0, 31),
    })),

    // February (180)
    ...Array.from({ length: 180 }, (_, i) => ({
        path: "/",
        createdAt: randomDate(2026, 0, 31),
    })),

    // March (260)
    ...Array.from({ length: 260 }, (_, i) => ({
        path: "/",
        createdAt: randomDate(2026, 0, 31),
    })),

    // April (340)
    ...Array.from({ length: 340 }, (_, i) => ({
        path: "/",
        createdAt: randomDate(2026, 0, 31),
    })),

    // May (450)
    ...Array.from({ length: 450 }, (_, i) => ({
        path: "/",
        createdAt: randomDate(2026, 0, 31),
    })),

    // June (620)
    ...Array.from({ length: 620 }, (_, i) => ({
        path: "/",
        createdAt: randomDate(2026, 0, 31),
    })),

    // July (810)
    ...Array.from({ length: 810 }, (_, i) => ({
        path: "/",
        createdAt: randomDate(2026, 0, 31),
    })),
];

export default async function SendboxPage() {
    try {
        // const blogs = await db.select().from(blogTable);
        // console.log(blogs);
        // const categories = await db.select().from(categoryTable);
        // console.log(categories);

        const mockViews = await db.select().from(viewTable);
        console.log(mockViews);

    } catch (err: any) {
        console.error("Drizzle Error:", err);
        console.error("Cause:", err.cause);
    }


    return (
        <div className='w-full h-full flex justify-center items-center'>
            <form
                action={async () => {
                    "use server"

                    const insertableData = mockViews.map((m) => ({
                        ...m

                    }))
                    await db.insert(viewTable).values(insertableData)
                }}
            >
                <Button type='submit'>
                    Sendbox
                </Button>
            </form>
        </div>
    )
}
