// import { stats } from "@/data/analytics-data";
import {
    Activity,
    FolderKanban,
    Newspaper,
    Users,
} from "lucide-react";
import { AnalyticsGrothChart } from "../../_components/AnalyticsGrothChart";
import { TechChart } from "../../_components/AnalyticsTechChart";
import { AnalyticsStatsCard } from "../../_components/AnalyticsStatsCard";
import { ANALITICS_QUERIES } from "@/server/db/analytic";


export default async function AnalyticsPage() {
    const [visitores, projects, posts, visitorsGroth] = await Promise.all([
        ANALITICS_QUERIES.getVisitoresGrothStats(),
        ANALITICS_QUERIES.getProjectsGrothStats(),
        ANALITICS_QUERIES.getPostsGrothStats(),
        ANALITICS_QUERIES.getVisitoresGrothData()
    ])

    console.log(visitores)

    const stats = [
        {
            title: "Visitors",
            value: visitores.current,
            change: visitores.change,
            icon: Users,
        },
        {
            title: "Projects",
            value: projects.current,
            change: projects.change,
            icon: FolderKanban,
        },
        {
            title: "Articles",
            value: posts.current,
            change: posts.change,
            icon: Newspaper,
        },
    ];
    return (
        <div className="space-y-8 p-8">
            <div>
                <h1 className="text-4xl font-bold">
                    Analytics
                </h1>

                <p className="text-muted-foreground mt-2">
                    Portfolio overview and performance.
                </p>
            </div>

            {/* Stats */}
            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {stats.map((item) => (
                    <AnalyticsStatsCard
                        key={item.title}
                        {...item}
                    />
                ))}
            </section>

            {/* Charts */}
            <section className="grid gap-6 grid-cols-1">
                <div className="lg:col-span-2">
                    <AnalyticsGrothChart growthData={visitorsGroth} />
                </div>

            </section>

        </div>
    );
}