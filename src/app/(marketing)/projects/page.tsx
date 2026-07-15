import { Suspense } from "react";

import SearchForm from "@/components/SearchForm";
import CustomPagination from "@/components/CustomPagination";
import { getPaginatedPublicProjects } from "@/db/product";

import { ProjectCard } from "../_components/ProjectCard";
import { getSearchParams } from "@/lib/utils";
import { QueryParamsProps } from "@/types/type";

type Props = {
    searchParams: Promise<{
        page?: string;
        search?: string;
        limit?: string
    }>;
};

export default async function PublicProjectsPage({ searchParams }: Props) {
    const { limit,
        page,
        search
    } = getSearchParams(await searchParams);

    return (
        <div className="container min-h-screen py-10">
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                    <h1 className="text-3xl font-bold">
                        Explore Projects
                    </h1>

                    <p className="max-w-2xl text-muted-foreground">
                        Discover open-source projects, portfolio websites,
                        SaaS applications, dashboards, and more.
                    </p>
                </div>

                <SearchForm />
            </div>

            <Suspense
                key={`${page}-${search}`}
                fallback={<div>Loading...</div>}
            >
                <SuspendedPage page={page} limit={limit} search={search} />
            </Suspense>
        </div>
    );
}



async function SuspendedPage({
    limit, page, search
}: QueryParamsProps) {


    const { projects, pagination: { totalPages } } =
        await getPaginatedPublicProjects({
            page,
            search,
            limit
        });

    if (search && projects.length == 0) {
        return (
            <div className="w-full">
                <p>Result not found for <i>"{`${search}`}"</i></p>
            </div>
        )
    }

    return (
        <>
            <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        {...project}
                        image={
                            project.projectImages[0]?.image.url ??
                            "/assets/images/project-placeholder.png"
                        }
                    />
                ))}
            </div>

            <CustomPagination totalPages={totalPages} />
        </>
    );
}