
import { generateSlug } from "@/lib/utils";
import { CategoryFormInput } from "@/schemas/category";


import { cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getGlobalTag, getIdTag } from "@/lib/dbCache";
import { QueryParamsProps } from "@/types/type";

export async function getPaginatedCategories({
    page = 1,
    limit = 50,
    search = "",
}: QueryParamsProps) {
    "use cache";

    cacheTag(getGlobalTag("categories"));

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

    const [categories, totalCategories] = await Promise.all([
        prisma.category.findMany({
            where,
            take,
            skip,
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                title: true,
                slug: true,
                createdAt: true,
                updatedAt: true,
            },
        }),

        prisma.category.count({
            where,
        }),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalCategories / take));

    return {
        categories,
        pagination: {
            page: currentPage,
            limit: take,
            totalItems: totalCategories,
            totalPages,
            hasNextPage: currentPage < totalPages,
            hasPreviousPage: currentPage > 1,
        },
    };
}

export async function getCategoryById(id: string) {
    "use cache";

    const categoryId = id.trim();

    if (!categoryId) {
        return null;
    }

    cacheTag(getIdTag(categoryId, "categories"));

    return prisma.category.findUnique({
        where: {
            id: categoryId,
        },
        select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            parentId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
}

export async function getAllCategories() {
    "use cache";

    cacheTag(getGlobalTag("categories"));

    return prisma.category.findMany({
        orderBy: {
            title: "asc",
        },
        select: {
            id: true,
            title: true,
        },
    });
}

export async function createCategoryDb(data: CategoryFormInput) {
    const { title, slug, type, parentId, description } = data;

    return prisma.category.create({
        data: {
            title,
            slug: slug || generateSlug(title),
            description,
            parentId: type === "SUB" ? parentId : null,
        },
        select: {
            id: true
        }
    });
}

export async function updateCategoryDb(
    id: string,
    data: Partial<CategoryFormInput>
) {
    const { type, slug, title, description, parentId } = data

    return prisma.category.update({
        where: { id },
        data: {
            title,
            description,
            slug,
            parentId: type === "SUB" ? parentId : null
        },
        select: {
            id: true
        }
    });
}

export async function deleteCategoryDb(
    id: string,

) {
    return prisma.category.delete({
        where: { id },
        select: {
            id: true
        }
    });
}