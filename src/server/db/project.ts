import { db } from "@/drizzle/db"
import { projectTable } from "@/drizzle/schema"
import { desc, eq } from "drizzle-orm"

export const PROJECTQUERIES = {
    getAllProjects: () => {
        return db.select().from(projectTable)
    },
    getProjectBySlug: async (slug: string) => {
        const [project] = await db.select().from(projectTable).where(eq(projectTable.slug, slug))
        return project
    },

    getRecentProjects: () => {
        return db
            .select({
                id: projectTable.id,
                title: projectTable.title,
                status: projectTable.status,
            })
            .from(projectTable)
            .orderBy(desc(projectTable.createdAt))
            .limit(3)
    }

}


export const PROJECTMUTATIONS = {}