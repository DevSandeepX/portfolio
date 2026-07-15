import { revalidateTag } from "next/cache"

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

export function revalidateFullCache() {
    revalidateTag(getGlobalTag("images"), "max")
    revalidateTag(getGlobalTag("projects"), "max")
    revalidateTag(getGlobalTag("skills"), "max")
    revalidateTag(getGlobalTag("users"), "max")
    revalidateTag(getGlobalTag("projectImages"), "max")
}

