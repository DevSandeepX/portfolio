import { Skeleton } from "@/components/ui/skeleton";

export default function SkillsSkeleton() {
    return (
        <div className="space-y-16 animate-pulse">
            {Array.from({ length: 3 }).map((_, sectionIndex) => (
                <section key={sectionIndex} className="space-y-8">
                    {/* Heading */}
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-9 w-1 rounded-full" />
                        <Skeleton className="h-10 w-52" />
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, cardIndex) => (
                            <div
                                key={cardIndex}
                                className="rounded-2xl border p-6 space-y-5"
                            >
                                <Skeleton className="h-6 w-36" />

                                <div className="flex flex-wrap gap-2">
                                    {Array.from({ length: 8 }).map((_, badge) => (
                                        <Skeleton
                                            key={badge}
                                            className="h-9 w-20 rounded-lg"
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}