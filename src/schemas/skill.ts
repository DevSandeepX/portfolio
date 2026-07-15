import { z } from "zod";

export const skillSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    categoryId: z.string().min(1, "Please select a category"),
});

export type SkillFormInput = z.infer<typeof skillSchema>;