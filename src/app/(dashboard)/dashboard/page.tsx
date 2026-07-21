import {
    ArrowUpRight,
    Eye,
    FileText,
    FolderKanban,
    Plus,
    Tag,
    TrendingUp,
    Users,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const stats = [
    {
        title: "Total Posts",
        value: "24",
        icon: FileText,
        change: "+12%",
    },
    {
        title: "Projects",
        value: "12",
        icon: FolderKanban,
        change: "+2",
    },
    {
        title: "Categories",
        value: "8",
        icon: Tag,
        change: "+1",
    },
    {
        title: "Total Views",
        value: "128.9K",
        icon: Eye,
        change: "+8.2%",
    },
];

export const recentPosts = [
    {
        id: 1,
        title: "Building an AI LMS with Next.js",
        status: "Published",
        createdAt: "20 Jul 2026",
        views: 1230,
    },
    {
        id: 2,
        title: "Mastering Drizzle ORM",
        status: "Draft",
        createdAt: "18 Jul 2026",
        views: 0,
    },
    {
        id: 3,
        title: "Authentication using Clerk",
        status: "Published",
        createdAt: "15 Jul 2026",
        views: 932,
    },
];

export const recentProjects = [
    {
        id: 1,
        title: "AI Learning Management System",
        status: "Completed",
    },
    {
        id: 2,
        title: "Developer Portfolio",
        status: "Live",
    },
    {
        id: 3,
        title: "Forever Ecommerce",
        status: "Development",
    },
];

export const activities = [
    "Published 'Building an AI LMS with Next.js'",
    "Added new Portfolio project",
    "Updated About page",
    "Created AI category",
    "Uploaded 5 images",
];

export default function AdminDashboardPage() {
    return (
        <main className="space-y-8 p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome back! Here's an overview of your portfolio.
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline">
                        <Link href="/admin/projects/create" className="flex items-center">
                            <Plus className="mr-2 h-4 w-4" />
                            New Project
                        </Link>
                    </Button>

                    <Button >
                        <Link href="/admin/posts/create" className="flex items-center">
                            <Plus className="mr-2 h-4 w-4" />
                            New Post
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                    <Card key={item.title}>
                        <CardContent className="flex items-center justify-between p-6">
                            <div>
                                <p className="text-muted-foreground text-sm">{item.title}</p>

                                <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>

                                <div className="mt-3 flex items-center gap-1 text-sm text-green-600">
                                    <TrendingUp className="h-4 w-4" />
                                    {item.change}
                                </div>
                            </div>

                            <div className="bg-primary/10 text-primary rounded-xl p-3">
                                <item.icon className="h-7 w-7" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </section>

            {/* Content */}
            <section className="grid gap-6 lg:grid-cols-3">
                {/* Recent Posts */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Posts</CardTitle>

                        <Button variant="ghost" size="sm" >
                            <Link href="/admin/posts" className="flex items-center">
                                View All
                                <ArrowUpRight className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-5">
                        {recentPosts.map((post) => (
                            <div
                                key={post.id}
                                className="flex items-center justify-between rounded-lg border p-4"
                            >
                                <div>
                                    <h3 className="font-semibold">{post.title}</h3>

                                    <p className="text-muted-foreground mt-1 text-sm">
                                        {post.createdAt}
                                    </p>
                                </div>

                                <div className="flex items-center gap-5">
                                    <Badge
                                        variant={
                                            post.status === "Published" ? "default" : "secondary"
                                        }
                                    >
                                        {post.status}
                                    </Badge>

                                    <span className="text-muted-foreground flex items-center gap-1 text-sm">
                                        <Eye className="h-4 w-4" />
                                        {post.views}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        <Button className="w-full justify-start" >
                            <Link href="/admin/posts/create" className="flex items-center">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Blog Post
                            </Link>
                        </Button>

                        <Button
                            className="w-full justify-start"
                            variant="outline"

                        >
                            <Link href="/admin/projects/create" className="flex items-center">
                                <FolderKanban className="mr-2 h-4 w-4" />
                                Add Project
                            </Link>
                        </Button>

                        <Button
                            className="w-full justify-start"
                            variant="outline"

                        >
                            <Link href="/admin/categories" className="flex items-center">
                                <Tag className="mr-2 h-4 w-4" />
                                Manage Categories
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </section>

            {/* Bottom */}
            <section className="grid gap-6 lg:grid-cols-2">
                {/* Projects */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Projects</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {recentProjects.map((project) => (
                            <div
                                key={project.id}
                                className="flex items-center justify-between rounded-lg border p-4"
                            >
                                <span className="font-medium">{project.title}</span>

                                <Badge variant="secondary">{project.status}</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {activities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="bg-primary mt-1 h-2 w-2 rounded-full" />

                                <p className="text-sm">{activity}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>

            {/* Footer Stats */}
            <section className="grid gap-5 md:grid-cols-2">
                <Card>
                    <CardContent className="flex items-center gap-5 p-6">
                        <Users className="text-primary h-10 w-10" />

                        <div>
                            <p className="text-muted-foreground">Monthly Visitors</p>
                            <h2 className="text-3xl font-bold">43,210</h2>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center gap-5 p-6">
                        <Eye className="text-primary h-10 w-10" />

                        <div>
                            <p className="text-muted-foreground">Monthly Page Views</p>
                            <h2 className="text-3xl font-bold">128,940</h2>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}