"use server";

import { revalidateSkillCache } from "@/cache/skill";
import {
    createSkillDb,
    deleteSkillDb,
    updateSkillDb,
} from "@/db/skill";
import { requireAdmin } from "@/lib/requireAdmin";
import type { SkillFormInput } from "@/schemas/skill";

type ActionResult = {
    success: boolean;
    message: string;
};

export async function createSkill(
    data: SkillFormInput
): Promise<ActionResult> {
    try {
        await requireAdmin();

        const skill = await createSkillDb(data);

        await revalidateSkillCache(skill.id, skill.categoryId);

        return {
            success: true,
            message: "Skill created successfully.",
        };
    } catch (error) {
        console.error("Create skill error:", error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to create skill.",
        };
    }
}

export async function updateSkill(
    id: string,
    data: SkillFormInput
): Promise<ActionResult> {
    try {
        await requireAdmin();

        const skillId = id.trim();

        if (!skillId) {
            return {
                success: false,
                message: "Invalid skill id.",
            };
        }

        const skill = await updateSkillDb(skillId, data);

        await revalidateSkillCache(skill.id, skill.categoryId);

        return {
            success: true,
            message: "Skill updated successfully.",
        };
    } catch (error) {
        console.error("Update skill error:", error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to update skill.",
        };
    }
}

export async function deleteSkill(
    id: string
): Promise<ActionResult> {
    try {
        await requireAdmin();

        const skillId = id.trim();

        if (!skillId) {
            return {
                success: false,
                message: "Invalid skill id.",
            };
        }

        const skill = await deleteSkillDb(skillId);

        await revalidateSkillCache(skill.id, skill.categoryId);

        return {
            success: true,
            message: "Skill deleted successfully.",
        };
    } catch (error) {
        console.error("Delete skill error:", error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to delete skill.",
        };
    }
}

