import { cacheTag } from "next/cache";

import { getGlobalTag, getIdTag } from "@/lib/dbCache";
import { prisma } from "@/lib/prisma";
import { User } from "@/actions/user";

export async function upsertUserDb(data: User) {
    const clerkId = data.clerkId.trim();

    if (!clerkId) {
        throw new Error("Invalid Clerk user id.");
    }

    return prisma.user.upsert({
        where: {
            clerkId,
        },
        create: {
            ...data,
            clerkId,
        },
        update: {
            ...data,
            clerkId,
        },
    });
}

export async function deleteUserDb(clerkId: string) {
    const id = clerkId.trim();

    if (!id) {
        throw new Error("Invalid Clerk user id.");
    }

    return prisma.user.delete({
        where: {
            clerkId: id,
        },
    });
}

export async function getUser(clerkId: string) {
    "use cache";

    const id = clerkId.trim();

    if (!id) {
        return null;
    }

    cacheTag(getGlobalTag("users"));
    cacheTag(getIdTag(id, "users"));

    return prisma.user.findUnique({
        where: {
            clerkId: id,
        },
        select: {
            id: true,
            clerkId: true,
            name: true,
            email: true,
            role: true,
        },
    });
}