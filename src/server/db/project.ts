import { db } from "@/drizzle/db"
import { projectTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export const QUERIES = {
    getAllProjects: () => {
        return db.select().from(projectTable)
    },
    getProjectBySlug: async (slug: string) => {
        const [project] = await db.select().from(projectTable).where(eq(projectTable.slug, slug))
        return project
    },

}


export const MUTATIONS = {}