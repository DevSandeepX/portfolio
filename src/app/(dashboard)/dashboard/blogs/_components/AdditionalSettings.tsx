"use client";

import { Controller, useFormContext } from "react-hook-form";
import { BlogFormInput } from "@/schema/blog";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function AdditionalSettings() {
    const {
        control,
        formState: { errors },
    } = useFormContext<BlogFormInput>();

    return (
        <section className="space-y-6 rounded-lg border bg-background p-6">
            <div>
                <h2 className="text-xl font-semibold">
                    Additional Settings
                </h2>

                <p className="text-sm text-muted-foreground">
                    Configure additional options for this blog post.
                </p>
            </div>

            <Controller
                name="allowComments"
                control={control}
                render={({ field }) => (
                    <div className="flex items-start gap-3 rounded-lg border p-4">
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id="allowComments"
                        />

                        <div className="space-y-1">
                            <Label
                                htmlFor="allowComments"
                                className="cursor-pointer"
                            >
                                Allow Comments
                            </Label>

                            <p className="text-sm text-muted-foreground">
                                Visitors will be able to leave comments on this
                                blog post.
                            </p>
                        </div>
                    </div>
                )}
            />

            {errors.allowComments && (
                <p className="text-sm text-destructive">
                    {errors.allowComments.message}
                </p>
            )}
        </section>
    );
}