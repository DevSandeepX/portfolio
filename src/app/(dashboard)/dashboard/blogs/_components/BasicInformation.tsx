"use client";

import { Controller, useFormContext } from "react-hook-form";
import { BlogFormInput } from "@/schema/blog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CategorySelector from "@/app/(dashboard)/_components/CategorySelector";
import PostCategorySelector from "./PostCategorySelector";

export default function BasicInformation(props: { categories: { id: string, name: string }[] }) {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<BlogFormInput>();

    return (
        <section className="space-y-6 rounded-lg border bg-background p-6">
            <div>
                <h2 className="text-xl font-semibold">
                    Basic Information
                </h2>
                <p className="text-sm text-muted-foreground">
                    Add the basic details of your blog post.
                </p>
            </div>

            {/* Title & Slug */}

            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="title">
                        Title <span className="text-destructive">*</span>
                    </Label>

                    <Input
                        id="title"
                        placeholder="How to Build a Blog with Next.js"
                        {...register("title")}
                    />

                    {errors.title && (
                        <p className="text-sm text-destructive">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="slug">
                        Slug <span className="text-destructive">*</span>
                    </Label>

                    <Input
                        id="slug"
                        placeholder="how-to-build-a-blog-with-nextjs"
                        {...register("slug")}
                    />

                    {errors.slug && (
                        <p className="text-sm text-destructive">
                            {errors.slug.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Excerpt */}

            <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>

                <Textarea
                    id="excerpt"
                    rows={4}
                    className="resize-none"
                    placeholder="Write a short summary of your article..."
                    {...register("excerpt")}
                />

                {errors.excerpt && (
                    <p className="text-sm text-destructive">
                        {errors.excerpt.message}
                    </p>
                )}
            </div>

            {/* Featured Image */}

            <div className="space-y-2">
                <Label htmlFor="image">Featured Image URL</Label>

                <Input
                    id="image"
                    placeholder="https://example.com/image.jpg"
                    {...register("image")}
                />

                {errors.image && (
                    <p className="text-sm text-destructive">
                        {errors.image.message}
                    </p>
                )}
            </div>

            {/* Category & Tags */}

            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="categoryId">
                        Category <span className="text-destructive">*</span>
                    </Label>

                    {/* Replace this Input with your CategorySelect component */}
                    <PostCategorySelector categories={props.categories} name="categoryId" control={control} />
                    {errors.categoryId && (
                        <p className="text-sm text-destructive">
                            {errors.categoryId.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="tags">
                        Tags
                    </Label>

                    <Input
                        id="tags"
                        placeholder="react,nextjs,typescript"
                        {...register("tags")}
                    />

                    <p className="text-xs text-muted-foreground">
                        Replace this with your Tag Selector component.
                    </p>

                    {errors.tags && (
                        <p className="text-sm text-destructive">
                            {errors.tags.message as string}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}