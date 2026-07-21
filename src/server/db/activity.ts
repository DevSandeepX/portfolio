import { db } from "@/drizzle/db"
import { activityTable } from "@/drizzle/schema"
import { desc } from "drizzle-orm"

export const ACTIVITY_QUERIES = {
    getRecentActivities: () => {
        return db
            .select({
                id: activityTable.id,
                message: activityTable.message,
                createdAt: activityTable.createdAt,
            })
            .from(activityTable)
            .orderBy(desc(activityTable.createdAt))
            .limit(5)
    }
}



export const ACTIVITY_MUTATIONS = {
    createActivity: (data: typeof activityTable.$inferInsert) => {
        return db
            .insert(activityTable)
            .values(data)
            .returning()
    }
}