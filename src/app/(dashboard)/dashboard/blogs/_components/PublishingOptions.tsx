"use client";

import { useFormContext } from "react-hook-form";
import { BlogFormInput } from "@/schema/blog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller } from "react-hook-form";
import { blogStatuses } from "@/drizzle/schema";

export default function PublishingOptions() {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<BlogFormInput>();

    return (
        <section className="space-y-6 rounded-lg border bg-background p-6">
            <div>
                <h2 className="text-xl font-semibold">
                    Publishing Options
                </h2>

                <p className="text-sm text-muted-foreground">
                    Configure the publication status and visibility of this
                    blog post.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Status */}

                <div className="space-y-2">
                    <Label htmlFor="status">
                        Status
                    </Label>

                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger id="status" className="w-full">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>

                                <SelectContent>
                                    {blogStatuses.map((status) => (
                                        <SelectItem value={status} key={status}>
                                            {status}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />

                    {errors.status && (
                        <p className="text-sm text-destructive">
                            {errors.status.message}
                        </p>
                    )}
                </div>

                {/* Published At */}

                <div className="space-y-2">
                    <Label htmlFor="publishedAt">
                        Publish Date
                    </Label>

                    <Input
                        id="publishedAt"
                        type="datetime-local"
                        {...register("publishedAt", {
                            valueAsDate: true,
                        })}
                    />

                    {errors.publishedAt && (
                        <p className="text-sm text-destructive">
                            {errors.publishedAt.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Featured */}

            <Controller
                name="featured"
                control={control}
                render={({ field }) => (
                    <div className="flex items-start space-x-3 rounded-md border p-4">
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />

                        <div className="space-y-1">
                            <Label className="cursor-pointer">
                                Featured Post
                            </Label>

                            <p className="text-sm text-muted-foreground">
                                Display this post in the featured section on
                                your website.
                            </p>
                        </div>
                    </div>
                )}
            />

            {errors.featured && (
                <p className="text-sm text-destructive">
                    {errors.featured.message}
                </p>
            )}
        </section>
    );
}