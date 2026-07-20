import { db } from "@/drizzle/db"
import { projectTable } from "@/drizzle/schema"

export const QUERIES = {
    getAllProjects: () => {
        return db.select().from(projectTable)
    }
}
export const MUTATIONS = {}