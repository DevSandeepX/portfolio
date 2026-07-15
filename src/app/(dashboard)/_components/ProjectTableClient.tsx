"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    Search,
    MoreHorizontal,
    ExternalLink,
    GitBranchIcon,
    Pencil,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import SearchForm from "@/components/SearchForm";

type Project = {
    id: string;
    title: string;
    slug: string;
    githubUrl: string | null;
    liveUrl: string | null;
    isPublished: boolean;
    order: number;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export default function ProjectTableClient({
    projects,
}: {
    projects: Project[];
}) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
                    <p className="text-sm text-muted-foreground">
                        Manage all portfolio projects.
                    </p>
                </div>

                <SearchForm />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Project</TableHead>
                            <TableHead>Featured</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Order</TableHead>
                            <TableHead>Updated</TableHead>
                            <TableHead className="w-14" />
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {projects.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="py-10 text-center text-muted-foreground"
                                >
                                    No projects found.
                                </TableCell>
                            </TableRow>
                        )}

                        {projects.map((project) => (
                            <TableRow key={project.slug}>
                                <TableCell>
                                    <div>
                                        <p className="font-medium">{project.title}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {project.slug}
                                        </p>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {project.isFeatured ? (
                                        <Badge>Featured</Badge>
                                    ) : (
                                        <Badge variant="secondary">No</Badge>
                                    )}
                                </TableCell>

                                <TableCell>
                                    {project.isPublished ? (
                                        <Badge className="bg-green-600 hover:bg-green-600">
                                            Published
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline">Draft</Badge>
                                    )}
                                </TableCell>

                                <TableCell>{project.order}</TableCell>

                                <TableCell>
                                    {new Date(project.updatedAt).toLocaleDateString()}
                                </TableCell>

                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger render={<Button
                                            size="icon"
                                            variant="ghost"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>} />

                                        <DropdownMenuContent align="end" className="rounded">
                                            <DropdownMenuItem >
                                                <Link href={`/dashboard/projects/${project.id}`}
                                                    className="flex"
                                                >
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </Link>
                                            </DropdownMenuItem>

                                            {project.liveUrl && (
                                                <DropdownMenuItem >
                                                    <a
                                                        className="flex items-center"
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <ExternalLink className="mr-2 h-4 w-4" />
                                                        Live Demo
                                                    </a>
                                                </DropdownMenuItem>
                                            )}

                                            {project.githubUrl && (
                                                <DropdownMenuItem>
                                                    <a
                                                        className="flex items-center"
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <GitBranchIcon className="mr-2 h-4 w-4" />
                                                        GitHub
                                                    </a>
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}