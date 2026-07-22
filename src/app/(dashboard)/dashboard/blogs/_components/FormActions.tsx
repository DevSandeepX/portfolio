"use client";

import { Loader2, Save, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface FormActionsProps {
    isSubmitting?: boolean;
    submitLabel?: string;
    cancelHref?: string;
}

export default function FormActions({
    isSubmitting = false,
    submitLabel = "Save Post",
    cancelHref,
}: FormActionsProps) {
    const router = useRouter();
    const {
        formState: { isDirty },
    } = useFormContext();

    return (
        <div className="sticky bottom-0 z-10 flex items-center justify-between rounded-lg border bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/70">
            <p className="text-sm text-muted-foreground">
                {isDirty
                    ? "You have unsaved changes."
                    : "All changes are saved."}
            </p>

            <div className="flex items-center gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        if (cancelHref) {
                            router.push(cancelHref);
                        } else {
                            router.back();
                        }
                    }}
                >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                </Button>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            {submitLabel}
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}