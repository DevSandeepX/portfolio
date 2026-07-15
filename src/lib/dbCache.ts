import { revalidatePath, revalidateTag } from "next/cache"

export const CACHE_TAGS = [
    'projects',
    'skills',
    'users',
    'projectImages',
    'images',
    'categories',
    "approvals",
    "settings"
] as const


export type ValidTag = typeof CACHE_TAGS[number]

export function getGlobalTag(tag: ValidTag) {
    return `global:${tag}` as const
}

export function getIdTag(id: string, tag: ValidTag) {
    return `id:${id}-${tag}` as const
}

export function getProjectTag(projectId: string, tag: ValidTag) {
    return `project:${projectId}-${tag}` as const
}

export async function revalidateFullCache() {
    // Revalidate all tags
    Object.values(CACHE_TAGS).forEach(async (tag) => {
        await revalidateTag(tag, "max");
    });

    // Revalidate important pages
    const paths = [
        "/",
        "/about",
        "/projects",
        "/contact",
        "/skills",
        "/blog",
        "/gallery",
        "/dashboard",
        "/dashboard/projects",
        "/dashboard/images",
        "/dashboard/settings",
        "/dashboard/skills",
        "/dashboard/categories",
    ];

    paths.forEach((path) => {
        revalidatePath(path);
    });
}

