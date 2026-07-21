import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp } from "lucide-react";

interface Props {
    title: string;
    value: string;
    change: string;
    icon: LucideIcon;
}

export function AnalyticsStatsCard({
    title,
    value,
    change,
    icon: Icon,
}: Props) {
    return (
        <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-muted-foreground text-sm">
                            {title}
                        </p>

                        <h2 className="text-3xl font-bold">
                            {value}
                        </h2>

                        <div className="flex items-center gap-1 text-sm text-emerald-600">
                            <TrendingUp className="h-4 w-4" />
                            {change}
                        </div>
                    </div>

                    <div className="rounded-xl bg-primary/10 p-3">
                        <Icon className="text-primary h-6 w-6" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}