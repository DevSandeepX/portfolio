// import { cacheTag } from "next/cache";

import { getGlobalTag } from "@/lib/dbCache";
import { prisma } from "@/lib/prisma";
import { QueryParamsProps } from "@/types/type";
import { cacheTag } from "next/cache";
const RECENT_IMAGE_LIMIT = 8;


export async function getRecentImages() {
    "use cache";
    cacheTag(getGlobalTag("images"));

    return prisma.image.findMany({
        take: RECENT_IMAGE_LIMIT,
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            url: true,
            createdAt: true,
        },
    });
}
export async function getAdminImages({
    limit = 20,
    page = 1,
}: QueryParamsProps) {
    "use cache";
    cacheTag(getGlobalTag("projectImages"));
    const skip = (page - 1) * limit;

    const [images, total] = await Promise.all([
        prisma.image.findMany({

            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                url: true,
            },
        }),

        prisma.image.count({})]
    )

    return {
        data: images,
        hasMore: skip + limit < total,
        totalPages: Math.floor(total / limit),
        total,
    };
}

export async function getPublishedImages({
    limit = 20,
    page = 1,
}: QueryParamsProps) {

    "use cache";
    cacheTag(getGlobalTag("projectImages"));
    const skip = (page - 1) * limit;

    const [images, total] = await Promise.all([
        prisma.projectImage.findMany({
            where: {
                project: {
                    isPublished: true,
                },
            },
            skip,
            take: limit,
            orderBy: {
                project: {
                    createdAt: "desc",
                },
            },
            select: {
                image: {
                    select: {
                        id: true,
                        url: true,
                    },
                },
            },
        }),

        prisma.projectImage.count({
            where: {
                project: {
                    isPublished: true,
                },
            },
        }),
    ]);

    return {
        data: images.map(({ image }) => image),
        hasMore: skip + limit < total,
        totalPages: Math.floor(total / limit),
        total,
    };
}