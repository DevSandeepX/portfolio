"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { projectSchema } from "@/schemas/project";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { createProject } from "@/actions/project";
import { useRouter } from "next/navigation";

export default function CreateProjectForm() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    async function onSubmit(values: z.infer<typeof projectSchema>) {
        try {
            const res = await createProject(values);

            if (!res.success) {
                toast.error(res.message);
                return;
            }

            toast.success(res.message);
            reset()


            if (res.data) {
                router.replace(`/dashboard/projects/${res.data.id}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to create project.");
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto w-full max-w-7xl space-y-6 "
        >
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>

                <Input
                    id="title"
                    className="rounded focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Project title"
                    {...register("title")}
                />

                {errors.title && (
                    <p className="text-sm text-destructive">
                        {errors.title.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>

                <Textarea
                    id="description"
                    className="rounded focus-visible:ring-0 focus-visible:ring-offset-0 min-h-42 resize-none"

                    placeholder="Project description..."
                    {...register("description")}
                />

                {errors.description && (
                    <p className="text-sm text-destructive">
                        {errors.description.message}
                    </p>
                )}
            </div>
            <div className="flex justify-end">
                <Button
                    type="submit"
                    className="rounded"
                    disabled={isSubmitting}
                >
                    Create Project
                </Button>
            </div>
        </form>
    );
}