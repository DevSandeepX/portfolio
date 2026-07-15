"use client"

import Link from "next/link";
import {
    Loader2,
    MoreHorizontal,
    Pencil,
    Trash2,
    Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
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
import ActionButton from "./ActionButton";
import { deleteSkill } from "@/actions/skill";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import SkillActions from "./SkillActions";

type Skill = {
    id: string;
    slug: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    category: {
        title: string;
    };
}

export default function SkillTableClient({
    skills,
}: {
    skills: Skill[];
}) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    function handleDelete(id: string) {
        startTransition(async () => {
            try {
                const response = await deleteSkill(id)
                if (!response.success) {
                    toast.error(response.message)
                    return
                }
                toast.success("Skill deleted successfully.");
                setOpen(false);
            } catch (error) {
                toast.error("Failed to delete skill.");
            }
        });
    }
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
                    <p className="text-sm text-muted-foreground">
                        Manage all portfolio skills.
                    </p>
                </div>

                <SearchForm />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Skill</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Updated</TableHead>
                            <TableHead className="w-14" />
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {skills.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="py-10 text-center text-muted-foreground"
                                >
                                    No skills found.
                                </TableCell>
                            </TableRow>
                        )}

                        {skills.map((skill) => (
                            <TableRow key={skill.id}>
                                <TableCell>
                                    <div>
                                        <p className="font-medium">{skill.title}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {skill.slug}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <p className="font-medium">{skill.category.title}</p>

                                    </div>
                                </TableCell>

                                <TableCell>
                                    {new Date(skill.updatedAt).toLocaleDateString()}
                                </TableCell>

                                <TableCell className="w-16">
                                    <SkillActions id={skill.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div >
    );
}