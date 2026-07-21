import { pgTable, uuid, timestamp, text, index } from "drizzle-orm/pg-core";

export const activityTable = pgTable("activities", {
    id: uuid("id").defaultRandom().primaryKey(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
    timeIdx: index("activity_time_idx").on(table.createdAt),
}));