"use client";

import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function AnalyticsGrothChart(props: { growthData: { month: string, visitors: number }[] }) {
    const { growthData } = props
    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Growth Overview</CardTitle>

                <CardDescription>
                    Monthly visitors over the last 12 months
                </CardDescription>
            </CardHeader>

            <CardContent className="h-[380px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growthData}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            tickLine={false}
                            axisLine={false}
                        />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="visitors"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}