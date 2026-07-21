import React from 'react'
import AdminBlogsTable from '../../_components/AdminBlogsTable'
import { POSTQUERIES } from '@/server/db/post-queries'
import CustomPagination from '@/components/CustomPagination';
export const ITEM_PER_PAGE = 20;

export default async function BlogsPage({ searchParams }: {
    searchParams: Promise<{ page: string, limit: string, q: string }>
}) {

    const queryParams = await searchParams
    const page = Number(queryParams.page ?? 1)
    const limit = Number(queryParams.limit ?? ITEM_PER_PAGE)
    const q = queryParams.q ?? ""

    const { posts, pagination } = await POSTQUERIES.getAdminPosts({ limit, page, q })
    return (
        <>
            <AdminBlogsTable posts={posts} />
            <CustomPagination totalPages={pagination.totalPages} />
        </>
    )
}
