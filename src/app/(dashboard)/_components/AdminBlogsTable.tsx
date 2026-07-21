"use client";

import Link from "next/link";
import {
    Edit,
    Eye,
    CheckCircle2, XCircle,
    MoreHorizontal,
    Search,
    Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { BlogStatus } from "@/drizzle/schema";

const blogs = [
    {
        id: "1",
        title: "Getting Started with Next.js 15",
        slug: "getting-started-nextjs-15",
        category: "Next.js",
        status: "Published",
        views: 1234,
        createdAt: "21 Jul 2026",
    },
    {
        id: "2",
        title: "Complete Drizzle ORM Guide",
        slug: "drizzle-orm-guide",
        category: "Database",
        status: "Draft",
        views: 0,
        createdAt: "18 Jul 2026",
    },
    {
        id: "3",
        title: "Prisma vs Drizzle ORM",
        slug: "prisma-vs-drizzle",
        category: "Backend",
        status: "Published",
        views: 846,
        createdAt: "15 Jul 2026",
    },
    {
        id: "4",
        title: "Authentication with Clerk",
        slug: "authentication-clerk",
        category: "Authentication",
        status: "Published",
        views: 519,
        createdAt: "10 Jul 2026",
    },
    {
        id: "5",
        title: "Master Tailwind CSS",
        slug: "master-tailwind-css",
        category: "CSS",
        status: "Draft",
        views: 0,
        createdAt: "06 Jul 2026",
    },
];

type Post = {
    id: string;
    title: string;
    slug: string;
    status: BlogStatus;
    featured: boolean | null;
    image: string | null;
    allowComments: boolean | null;
    publishedAt: Date | null;
    createdAt: Date;
    category: string | null;
}

export default function AdminBlogsTable(props: { posts: Post[] }) {
    return (
        <>
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <CardTitle>Blogs</CardTitle>

                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search blog..."
                        className="pl-9"
                    />
                </div>
            </CardHeader>

            <CardContent>
                <div className="rounded overflow-hidden ">
                    <Table className="[&_tr]:border-0 [&_td]:border-0 [&_th]:border-0 [&_td]:py-5 [&_th]:py-3">
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <span className="sr-only">
                                        Blog image
                                    </span>
                                </TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Comment</TableHead>
                                <TableHead>Published</TableHead>
                                <TableHead className="w-17.5 text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {props.posts.map((blog) => (
                                <TableRow key={blog.id}>
                                    <TableCell>
                                        {blog.image ? (
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="h-12 w-20 rounded-md object-cover border"
                                            />
                                        ) : (
                                            <div className="h-12 w-20 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                                No Image
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">
                                                {blog.title}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                /blog/{blog.slug}
                                            </p>
                                        </div>
                                    </TableCell>

                                    <TableCell>{blog.category}</TableCell>

                                    <TableCell>
                                        <Badge
                                            variant={
                                                blog.status === "published"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                        >
                                            {blog.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {blog.allowComments ? (
                                            <div className="flex items-center gap-2 text-green-600">
                                                <CheckCircle2 className="h-4 w-4" />
                                                <span>Allowed</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-red-600">
                                                <XCircle className="h-4 w-4" />
                                                <span>Not Allowed</span>
                                            </div>
                                        )}
                                    </TableCell>


                                    <TableCell>
                                        {blog.publishedAt
                                            ? blog.publishedAt.toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })
                                            : (
                                                <span className="text-muted-foreground">Not published</span>
                                            )}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger render={<Button
                                                size="icon"
                                                variant="ghost"
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>} />

                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem >
                                                    <Link href={`/blog/${blog.slug}`} className="flex items-center">
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View
                                                    </Link>
                                                </DropdownMenuItem>

                                                <DropdownMenuItem >
                                                    <Link
                                                        href={`/admin/blogs/${blog.id}/edit`} className="flex items-center"
                                                    >
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>

                                                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </>
    );
}