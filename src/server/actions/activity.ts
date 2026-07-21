"use server"

import { activityTable } from "@/drizzle/schema";
import { ACTIVITY_MUTATIONS } from "../db/activity";


export async function createActivity(data: typeof activityTable.$inferInsert) {
    try {
        await ACTIVITY_MUTATIONS.createActivity(data)
        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false
        }
    }
}