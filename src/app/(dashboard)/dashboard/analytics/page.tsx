import { stats } from "@/data/analytics-data";
import { AnalyticsGrothChart } from "../../_components/AnalyticsGrothChart";
import { TechChart } from "../../_components/AnalyticsTechChart";
import { AnalyticsStatsCard } from "../../_components/AnalyticsStatsCard";


export default function AnalyticsPage() {
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
            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                    <AnalyticsStatsCard
                        key={item.title}
                        {...item}
                    />
                ))}
            </section>

            {/* Charts */}
            <section className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <AnalyticsGrothChart />
                </div>

            </section>

            <section className="grid gap-6 lg:grid-cols-2">
                <TechChart />

                {/* Country Visitors / Recent Activity goes here */}
            </section>
        </div>
    );
}