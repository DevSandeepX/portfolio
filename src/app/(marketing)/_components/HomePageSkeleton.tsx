import { Skeleton } from "@/components/ui/skeleton";

export default function HomePageSkeleton() {
    return (
        <div className="container py-8 md:py-12 lg:py-16 space-y-24">
            {/* Hero */}
            <section className="grid items-center gap-12 lg:grid-cols-2">
                <div className="space-y-6">
                    <Skeleton className="h-8 w-36 rounded-full" />

                    <Skeleton className="h-14 w-full max-w-xl" />
                    <Skeleton className="h-14 w-4/5 max-w-lg" />

                    <div className="space-y-3">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-11/12" />
                        <Skeleton className="h-5 w-3/4" />
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <Skeleton className="h-11 w-36 rounded-lg" />
                        <Skeleton className="h-11 w-36 rounded-lg" />
                    </div>
                </div>

                <div className="flex justify-center">
                    <Skeleton className="aspect-square w-72 rounded-3xl md:w-96" />
                </div>
            </section>

            {/* Skills */}
            <section className="space-y-8">
                <Skeleton className="h-10 w-64" />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-2xl border p-6 space-y-5"
                        >
                            <Skeleton className="h-6 w-40" />

                            <div className="flex flex-wrap gap-2">
                                {Array.from({ length: 8 }).map((_, j) => (
                                    <Skeleton
                                        key={j}
                                        className="h-8 w-20 rounded-lg"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Projects */}
            <section className="space-y-8">
                <Skeleton className="h-10 w-72" />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="overflow-hidden rounded-2xl border"
                        >
                            <Skeleton className="aspect-video w-full" />

                            <div className="space-y-4 p-5">
                                <Skeleton className="h-6 w-2/3" />

                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                </div>

                                <div className="flex gap-2">
                                    <Skeleton className="h-8 w-20 rounded-lg" />
                                    <Skeleton className="h-8 w-24 rounded-lg" />
                                    <Skeleton className="h-8 w-16 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact CTA */}
            <section className="rounded-3xl border p-10">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <Skeleton className="mx-auto h-10 w-72" />

                    <div className="space-y-2">
                        <Skeleton className="mx-auto h-5 w-full" />
                        <Skeleton className="mx-auto h-5 w-3/4" />
                    </div>

                    <Skeleton className="mx-auto h-12 w-40 rounded-lg" />
                </div>
            </section>
        </div>
    );
}