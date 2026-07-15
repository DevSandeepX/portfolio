"use server";

import { deleteUserDb, upsertUserDb } from "@/db/user";
import { UserRole } from "@/generated/prisma/enums";

export type User = {
    clerkId: string;
    name?: string;
    email: string;
    avatarUrl?: string;
    role: UserRole;
};

type ActionResult<T = void> = {
    success: boolean;
    message: string;
    data?: T;
};

export async function upsertUser(
    data: User
): Promise<ActionResult> {
    try {
        if (!data.clerkId.trim()) {
            return {
                success: false,
                message: "Invalid Clerk user id.",
            };
        }

        await upsertUserDb(data);

        return {
            success: true,
            message: "User synchronized successfully.",
        };
    } catch (error) {
        console.error("Upsert user error:", error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to synchronize user.",
        };
    }
}

export async function deleteUser(
    clerkId: string
): Promise<ActionResult> {
    try {
        const id = clerkId.trim();

        if (!id) {
            return {
                success: false,
                message: "Invalid Clerk user id.",
            };
        }

        await deleteUserDb(id);

        return {
            success: true,
            message: "User deleted successfully.",
        };
    } catch (error) {
        console.error("Delete user error:", error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to delete user.",
        };
    }
}