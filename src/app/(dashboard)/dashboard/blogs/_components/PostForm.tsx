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
import { createPost } from "@/server/actions/post";


export default function PostForm(props: { categories: { id: string, name: string }[] }) {

    const form = useForm<BlogFormInput>({
        resolver: zodResolver(blogSchema),

        defaultValues: {
            title: "",
            slug: "",
            excerpt: "",
            image: "",
            status: "draft",
            categoryId: "",
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
        try {
            const res = await createPost({ ...values, authorId: "sn_143_ns_love_2" })
            if (!res.success) {
                alert(res.message)
                return
            }

            alert(res.message)

        } catch (error) {
            console.error(error)
            alert("failed to create a post")
        }
    }


    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    <BasicInformation categories={props.categories} />
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