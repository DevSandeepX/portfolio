import { cacheTag } from "next/cache";

import { getGlobalTag } from "@/lib/dbCache";
import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
    "use cache";

    cacheTag(getGlobalTag("skills"));
    cacheTag(getGlobalTag("projects"));
    cacheTag(getGlobalTag("categories"));
    cacheTag(getGlobalTag("images"));

    const [skills, projects, categories, images] = await Promise.all([
        prisma.skill.count(),
        prisma.project.count(),
        prisma.category.count(),
        prisma.image.count(),
    ]);

    return {
        skills,
        projects,
        categories,
        images,
    };
}