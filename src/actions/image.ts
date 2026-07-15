"use server"

import { getAdminImages, getPublishedImages } from "@/db/image";
import { QueryParamsProps } from "@/types/type";

export async function getPaginatedPublishedGalleryImages({
    limit = 20,
    page = 1,
}: QueryParamsProps) {
    return getPublishedImages({ limit, page })
}
export async function getPaginatedAdminGalleryImages({
    limit = 20,
    page = 1,
}: QueryParamsProps) {
    return getAdminImages({ limit, page })
}