import React from 'react'
import AdminBlogsTable from '../../_components/AdminBlogsTable'
import { POSTQUERIES } from '@/server/db/post-queries'
import CustomPagination from '@/components/CustomPagination';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { PlusIcon, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
        <> <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Blogs</CardTitle>
            <div className='flex items-start gap-4'>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search blog..."
                        className="pl-9"
                    />
                </div>
                <Link href={"/dashboard/blogs/create"}>
                    <Button className="bg-blue-700 text-white hover:bg-blue-800 rounded">
                        <PlusIcon className='size-4' /> Add Post
                    </Button>
                </Link>
            </div>
        </CardHeader>
            <AdminBlogsTable posts={posts} />
            <CustomPagination totalPages={pagination.totalPages} />
        </>
    )
}
