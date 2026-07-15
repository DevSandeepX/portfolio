"use server";

import { revalidateAppSettingCache } from "@/cache/setting";
import { updateAppSettingDb } from "@/db/setting";
import { requireAdmin } from "@/lib/requireAdmin";
import type { AppSettingFormInput } from "@/schemas/setting";

type ActionResult = {
    success: boolean;
    message: string;
};

export async function updateAppSetting(
    id: string,
    data: Partial<AppSettingFormInput>
): Promise<ActionResult> {
    try {
        await requireAdmin();

        const settingId = id.trim();

        if (!settingId) {
            return {
                success: false,
                message: "Invalid app setting id.",
            };
        }

        const setting = await updateAppSettingDb(settingId, data);

        await revalidateAppSettingCache(setting.id);

        return {
            success: true,
            message: "App settings updated successfully.",
        };
    } catch (error) {
        console.error("Update app setting error:", error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to update app settings.",
        };
    }
}