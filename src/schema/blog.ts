import { z } from "zod";

export const blogSchema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters")
        .max(100, "Title is too long"),

    slug: z
        .string()
        .min(5, "Slug is required")
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Slug must contain only lowercase letters, numbers and hyphens"
        ),

    excerpt: z
        .string()
        .max(300, "Excerpt should be less than 300 characters")
        .default(""),

    image: z
        .string()
        .default(""),

    status: z.enum([
        "draft",
        "scheduled",
        "published",
        "archived",
    ]),

    categoryId: z
        .string()
        .uuid("Please select a valid category"),

    content: z
        .any()
        .refine(
            (value) => value && Object.keys(value).length > 0,
            "Content is required"
        ),

    tags: z
        .array(z.string())
        .default([]),

    readTime: z
        .number()
        .int()
        .nonnegative()
        .default(0),

    featured: z
        .boolean()
        .default(false),

    keywords: z
        .array(z.string())
        .default([]),


    // SEO

    seoTitle: z
        .string()
        .max(60, "SEO title should be under 60 characters")
        .default(""),

    seoDescription: z
        .string()
        .max(160, "SEO description should be under 160 characters")
        .default(""),

    seoKeywords: z
        .array(z.string())
        .default([]),

    canonicalUrl: z
        .string()
        .default(""),

    allowComments: z
        .boolean()
        .default(true),

    publishedAt: z
        .date()
        .optional(),
});

export type BlogFormInput = z.input<typeof blogSchema>;
export type BlogFormOutput = z.output<typeof blogSchema>;