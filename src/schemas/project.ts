import z from "zod"
export const projectSchema = z.object({
    title: z.string().min(1, "Required"),
    description: z.string().optional()
})


export const projectSettingSchema = z.object({

    title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title must be less than 100 characters"),

    description: z
        .string()
        .max(1000, "Description must be less than 1000 characters")
        .optional(),

    githubUrl: z
        .string()
        .url("Enter a valid GitHub URL")
        .nullable()
        .optional(),

    liveUrl: z
        .string()
        .url("Enter a valid Live URL")
        .nullable()
        .optional(),

    isPublished: z.boolean(),

    isFeatured: z.boolean(),

});