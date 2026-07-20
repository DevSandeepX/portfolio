import { index, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { blogTable } from "./blog";

export const categoryTable = pgTable(
    "categories",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        name: text("name").notNull(),
        slug: text("slug").notNull().unique(),

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
        slugIdx: uniqueIndex("category_slug_idx").on(table.slug),
        nameIdx: index("category_name_idx").on(table.name),
    })
);

