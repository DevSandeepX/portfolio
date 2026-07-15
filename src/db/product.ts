
import { getGlobalTag, getIdTag } from "@/lib/dbCache";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/utils";
import { projectSchema } from "@/schemas/project";
import { QueryParamsProps } from "@/types/type";
import { cacheTag } from "next/cache";
import z from "zod"



export async function getPaginatedProjects({
    page = 1,
    limit = 50,
    search = "",
}: QueryParamsProps) {
    "use cache";

    cacheTag(getGlobalTag("projects"));

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

    const [projects, totalProjects] = await Promise.all([
        prisma.project.findMany({
            where,
            skip,
            take,
            orderBy: [
                {
                    order: "asc",
                },
                {
                    createdAt: "desc",
                },
            ],
            select: {
                id: true,
                title: true,
                slug: true,
                order: true,
                githubUrl: true,
                liveUrl: true,
                isFeatured: true,
                isPublished: true,
                createdAt: true,
                updatedAt: true,
            },
        }),

        prisma.project.count({
            where,
        }),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalProjects / take));

    return {
        projects,
        pagination: {
            page: currentPage,
            limit: take,
            totalItems: totalProjects,
            totalPages,
            hasNextPage: currentPage < totalPages,
            hasPreviousPage: currentPage > 1,
        },
    };
}

export async function getPaginatedPublicProjects({
    page = 1,
    limit = 50,
    search = "",
}: QueryParamsProps) {
    "use cache";

    cacheTag(getGlobalTag("projects"));

    const currentPage = Math.max(1, Number(page) || 1);
    const take = Math.min(Math.max(Number(limit) || 50, 1), 100);
    const skip = (currentPage - 1) * take;
    const keyword = search.trim();

    const where = {
        isPublished: true,
        ...(keyword && {
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
        }),
    };

    const [projects, totalProjects] = await Promise.all([
        prisma.project.findMany({
            where,
            skip,
            take,
            orderBy: [
                {
                    order: "asc",
                },
                {
                    createdAt: "desc",
                },
            ],
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                order: true,
                githubUrl: true,
                liveUrl: true,
                isFeatured: true,
                createdAt: true,
                updatedAt: true,
                projectImages: {
                    select: {
                        image: {
                            select: {
                                id: true,
                                url: true,
                            },
                        },
                    },
                },
            },
        }),

        prisma.project.count({
            where,
        }),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalProjects / take));

    return {
        projects,
        pagination: {
            page: currentPage,
            limit: take,
            totalItems: totalProjects,
            totalPages,
            hasNextPage: currentPage < totalPages,
            hasPreviousPage: currentPage > 1,
        },
    };
}

export async function getFeaturedProjects({
    limit = 50,
}: QueryParamsProps) {
    "use cache";

    cacheTag(getGlobalTag("projects"));

    const take = Math.min(Math.max(Number(limit) || 50, 1), 100);

    return prisma.project.findMany({
        where: {
            isFeatured: true,
            isPublished: true,
        },
        take,
        orderBy: [
            {
                order: "asc",
            },
            {
                updatedAt: "desc",
            },
        ],
        select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            order: true,
            githubUrl: true,
            liveUrl: true,
            createdAt: true,
            updatedAt: true,
            projectImages: {
                select: {
                    image: {
                        select: {
                            id: true,
                            url: true,
                        },
                    },
                },
            },
        },
    });
}

export async function createProjectDb(
    data: z.infer<typeof projectSchema>
) {
    const title = data.title.trim();

    return prisma.project.create({
        data: {
            ...data,
            title,
            slug: generateSlug(title),
        },
        select: {
            id: true,
        },
    });
}

export async function updateProjectDb(
    id: string,
    data: Partial<z.infer<typeof projectSchema>>
) {
    const projectId = id.trim();

    if (!projectId) {
        throw new Error("Invalid project id.");
    }

    if (Object.keys(data).length === 0) {
        throw new Error("No project data provided.");
    }

    return prisma.project.update({
        where: {
            id: projectId,
        },
        data,
        select: {
            id: true,
        },
    });
}

export async function getProject(id: string) {
    "use cache";

    const projectId = id.trim();

    if (!projectId) {
        return null;
    }

    cacheTag(getIdTag(projectId, "projects"));

    return prisma.project.findUnique({
        where: {
            id: projectId,
        },
        select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            order: true,
            githubUrl: true,
            liveUrl: true,
            isFeatured: true,
            isPublished: true,
            createdAt: true,
            updatedAt: true,
            projectImages: {
                select: {
                    id: true,
                    image: {
                        select: {
                            id: true,
                            url: true,
                        },
                    },
                },
            },
        },
    });
}

export async function createProjectImagesDb(
    projectId: string,
    urls: string[]
) {
    const id = projectId.trim();

    if (!id) {
        throw new Error("Invalid project id.");
    }

    if (urls.length === 0) {
        return;
    }

    return prisma.$transaction(async (tx) => {
        await Promise.all(
            urls.map(async (url) => {
                const image = await tx.image.create({
                    data: {
                        url,
                    },
                    select: {
                        id: true,
                    },
                });

                await tx.projectImage.create({
                    data: {
                        projectId: id,
                        imageId: image.id,
                    },
                });
            })
        );
    });
}

export async function deleteProjectImageDb(
    projectImageId: string
) {
    const id = projectImageId.trim();

    if (!id) {
        throw new Error("Invalid project image id.");
    }

    return prisma.$transaction(async (tx) => {
        const projectImage = await tx.projectImage.delete({
            where: {
                id,
            },
            select: {
                imageId: true,
                projectId: true,
            },
        });

        await tx.image.delete({
            where: {
                id: projectImage.imageId,
            },
        });

        return projectImage;
    });
}

export async function deleteProjectDb(id: string) {
    const projectId = id.trim();

    if (!projectId) {
        throw new Error("Invalid project id.");
    }

    return prisma.project.delete({
        where: {
            id: projectId,
        },
        select: {
            id: true,
        },
    });
}



export async function getPublicProjectBySlug(slug: string) {
    "use cache";

    const projectSlug = slug.trim();

    if (!projectSlug) {
        return null;
    }

    const project = await prisma.project.findFirst({
        where: {
            slug: projectSlug,
            isPublished: true,
        },
        select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            githubUrl: true,
            liveUrl: true,
            order: true,
            createdAt: true,
            updatedAt: true,
            isFeatured: true,
            isPublished: true,
            projectImages: {
                select: {
                    image: {
                        select: {
                            id: true,
                            url: true,
                        },
                    },
                },
            },
        },
    });

    if (!project) {
        return null;
    }

    cacheTag(getIdTag(project.id, "projects"));

    return {
        ...project,
        images: project.projectImages.map(({ image }) => image),
    };
}

const RECENT_PROJECT_LIMIT = 4;

export async function getRecentProjects() {
    "use cache";

    cacheTag(getGlobalTag("projects"));

    const projects = await prisma.project.findMany({
        take: RECENT_PROJECT_LIMIT,
        orderBy: [
            {
                createdAt: "desc",
            },
            {
                id: "desc",
            },
        ],
        select: {
            id: true,
            title: true,
            isPublished: true,
            createdAt: true,
            projectImages: {
                take: 1,
                select: {
                    image: {
                        select: {
                            id: true,
                            url: true,
                        },
                    },
                },
            },
        },
    });

    return projects.map((project) => ({
        id: project.id,
        title: project.title,
        isPublished: project.isPublished,
        imageUrl: project.projectImages[0]?.image.url ?? null,
        createdAt: project.createdAt,
    }));
}