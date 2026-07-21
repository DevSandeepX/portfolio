import { startOfMonth, subMonths } from "date-fns";
import { db } from "@/drizzle/db";
import { blogTable, projectTable, viewTable } from "@/drizzle/schema";
import { and, gte, lt, sql } from "drizzle-orm";

export const ANALITICS_QUERIES = {
    getVisitoresGrothStats: async () => {
        const [currentMonth, previousMonth] = await Promise.all([
            await db
                .select({
                    count: sql<number>`count(*)`,
                })
                .from(viewTable)
            ,
            db
                .select({
                    count: sql<number>`count(*)`,
                })
                .from(viewTable)
                .where(
                    and(
                        gte(viewTable.createdAt, startOfMonth(subMonths(new Date(), 1))),
                        lt(viewTable.createdAt, startOfMonth(new Date()))
                    )
                )
        ])




        const current = Number(currentMonth[0]?.count ?? 0);
        const previous = Number(previousMonth[0]?.count ?? 0);
        const change =
            previous === 0
                ? current
                : ((current - previous))

        return {
            change,
            current,
            previous
        }
    },
    getProjectsGrothStats: async () => {
        const [currentMonth, previousMonth] = await Promise.all([
            await db
                .select({
                    count: sql<number>`count(*)`,
                })
                .from(projectTable)
            ,
            db
                .select({
                    count: sql<number>`count(*)`,
                })
                .from(projectTable)
                .where(
                    and(
                        gte(projectTable.createdAt, startOfMonth(subMonths(new Date(), 1))),
                        lt(projectTable.createdAt, startOfMonth(new Date()))
                    )
                )
        ])




        const current = currentMonth[0].count;
        const previous = previousMonth[0].count;
        const change =
            previous === 0
                ? current
                : ((current - previous))


        return {
            change,
            current,
            previous
        }
    },
    getPostsGrothStats: async () => {
        const [currentMonth, previousMonth] = await Promise.all([
            await db
                .select({
                    count: sql<number>`count(*)`,
                })
                .from(blogTable)
            ,
            db
                .select({
                    count: sql<number>`count(*)`,
                })
                .from(blogTable)
                .where(
                    and(
                        gte(blogTable.createdAt, startOfMonth(subMonths(new Date(), 1))),
                        lt(blogTable.createdAt, startOfMonth(new Date()))
                    )
                )
        ])




        const current = currentMonth[0].count;
        const previous = previousMonth[0].count;
        const change =
            previous === 0
                ? current
                : ((current - previous))


        return {
            change,
            current,
            previous
        }
    },

    getVisitoresGrothData: async () => {
        const month = sql`date_trunc('month', ${viewTable.createdAt})`;

        return db
            .select({
                month: sql<string>`to_char(${month}, 'Mon')`,
                visitors: sql<number>`count(*)`,
            })
            .from(viewTable)
            .groupBy(month)
            .orderBy(month);

    }

}