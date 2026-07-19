import { boolean, index, integer, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const blogTable = pgTable(
    "blogs",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        title: text("title").notNull(),
        slug: text("slug").notNull().unique(),
        excerpt: text("excerpt"),
        image: text("featured_image"),
        categoryId: uuid("category_id").notNull(),
        authorId: uuid("author_id").notNull(),
        readTime: integer("read_time").default(5),
        featured: boolean("featured").default(false),
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
    },
    (table) => ({
        slugIdx: uniqueIndex("blog_slug_idx").on(table.slug),
        categoryIdx: index("blog_category_idx").on(table.categoryId),
        authorIdx: index("blog_author_idx").on(table.authorId),
        publishedIdx: index("blog_published_idx").on(table.publishedAt),
    })
);

