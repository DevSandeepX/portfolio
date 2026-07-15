import { Prisma } from "@/generated/prisma/client";
import { cacheTag } from "next/cache";

import { getGlobalTag, getIdTag } from "@/lib/dbCache";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/utils";
import { SkillFormInput } from "@/schemas/skill";
import { QueryParamsProps } from "@/types/type";

export async function getPaginatedSkills({
    page = 1,
    limit = 50,
    search = "",
}: QueryParamsProps) {
    "use cache";

    cacheTag(getGlobalTag("skills"));

    const currentPage = Math.max(1, Number(page) || 1);
    const take = Math.min(Math.max(Number(limit) || 50, 1), 100);
    const skip = (currentPage - 1) * take;
    const keyword = search.trim();

    const where =
        keyword.length > 0
            ? {
                OR: [
                    {
                        title: {
                            contains: keyword,
                            mode: "insensitive" as const,
                        },
                    },
                    {
                        description: {
                            contains: keyword,
                            mode: "insensitive" as const,
                        },
                    },
                ],
            }
            : undefined;

    const [skills, totalSkills] = await Promise.all([
        prisma.skill.findMany({
            where,
            skip,
            take,
            orderBy: [
                {
                    title: "asc",
                },
                {
                    createdAt: "desc",
                },
            ],
            select: {
                id: true,
                title: true,
                slug: true,
                createdAt: true,
                updatedAt: true,
                category: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        }),

        prisma.skill.count({
            where,
        }),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalSkills / take));

    return {
        skills,
        pagination: {
            page: currentPage,
            limit: take,
            totalItems: totalSkills,
            totalPages,
            hasNextPage: currentPage < totalPages,
            hasPreviousPage: currentPage > 1,
        },
    };
}

export async function createSkillDb(data: SkillFormInput) {
    const title = data.title.trim();

    return prisma.skill.create({
        data: {
            ...data,
            title,
            slug: generateSlug(title),
        },
        select: {
            id: true,
            categoryId: true,
        },
    });
}

export async function updateSkillDb(
    id: string,
    data: Partial<SkillFormInput>
) {
    const skillId = id.trim();

    if (!skillId) {
        throw new Error("Invalid skill id.");
    }

    if (Object.keys(data).length === 0) {
        throw new Error("No skill data provided.");
    }

    return prisma.skill.update({
        where: {
            id: skillId,
        },
        data: {
            ...data,
            ...(data.title && {
                title: data.title.trim(),
            }),
        },
        select: {
            id: true,
            categoryId: true,
        },
    });
}

export async function deleteSkillDb(id: string) {
    const skillId = id.trim();

    if (!skillId) {
        throw new Error("Invalid skill id.");
    }

    return prisma.skill.delete({
        where: {
            id: skillId,
        },
        select: {
            id: true,
            categoryId: true,
        },
    });
}

export async function getSkillById(id: string) {
    "use cache";

    const skillId = id.trim();

    if (!skillId) {
        return null;
    }

    cacheTag(getIdTag(skillId, "skills"));

    return prisma.skill.findUnique({
        where: {
            id: skillId,
        },
        select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            categoryId: true,
        },
    });
}

export type CategoryWithChildren = Prisma.CategoryGetPayload<{
    include: {
        children: {
            include: {
                skills: true;
            };
        };
    };
}>;

export async function getCategoriesWithSkills(): Promise<CategoryWithChildren[]> {
    "use cache";

    cacheTag(getGlobalTag("categories"));
    cacheTag(getGlobalTag("skills"));

    return prisma.category.findMany({
        where: {
            parentId: null,
        },
        orderBy: {
            title: "asc",
        },
        include: {
            children: {
                orderBy: {
                    title: "asc",
                },
                include: {
                    skills: {
                        orderBy: {
                            title: "asc",
                        },
                    },
                },
            },
        },
    });
}