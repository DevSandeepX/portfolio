import { db } from "@/drizzle/db";
import { blogTable } from "@/drizzle/schema";

export const QUERIES = {
    getAllPosts: () => db.select().from(blogTable)
}