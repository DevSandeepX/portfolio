"use client"

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
import CategoryActions from "./CategoryActions";

type Category = {
    id: string;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

export default function CategoryTableClient({
    categories,
}: {
    categories: Category[];
}) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
                    <p className="text-sm text-muted-foreground">
                        Manage all portfolio categories.
                    </p>
                </div>

                <SearchForm />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead>Updated</TableHead>
                            <TableHead className="w-14" />
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {categories.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="py-10 text-center text-muted-foreground"
                                >
                                    No ctaegories found.
                                </TableCell>
                            </TableRow>
                        )}

                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>
                                    <div>
                                        <p className="font-medium">{category.title}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {category.slug}
                                        </p>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {new Date(category.updatedAt).toLocaleDateString()}
                                </TableCell>

                                <TableCell>
                                    <CategoryActions id={category.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}