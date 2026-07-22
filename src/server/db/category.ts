import { db } from "@/drizzle/db"
import { blogTable, categoryTable } from "@/drizzle/schema"
import { desc, eq } from "drizzle-orm"

// Queries
export const CATEGORY_QUERIES = {
    getAdminCategories: () => {
        return db.select({
            id: categoryTable.id,
            name: categoryTable.name
        }).from(categoryTable)
            .orderBy(desc(categoryTable.createdAt))
    }
}



