import z from "zod"


export const appSettingSchema = z.object({
    siteTitle: z
        .string()
        .trim()
        .min(2, "Site title must be at least 2 characters.")
        .max(100, "Site title must be less than 100 characters."),

    siteDescription: z
        .string()
        .trim()
        .max(300, "Description must be less than 300 characters.")
        .nullable()
        .optional(),

    siteUrl: z
        .string()
        .trim()
        .url("Please enter a valid website URL.")
        .nullable()
        .optional()
        .or(z.literal("")),

    faviconUrl: z
        .string()
        .trim()
        .url("Please enter a valid favicon URL.")
        .nullable()
        .optional()
        .or(z.literal("")),

    seoTitle: z
        .string()
        .trim()
        .max(70, "SEO title should be under 70 characters.")
        .nullable()
        .optional(),

    seoDescription: z
        .string()
        .trim()
        .max(160, "SEO description should be under 160 characters.")
        .nullable()
        .optional(),

    seoKeywords: z
        .string()
        .trim()
        .nullable()
        .optional(),

    fullName: z
        .string()
        .trim()
        .min(2, "Full name is required."),

    designation: z
        .string()
        .trim()
        .min(2, "Designation is required."),
    experienceYears: z
        .number()
        .min(1, "Designation is required.")
        .nullable()
        .optional(),

    email: z
        .string()
        .trim()
        .email("Please enter a valid email.")
        .nullable()
        .optional()
        .or(z.literal("")),

    phone: z
        .string()
        .trim()
        .nullable()
        .optional(),

    location: z
        .string()
        .trim()
        .nullable()
        .optional(),

    profileImage: z
        .string()
        .trim()
        .url("Please enter a valid image URL.")
        .nullable()
        .optional()
        .or(z.literal("")),

    resumeUrl: z
        .string()
        .trim()
        .url("Please enter a valid resume URL.")
        .nullable()
        .optional()
        .or(z.literal("")),
    githubUrl: z
        .string()
        .trim()
        .url("Please enter a valid GitHub URL.")
        .nullable()
        .optional()
        .or(z.literal("")),

    linkedinUrl: z
        .string()
        .trim()
        .url("Please enter a valid LinkedIn URL.")
        .nullable()
        .optional()
        .or(z.literal("")),

    twitterUrl: z
        .string()
        .trim()
        .url("Please enter a valid Twitter/X URL.")
        .nullable()
        .optional()
        .or(z.literal("")),

    instagramUrl: z
        .string()
        .trim()
        .url("Please enter a valid Instagram URL.")
        .nullable()
        .optional()
        .or(z.literal("")),

    youtubeUrl: z
        .string()
        .trim()
        .url("Please enter a valid YouTube URL.")
        .nullable()
        .optional()
        .or(z.literal("")),

    facebookUrl: z
        .string()
        .trim()
        .url("Please enter a valid Facebook URL.")
        .nullable()
        .optional()
        .or(z.literal("")),

    isAvailableForWork: z.boolean(),
});

export type AppSettingFormInput = z.infer<typeof appSettingSchema>;