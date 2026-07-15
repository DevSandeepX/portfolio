import { Button } from "@/components/ui/button";
import BackButton from "../../_components/BackButton";
import Link from "next/link";
import { PlusCircleIcon, PlusIcon } from "lucide-react";
import { getSearchParams } from "@/lib/utils";
import { EmptyState } from "@/components/EmptyState";
import CustomPagination from "@/components/CustomPagination";
import { getPaginatedCategories } from "@/db/category";
import CategoryTableClient from "../../_components/CategoryTableClient";
import { QueryParamsProps } from "@/types/type";


export default async function CategoriesPage({ params, searchParams }: {
    params: any,
    searchParams: Promise<{ search: string, page: string, limit: string }>
}) {
    const { limit, page, search } = getSearchParams(await searchParams)
    return (
        <div className="">
            <div className="h-16 flex items-center justify-between gap-6 w-full">
                <BackButton title="Dashboard" href="/dashboard" />
                <Button className="btn-primary" variant="ghost">
                    <Link href="/dashboard/categories/create" className="flex items-center">
                        <PlusIcon className="mr-2" />
                        Create Category
                    </Link>
                </Button>
            </div>

            <CategoryTable page={page} limit={limit} search={search} />
        </div>
    )
}

async function CategoryTable({
    limit,
    page,
    search
}: QueryParamsProps) {

    const { categories, pagination: { totalPages } } = await getPaginatedCategories({ page, limit, search })

    if (categories.length === 0) {
        return (
            <EmptyState title="Categories" description="There is no categories aviable create a category.">
                <Button variant="outline" className="mt-8 mb-10 rounded">
                    <Link href={`/dashboard/categories/create`} className="flex">
                        <PlusCircleIcon className="mr-2 size-5" />
                        Create Category
                    </Link>
                </Button>
            </EmptyState>
        )
    }

    return (
        <div className="w-full">
            <CategoryTableClient categories={categories} />
            <div className="py-10">
                <CustomPagination totalPages={totalPages} />
            </div>
        </div>
    )
}