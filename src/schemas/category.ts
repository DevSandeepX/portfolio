import { z } from "zod"

export const categorySchema = z
    .object({
        type: z.enum(["MAIN", "SUB"]),

        parentId: z.string().optional(),

        title: z
            .string()
            .min(2, "Title must be at least 2 characters")
            .max(100, "Title is too long"),

        slug: z.string().optional(),

        description: z.string().optional(),
    })
    .refine(
        (data) => {
            if (data.type === "SUB") {
                return !!data.parentId
            }
            return true
        },
        {
            message: "Parent category is required",
            path: ["parentId"],
        }
    )

export type CategoryFormInput = z.infer<typeof categorySchema>