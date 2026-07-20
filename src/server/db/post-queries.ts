import { db } from "@/drizzle/db";
import { blogTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const QUERIES = {
    getAllPosts: () => db.select().from(blogTable),
    getPostBySlug: async (slug: string) => {
        const [post] = await db.select().from(blogTable).where(eq(blogTable.slug, slug))
        return post
    }
}