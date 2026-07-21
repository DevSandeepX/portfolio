import { pgTable, text, timestamp, uuid, index } from "drizzle-orm/pg-core";

export const viewTable = pgTable('views', {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    userAgent: text('user_agent'),
    ipAddress: text('ip_address').unique(),
    path: text('path'),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    createdAtIdx: index('views_created_at_idx').on(table.createdAt),
    pathIdx: index('views_path_idx').on(table.path),
    ipAddressIdx: index('views_ip_address_idx').on(table.ipAddress),
}));