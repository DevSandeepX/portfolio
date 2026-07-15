import { revalidateAppSettingCache } from "@/cache/setting";
import { getGlobalTag } from "@/lib/dbCache";
import { prisma } from "@/lib/prisma";
import { AppSettingFormInput } from "@/schemas/setting";
import { cacheTag } from "next/cache";

export async function getAppSetting() {
    "use cache"
    cacheTag(getGlobalTag("settings"))
    return prisma.setting.findFirst()
}
export async function getAppSettingWithoutCache() {
    return prisma.setting.findFirst({
        select: {
            isMantananceMode: true,
        }
    })
}

export async function updateAppSettingDb(
    id: string,
    data: Partial<AppSettingFormInput>
) {
    const settingId = id.trim();

    if (!settingId) {
        throw new Error("Invalid setting id.");
    }

    return prisma.setting.update({
        where: {
            id: settingId,
        },
        data,
        select: {
            id: true,
        },
    });
}

export async function getContactInfo() {
    "use cache"
    cacheTag(getGlobalTag("settings"))

    return prisma.setting.findFirst({
        select: {
            fullName: true,
            email: true,
            phone: true,
            location: true,
            githubUrl: true,
        }
    })
}

export async function getSocailLinks() {
    "use cache"
    cacheTag(getGlobalTag("settings"))

    return prisma.setting.findFirst({
        select: {
            email: true,
            githubUrl: true,
            facebookUrl: true,
            linkedinUrl: true,
            instagramUrl: true,
            twitterUrl: true
        }
    })
}

export async function getSeoSettings() {
    "use cache"
    cacheTag(getGlobalTag("settings"), "max")

    return prisma.setting.findFirst({
        select: {
            faviconUrl: true,
            seoDescription: true,
            seoTitle: true,
            seoKeywords: true,
            twitterUrl: true
        }
    })
}

export async function updateMantananceModeDb(
    id: string, mode: boolean) {
    return prisma.setting.update({
        where: { id },
        data: {
            isMantananceMode: mode
        },
        select: { id: true, isMantananceMode: true }
    })
}
