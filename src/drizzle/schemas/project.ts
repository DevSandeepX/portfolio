import { boolean, index, integer, json, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { categoryTable } from "./category";

const projectStatuses = [
    "in_progress",
    "complated",
    "archived"
] as const

export type ProjectStatus = typeof projectStatuses[number]
export const projectStatusEnum = pgEnum('project_statuses', projectStatuses)

export const projectTable = pgTable(
    "projects",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        title: text("title").notNull(),
        slug: text("slug").notNull().unique(),
        description: text("description"),
        image: text("featured_image"),
        github: text("github_url").notNull(),
        live: text("live_url").notNull(),
        status: projectStatusEnum("blog_status").notNull().default("complated"),
        techStack: text("tags").array().default([]),

        featured: boolean("featured").default(false),
        createdAt: timestamp("created_at", {
            withTimezone: true,
        })
            .defaultNow()
            .notNull(),

        updatedAt: timestamp("updated_at", {
            withTimezone: true,
        }).$onUpdate(() => new Date()),
        deletedAt: timestamp("deleted_at", {
            withTimezone: true,
        }),
    },
    (table) => ({
        slugIdx: uniqueIndex("project_slug_idx").on(table.slug),
    })
);

