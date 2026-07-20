import {
    pgTable,
    text,
    timestamp,
    pgEnum,
} from "drizzle-orm/pg-core";

export const themeEnum = pgEnum("theme", [
    "LIGHT",
    "DARK",
    "SYSTEM",
]);

export const settingTable = pgTable("settings", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),

    // Site Information
    title: text("title").notNull(),
    tagline: text("tagline"),
    description: text("description"),

    // Hero CTA
    primaryCta: text("primary_cta"),
    primaryCtaUrl: text("primary_cta_url"),

    secondaryCta: text("secondary_cta"),
    secondaryCtaUrl: text("secondary_cta_url"),

    // Theme
    theme: themeEnum("theme").default("SYSTEM").notNull(),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});