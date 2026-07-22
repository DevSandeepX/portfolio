"use client";

import { useFormContext } from "react-hook-form";
import { BlogFormInput } from "@/schema/blog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SeoInformation() {
    const {
        register,
        formState: { errors },
    } = useFormContext<BlogFormInput>();

    return (
        <section className="space-y-6 rounded-lg border bg-background p-6">
            <div>
                <h2 className="text-xl font-semibold">
                    SEO Information
                </h2>

                <p className="text-sm text-muted-foreground">
                    Optimize your blog post for search engines and social
                    sharing.
                </p>
            </div>

            {/* SEO Title */}

            <div className="space-y-2">
                <Label htmlFor="seoTitle">
                    SEO Title
                </Label>

                <Input
                    id="seoTitle"
                    placeholder="SEO optimized title"
                    {...register("seoTitle")}
                />

                {errors.seoTitle && (
                    <p className="text-sm text-destructive">
                        {errors.seoTitle.message}
                    </p>
                )}
            </div>

            {/* SEO Description */}

            <div className="space-y-2">
                <Label htmlFor="seoDescription">
                    SEO Description
                </Label>

                <Textarea
                    id="seoDescription"
                    rows={4}
                    placeholder="Write a compelling meta description..."
                    {...register("seoDescription")}
                />

                {errors.seoDescription && (
                    <p className="text-sm text-destructive">
                        {errors.seoDescription.message}
                    </p>
                )}
            </div>

            {/* Keywords */}

            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="keywords">
                        Keywords
                    </Label>

                    <Input
                        id="keywords"
                        placeholder="nextjs, react, typescript"
                        {...register("keywords")}
                    />

                    <p className="text-xs text-muted-foreground">
                        Replace with your Keywords Input component.
                    </p>

                    {errors.keywords && (
                        <p className="text-sm text-destructive">
                            {errors.keywords.message as string}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="seoKeywords">
                        SEO Keywords
                    </Label>

                    <Input
                        id="seoKeywords"
                        placeholder="seo, optimization, blog"
                        {...register("seoKeywords")}
                    />

                    <p className="text-xs text-muted-foreground">
                        Replace with your SEO Keywords Input component.
                    </p>

                    {errors.seoKeywords && (
                        <p className="text-sm text-destructive">
                            {errors.seoKeywords.message as string}
                        </p>
                    )}
                </div>
            </div>

            {/* Canonical URL */}

            <div className="space-y-2">
                <Label htmlFor="canonicalUrl">
                    Canonical URL
                </Label>

                <Input
                    id="canonicalUrl"
                    type="url"
                    placeholder="https://example.com/blog/my-post"
                    {...register("canonicalUrl")}
                />

                {errors.canonicalUrl && (
                    <p className="text-sm text-destructive">
                        {errors.canonicalUrl.message}
                    </p>
                )}
            </div>
        </section>
    );
}