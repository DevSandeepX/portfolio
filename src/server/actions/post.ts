"use server"

import { blogTable } from "@/drizzle/schema";
import { generateSlug } from "@/lib/utils";
import { POST_MUTATIONS } from "../db/post-queries";

export async function createPost(data: typeof blogTable.$inferInsert) {
    try {

        // generate slug w/title (if not provided)
        if (!data.slug.trim()) {
            data.slug = generateSlug(data.title)
        }

        // save data
        await POST_MUTATIONS.insertPost(data)
        return {
            success: false,
            message: "post created successfully"
        }
        // return response
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Smothing went wrong"
        }
    }
}