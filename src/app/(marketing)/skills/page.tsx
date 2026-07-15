import { getCategoriesWithSkills } from "@/db/skill";
import CategorySkillCard from "../_components/CategorySkillCard";

import { Suspense } from "react";
import SkillsSkeleton from "../_components/SkillSkeleton";

export default function SkillsPage() {
    return (
        <div className="container py-8 md:py-12 lg:py-16">
            <div className="max-w-3xl space-y-4 mb-12">
                <span className="inline-flex items-center rounded-full border bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                    💻 My Expertise
                </span>

                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                    Skills &
                    <span className="text-primary"> Technologies</span>
                </h1>

                <p className="text-lg text-muted-foreground leading-8">
                    I specialize in modern web technologies, crafting scalable,
                    responsive, and high-performance applications with a strong
                    focus on clean architecture and exceptional user experience.
                </p>
            </div>

            <Suspense fallback={<SkillsSkeleton />}>
                <SuspendedPage />
            </Suspense>
        </div>
    );
}

async function SuspendedPage() {
    const skills = await getCategoriesWithSkills();

    return (
        <div className="space-y-12 md:space-y-16 lg:space-y-20">
            {skills.map((parent) => (
                <CategorySkillCard
                    key={parent.id}
                    title={parent.title}
                    children={parent.children}
                />
            ))}
        </div>
    );
}