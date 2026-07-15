"use server";

import { revalidateFullCache } from "@/lib/dbCache";
import { requireAdmin } from "@/lib/requireAdmin";

export async function refreshCache() {
    try {
        await requireAdmin();

        revalidateFullCache();

        return {
            success: true,
            message: "Cache refreshed successfully.",
        };
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to refresh cache.",
        };
    }
}