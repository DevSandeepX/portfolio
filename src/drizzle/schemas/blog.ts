import { boolean, index, integer, json, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
const blogStatuses = [
    "draft",
    "scheduled",
    "published",
    "archived"
] as const
export type BlogStatus = typeof blogStatuses[number]
export const blogStatusEnum = pgEnum('blog_statuses', blogStatuses)

export const blogTable = pgTable(
    "blogs",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        title: text("title").notNull(),
        slug: text("slug").notNull().unique(),
        excerpt: text("excerpt"),
        image: text("featured_image"),
        status: blogStatusEnum("blog_status").notNull().default("draft"),
        categoryId: uuid('category_id').notNull(),
        content: json("content").notNull(),

        authorId: text("author_id").notNull(),
        tags: text("tags").array().default([]),
        readTime: integer("read_time"),
        featured: boolean("featured").default(false),
        keywords: text("keywords").array(),

        seoTitle: text("seo_title"),
        seoDescription: text("seo_description"),
        seoKeywords: text("seo_keywords").array(),
        canonicalUrl: text("canonical_url"),
        allowComments: boolean("allow_comments").default(true),

        publishedAt: timestamp("published_at", {
            withTimezone: true,
        }),
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
        slugIdx: uniqueIndex("blog_slug_idx").on(table.slug),
        categoryIdx: index("blog_category_idx").on(table.categoryId),
        authorIdx: index("blog_author_idx").on(table.authorId),
        publishedIdx: index("blog_published_idx").on(table.publishedAt),
    })
);

