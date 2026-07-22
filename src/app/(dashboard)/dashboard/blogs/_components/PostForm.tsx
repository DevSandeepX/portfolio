"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogFormInput, blogSchema } from "@/schema/blog";
import BasicInformation from "./BasicInformation";
import ContentEditor from "./ContentEditor";
import SeoInformation from "./SeoInformation";
import PublishingOptions from "./PublishingOptions";
import AdditionalSettings from "./AdditionalSettings";
import FormActions from "./FormActions";


export default function PostForm() {

    const form = useForm<BlogFormInput>({
        resolver: zodResolver(blogSchema),

        defaultValues: {
            title: "",
            slug: "",
            excerpt: "",
            image: "",
            status: "draft",
            categoryId: "19b779b0-05fd-4052-b0dd-b42db3684c9b",
            content: {
                type: "doc",
                content: [],
            },
            tags: [],
            readTime: 0,
            featured: false,
            keywords: [],
            seoTitle: "",
            seoDescription: "",
            seoKeywords: [],
            canonicalUrl: "",
            allowComments: true,
        },
    });

    async function onSubmit(values: BlogFormInput) {
        console.log(values)
    }


    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    <BasicInformation />
                    <ContentEditor />
                    <PublishingOptions />
                    <SeoInformation />
                    <AdditionalSettings />
                    <FormActions />
                </div>
            </form>
        </FormProvider>
    );
}