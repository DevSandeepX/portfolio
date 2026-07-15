import { getSearchParams } from "@/lib/utils";
import ProjectTableClient from "../../_components/ProjectTableClient";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import BackButton from "../../_components/BackButton";
import CustomPagination from "@/components/CustomPagination";
import { EmptyState } from "@/components/EmptyState";
import { QueryParamsProps } from "@/types/type";
import { getPaginatedProjects } from "@/db/product";

export default async function ProjectsPage({ params, searchParams }: {
    params: any,
    searchParams: Promise<{ search: string, page: string, limit: string }>
}) {
    const { limit, page, search } = getSearchParams(await searchParams)

    return (
        <div className="min-h-screen">
            <ProjectTable limit={limit} page={page} search={search} />
        </div>
    )
}



async function ProjectTable({
    limit,
    page,
    search
}: QueryParamsProps) {

    const { projects, pagination: { totalPages } } = await getPaginatedProjects({ page, limit, search })

    if (projects.length === 0) {
        return (
            <EmptyState title="Projects" description="There is no projects aviable create a project.">
                <Button variant="outline" className="mt-8 mb-10">
                    <Link href={`/dashboard/projects/create`} className="flex">
                        <PlusCircleIcon className="mr-2 size-5" />
                        Create Project
                    </Link>
                </Button>
            </EmptyState>
        )
    }

    return (
        <div className="w-full">
            <div className="h-16 flex items-center justify-between gap-6 w-full">
                <BackButton title="Dashboard" href="/dashboard" />
                <Button className="btn-primary" variant="ghost">
                    <Link href="/dashboard/projects/create" className="flex items-center">
                        <PlusIcon className="mr-2" />
                        Create Project
                    </Link>
                </Button>
            </div>
            <ProjectTableClient projects={projects} />
            <div className="py-10">
                <CustomPagination totalPages={totalPages} />
            </div>
        </div>
    )
}


