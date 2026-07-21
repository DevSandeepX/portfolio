"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
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
import { techData } from "@/data/analytics-data";

export function TechChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Popular Technologies</CardTitle>
                <CardDescription>
                    Projects built using each technology
                </CardDescription>
            </CardHeader>

            <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={techData}>
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            tickLine={false}
                            axisLine={false}
                        />

                        <Tooltip />

                        <Bar
                            dataKey="value"
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}