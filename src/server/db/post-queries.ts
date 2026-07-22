import { db } from "@/drizzle/db";
import { blogTable, categoryTable } from "@/drizzle/schema";
import { arrayContains, count, desc, eq, ilike, or } from "drizzle-orm";

export const POSTQUERIES = {
    getAllPosts: async ({
        page,
        limit,
        q,
    }: {
        page: number;
        limit: number;
        q: string;
    }) => {
        const offset = (page - 1) * limit;

        const whereClause = q
            ? or(
                ilike(blogTable.title, `%${q}%`),
                arrayContains(blogTable.tags, [q])
            )
            : undefined;

        const [posts, [{ totalPosts }]] = await Promise.all([
            db
                .select()
                .from(blogTable)
                .where(whereClause)
                .offset(offset)
                .limit(limit),

            db
                .select({
                    totalPosts: count(),
                })
                .from(blogTable)
                .where(whereClause),
        ]);

        const totalPages = Math.ceil(totalPosts / limit);

        return {
            posts,
            pagination: {
                page,
                limit,
                totalPosts,
                totalPages,
                hasNext: page * limit < totalPages,
                hasPrevious: page > 1,
            },
        };
    },
    getPostBySlug: async (slug: string) => {


        const [post] = await db
            .select({
                id: blogTable.id,
                title: blogTable.title,
                slug: blogTable.slug,
                excerpt: blogTable.excerpt,
                content: blogTable.content,
                publishedAt: blogTable.publishedAt,
                readTime: blogTable.readTime,
                featured: blogTable.featured,
                tags: blogTable.tags,
                image: blogTable.image,
                createdAt: blogTable.createdAt,

                category: {
                    id: categoryTable.id,
                    name: categoryTable.name,
                    slug: categoryTable.slug,
                },
            })
            .from(blogTable)

            .leftJoin(
                categoryTable,
                eq(blogTable.categoryId, categoryTable.id)
            )
            .where(eq(blogTable.slug, slug));

        return post;
    },

    getRecentPosts: async () => {
        return db
            .select({
                id: blogTable.id,
                title: blogTable.title,
                status: blogTable.status,
                createdAt: blogTable.createdAt,
            })
            .from(blogTable)
            .orderBy(desc(blogTable.createdAt))
            .limit(3)
    },

    getAdminPosts: async ({
        page,
        limit,
        q,
    }: {
        page: number;
        limit: number;
        q: string;
    }) => {
        const offset = (page - 1) * limit;

        const whereClause = q
            ? or(
                ilike(blogTable.title, `%${q}%`),
                arrayContains(blogTable.tags, [q])
            )
            : undefined;

        const [posts, [{ totalPosts }]] = await Promise.all([
            db
                .select({
                    id: blogTable.id,
                    title: blogTable.title,
                    slug: blogTable.slug,
                    featured: blogTable.featured,
                    image: blogTable.image,
                    allowComments: blogTable.allowComments,
                    status: blogTable.status,
                    createdAt: blogTable.createdAt,
                    publishedAt: blogTable.publishedAt,
                    created: blogTable.createdAt,
                    category: categoryTable.name,
                })
                .from(blogTable)
                .leftJoin(
                    categoryTable,
                    eq(blogTable.categoryId, categoryTable.id)
                )
                .where(whereClause)
                .offset(offset)
                .limit(limit),

            db
                .select({
                    totalPosts: count(),
                })
                .from(blogTable)
                .where(whereClause),
        ]);

        const totalPages = Math.ceil(totalPosts / limit);

        return {
            posts,
            pagination: {
                page,
                limit,
                totalPosts,
                totalPages,
                hasNext: page * limit < totalPages,
                hasPrevious: page > 1,
            },
        };
    },
}

// Mutations
export const POST_MUTATIONS = {
    insertPost: async (data: typeof blogTable.$inferInsert) => {
        // check duplicate post or slug
        const [existing] = await db.select({ id: blogTable.id }).from(blogTable).where(eq(blogTable.slug, data.slug))
        if (existing) throw new Error("A post already exist in database")

        // save data in db
        return db.insert(blogTable).values(data).returning()

    }

}