import { db } from "@/drizzle/db"
import { blogTable, categoryTable, projectTable } from "@/drizzle/schema"
import { countDistinct } from "drizzle-orm";

export const QUERIES = {
    getResourceCount: async () => {
        const [totalBlogs, totalProjects, totalCategories] = await Promise.all([
            db.select({ value: countDistinct(blogTable.id) }).from(blogTable),
            db.select({ value: countDistinct(projectTable.id) }).from(projectTable),
            db.select({ value: countDistinct(categoryTable.id) }).from(categoryTable),
        ]);

        return {
            blogs: totalBlogs[0]?.value ?? 0,
            projects: totalProjects[0]?.value ?? 0,
            categories: totalCategories[0]?.value ?? 0,
        };
    },
};