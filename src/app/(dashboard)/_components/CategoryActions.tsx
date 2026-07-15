"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Loader2, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { deleteSkill } from "@/actions/skill";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useRouter } from "next/navigation";
import { deleteCategory } from "@/actions/category";

export default function CategoryActions({
    id,
}: {
    id: string;
}) {
    const router = useRouter();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    const [isPending, startTransition] = useTransition();

    function handleDelete() {
        startTransition(async () => {
            try {
                const res = await deleteCategory(id);

                if (!res.success) {
                    toast.error(res.message);
                    return;
                }

                toast.success(res.message);

                setAlertOpen(false);
                setDropdownOpen(false);

                router.refresh();
            } catch {
                toast.error("Failed to delete skill.");
            }
        });
    }

    return (
        <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger render={<Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                >
                    <MoreHorizontal className="h-4 w-4" />
                </Button>} />


                <DropdownMenuContent
                    align="end"
                    className="w-48 rounded-xl"
                >
                    <DropdownMenuItem >
                        <Link href={`/dashboard/categories/${id}`} className="flex w-full">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <AlertDialogTrigger>
                        <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            className="text-destructive focus:text-destructive"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialogContent className="rounded-xl">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete ?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This action cannot be undone. The data will be
                        permanently deleted from your portfolio.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={isPending}
                        className="rounded-lg"
                    >
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                        disabled={isPending}
                        className="rounded-lg bg-red-600 hover:bg-red-700"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </>
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}