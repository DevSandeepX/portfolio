
import { db } from "@/drizzle/db";
import { viewTable } from "@/drizzle/schema";
import { headers } from "next/headers";


export const MUTATIONS = {
    insertView: async (data: typeof viewTable.$inferInsert) => {
        const result = await db
            .insert(viewTable)
            .values(data)

            .onConflictDoNothing({ target: viewTable.ipAddress })
            .returning()
        return result[0] ?? null;
    },
};