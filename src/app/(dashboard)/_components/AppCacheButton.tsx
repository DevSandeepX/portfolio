"use client";

import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { Loader2, RefreshCw } from "lucide-react";
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

import { Button } from "@/components/ui/button";
import { refreshCache } from "@/actions/cache";
import { useRouter } from "next/navigation";

export default function AppCacheButton() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter()
    const [open, setOpen] = useState(false)
    function onOpenChange() {
        setOpen(false)
    }

    function handleClearCache() {
        startTransition(async () => {
            try {

                const res = await refreshCache();

                if (!res.success) {
                    toast.error(res.message);
                    return;
                }

                toast.success("Application cache refreshed successfully.");
                setOpen(false);
                router.refresh()
            } catch (error) {
                console.error(error);
                toast.error("Failed to refresh cache.");
            }
        });
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger render={<Button
                variant="outline"
                className="w-full justify-start gap-2 text-black"
            >
                <RefreshCw className="size-4" />
                Refresh Cache
            </Button>} />

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Refresh application cache?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This will revalidate all cached pages and data so the latest
                        changes become visible across your portfolio. This action is
                        safe and won't delete any data.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={isPending}
                        onClick={handleClearCache}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                Refreshing...
                            </>
                        ) : (
                            <>
                                <RefreshCw className="mr-2 size-4" />
                                Refresh Cache
                            </>
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}