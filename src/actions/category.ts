"use server";

import { revalidateCategoryCache } from "@/cache/category";
import {
    createCategoryDb,
    deleteCategoryDb,
    updateCategoryDb,
} from "@/db/category";
import { requireAdmin } from "@/lib/requireAdmin";
import type { CategoryFormInput } from "@/schemas/category";

type ActionResult = {
    success: boolean;
    message: string;
};

export async function createCategory(
    data: CategoryFormInput
): Promise<ActionResult> {
    try {
        await requireAdmin();

        const category = await createCategoryDb(data);

        await revalidateCategoryCache(category.id);

        return {
            success: true,
            message: "Category created successfully.",
        };
    } catch (error) {
        console.error("Create category error:", error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to create category.",
        };
    }
}

export async function updateCategory(
    id: string,
    data: CategoryFormInput
): Promise<ActionResult> {
    try {
        await requireAdmin();

        const categoryId = id.trim();

        if (!categoryId) {
            return {
                success: false,
                message: "Invalid category id.",
            };
        }

        await updateCategoryDb(categoryId, data);

        await revalidateCategoryCache(categoryId);

        return {
            success: true,
            message: "Category updated successfully.",
        };
    } catch (error) {
        console.error("Update category error:", error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to update category.",
        };
    }
}

export async function deleteCategory(
    id: string
): Promise<ActionResult> {
    try {
        await requireAdmin();

        const categoryId = id.trim();

        if (!categoryId) {
            return {
                success: false,
                message: "Invalid category id.",
            };
        }

        await deleteCategoryDb(categoryId);

        await revalidateCategoryCache(categoryId);

        return {
            success: true,
            message: "Category deleted successfully.",
        };
    } catch (error) {
        console.error("Delete category error:", error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to delete category.",
        };
    }
}