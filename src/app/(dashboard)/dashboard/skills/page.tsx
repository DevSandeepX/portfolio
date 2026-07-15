import { Button } from "@/components/ui/button";
import BackButton from "../../_components/BackButton";
import Link from "next/link";
import { PlusCircleIcon, PlusIcon } from "lucide-react";
import { getSearchParams } from "@/lib/utils";
import { EmptyState } from "@/components/EmptyState";
import { getPaginatedSkills } from "@/db/skill";
import CustomPagination from "@/components/CustomPagination";
import SkillTableClient from "../../_components/SkillTableClient";
import { QueryParamsProps } from "@/types/type";


export default async function SkillsPage({ params, searchParams }: {
    params: any,
    searchParams: Promise<{ search: string, page: string, limit: string }>
}) {
    const { limit, page, search } = getSearchParams(await searchParams)
    return (
        <div className="w-full">
            <div className="h-16 flex items-center justify-between gap-6 w-full">
                <BackButton title="Dashboard" href="/dashboard" />
                <Button className="btn-primary" variant="ghost">
                    <Link href="/dashboard/skills/create" className="flex items-center">
                        <PlusIcon className="mr-2" />
                        Add Skill
                    </Link>
                </Button>
            </div>

            <SkillTable page={page} limit={limit} search={search} />
        </div>
    )
}

async function SkillTable({
    limit,
    page,
    search
}: QueryParamsProps) {

    const { skills, pagination: { totalPages } } = await getPaginatedSkills({ page, limit, search })

    if (skills.length === 0) {
        return (
            <EmptyState title="Skills" description="There is no skills aviable create a skill.">
                <Button variant="outline" className="mt-8 mb-10">
                    <Link href={`/dashboard/skills/create`} className="flex">
                        <PlusCircleIcon className="mr-2 size-5" />
                        Add New Skill
                    </Link>
                </Button>
            </EmptyState>
        )
    }

    return (
        <div className="w-full">
            <SkillTableClient skills={skills} />
            <div className="py-10">
                <CustomPagination totalPages={totalPages} />
            </div>
        </div>
    )
}