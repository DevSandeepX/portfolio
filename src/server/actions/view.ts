"use server";

import { headers } from "next/headers";
import { MUTATIONS } from "../db/view";
import { ACTIVITY_MUTATIONS } from "../db/activity";

export async function createView(path: string): Promise<{ success: boolean }> {
    try {
        const headersList = await headers();
        const userAgent = headersList.get("user-agent") ?? undefined;

        const ipAddress =
            headersList.get("x-real-ip") ||
            headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            "unknown";

        await MUTATIONS.insertView({ ipAddress, path, userAgent });
        return { success: true };
    } catch (error) {
        console.error("View tracking failed:", error);
        return { success: false };
    }
}