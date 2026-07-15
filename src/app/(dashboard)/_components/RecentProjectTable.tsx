"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import ActionButton from "./ActionButton";
import { deleteProject } from "@/actions/project";
import { cn } from "@/lib/utils";

type RecentProjectTableProps = {
    projects: {
        id: string;
        title: string;
        isPublished: boolean;
        imageUrl: string;
        createdAt: Date;
    }[];
};

export default function RecentProjectTable({
    projects,
}: RecentProjectTableProps) {
    return (
        <Table>
            <TableBody>
                {projects.map((project) => (
                    <TableRow
                        key={project.id}
                        className="border-b last:border-0 hover:bg-muted/40"
                    >
                        {/* Project */}
                        <TableCell className="w-full py-4">
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border">
                                    {project.imageUrl ? (
                                        <Image
                                            src={project.imageUrl}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate text-[12px] font-semibold mb-1">
                                        {project.title.slice(0, 30)}
                                        {project.title.length > 30 && " ..."}
                                    </h3>

                                    <StatusBadge isPublished={project.isPublished} className="text-[10px]" />
                                </div>
                            </div>
                        </TableCell>

                        <TableCell>
                            <span className="text-xs text-muted-foreground truncate">
                                {format(project.createdAt, "dd MMM yyyy")}
                            </span>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="w-22.5">
                            <div className="flex justify-end gap-2">
                                <Link
                                    href={`/dashboard/projects/${project.id}`}
                                    className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted"
                                >
                                    <FaRegEdit />
                                </Link>

                                <ActionButton action={() => deleteProject(project.id)}>
                                    <div className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-red-200 text-red-500 bg-red-100">
                                        <FaRegTrashCan />
                                    </div>
                                </ActionButton>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}


function StatusBadge({ className, isPublished }: {
    isPublished: boolean
    className?: string
}) {

    const badge = {
        published: "text-green-500 bg-green-100",
        draft: "text-red-500 bg-red-100"
    }

    return (
        <span className={cn(isPublished ? badge.published : badge.draft, "px-2 py-1 rounded-md", className)}>
            {isPublished ? "Published" : "Draft"}
        </span>
    )
}