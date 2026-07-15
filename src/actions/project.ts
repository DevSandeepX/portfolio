"use server";

import { revalidateProjectCache } from "@/cache/project";
import {
    createProjectDb,
    createProjectImagesDb,
    deleteProjectDb,
    deleteProjectImageDb,
    updateProjectDb,
} from "@/db/product";
import { requireAdmin } from "@/lib/requireAdmin";
import { projectSchema, projectSettingSchema } from "@/schemas/project";
import { z } from "zod";

type ActionResult<T = void> = {
    success: boolean;
    message: string;
    data?: T;
};

export async function createProject(
    data: z.infer<typeof projectSchema>
): Promise<ActionResult<{ id: string }>> {
    try {
        await requireAdmin();

        const project = await createProjectDb(data);

        await revalidateProjectCache(project.id);

        return {
            success: true,
            data: project,
            message: "Project created successfully.",
        };
    } catch (error) {
        console.error("Create project error:", error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to create project.",
        };
    }
}

export async function updateProject(
    id: string,
    data: z.infer<typeof projectSettingSchema>,
    { files }: { files?: string[] } = {}
): Promise<ActionResult<{ id: string }>> {
    try {
        await requireAdmin();

        const projectId = id.trim();

        if (!projectId) {
            return {
                success: false,
                message: "Invalid project id.",
            };
        }

        const project = await updateProjectDb(projectId, data);

        if (files?.length) {
            await createProjectImagesDb(project.id, files);
        }

        await revalidateProjectCache(project.id);

        return {
            success: true,
            data: project,
            message: "Project updated successfully.",
        };
    } catch (error) {
        console.error("Update project error:", error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to update project.",
        };
    }
}

export async function addProjectImages(
    projectId: string,
    urls: string[]
): Promise<ActionResult> {
    try {
        await requireAdmin();

        const id = projectId.trim();

        if (!id) {
            return {
                success: false,
                message: "Invalid project id.",
            };
        }

        if (!urls.length) {
            return {
                success: false,
                message: "Please upload at least one image.",
            };
        }

        await createProjectImagesDb(id, urls);

        await revalidateProjectCache(id);

        return {
            success: true,
            message: "Project images added successfully.",
        };
    } catch (error) {
        console.error("Add project images error:", error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to add project images.",
        };
    }
}

export async function deleteProjectImage(
    projectImageId: string
): Promise<ActionResult> {
    try {
        await requireAdmin();

        const id = projectImageId.trim();

        if (!id) {
            return {
                success: false,
                message: "Invalid project image id.",
            };
        }

        const projectImage = await deleteProjectImageDb(id);

        await revalidateProjectCache(projectImage.projectId);

        return {
            success: true,
            message: "Project image deleted successfully.",
        };
    } catch (error) {
        console.error("Delete project image error:", error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to delete project image.",
        };
    }
}

export async function deleteProject(
    id: string
): Promise<ActionResult> {
    try {
        await requireAdmin();

        const projectId = id.trim();

        if (!projectId) {
            return {
                success: false,
                message: "Invalid project id.",
            };
        }

        const project = await deleteProjectDb(projectId);

        await revalidateProjectCache(project.id);

        return {
            success: true,
            message: "Project deleted successfully.",
        };
    } catch (error) {
        console.error("Delete project error:", error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to delete project.",
        };
    }
}