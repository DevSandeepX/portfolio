"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import { projectSettingSchema } from "@/schemas/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteProjectImage, updateProject } from "@/actions/project";
import { Switch } from "@/components/ui/switch";
import FileUploader from "./FileUploader";
import Image from "next/image";
import { useState } from "react";
import ActionButton from "./ActionButton";

export default function ProjectSettingsForm({
    project,
}: {
    project: {
        id: string;
        slug: string;
        title: string;
        githubUrl: string | null;
        liveUrl: string | null;
        isPublished: boolean;
        order: number;
        isFeatured: boolean;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        projectImages: {
            id: string;
            image: {
                id: string;
                url: string;
            };
        }[];
    };
}) {

    const router = useRouter()
    const [files, setFiles] = useState<undefined | string[]>(undefined)
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof projectSettingSchema>>({
        resolver: zodResolver(projectSettingSchema),
        defaultValues: {
            title: project.title,
            description: project.description ?? "",
            githubUrl: project.githubUrl ?? "",
            liveUrl: project.liveUrl ?? "",
            isFeatured: project.isFeatured,
            isPublished: project.isPublished,

        },
    });

    const isFeatured = watch("isFeatured");
    const isPublished = watch("isPublished");

    async function onSubmit(values: z.infer<typeof projectSettingSchema>) {
        try {
            const res = await updateProject(project.id, values, { files });

            if (!res.success) {
                toast.error(res.message);
                return;
            }

            toast.success(res.message);
            router.refresh()

        } catch (error) {
            console.error(error);
            toast.error("Failed to update project.");
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 max-w-7xl w-full"
        >
            {/* Title */}
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    placeholder="Project title"
                    {...register("title")}
                />
                {errors.title && (
                    <p className="text-sm text-destructive">
                        {errors.title.message}
                    </p>
                )}
            </div>

            {/* Slug */}


            {/* Description */}
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    className="resize-none min-h-32"
                    placeholder="Project description..."
                    {...register("description")}
                />
                {errors.description && (
                    <p className="text-sm text-destructive">
                        {errors.description.message}
                    </p>
                )}
            </div>

            {/* URLs */}
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                        id="githubUrl"
                        placeholder="https://github.com/username/project"
                        {...register("githubUrl")}
                    />
                    {errors.githubUrl && (
                        <p className="text-sm text-destructive">
                            {errors.githubUrl.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="liveUrl">Live URL</Label>
                    <Input
                        id="liveUrl"
                        placeholder="https://example.com"
                        {...register("liveUrl")}
                    />
                    {errors.liveUrl && (
                        <p className="text-sm text-destructive">
                            {errors.liveUrl.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                        <Label htmlFor="published" className="text-sm font-medium">
                            Publish Project
                        </Label>
                        <p className="text-sm text-muted-foreground">
                            Make this project visible on your portfolio.
                        </p>
                    </div>

                    <Switch
                        id="published"
                        checked={isPublished}
                        onCheckedChange={(checked) => setValue("isPublished", checked)}
                    />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                        <Label htmlFor="featured" className="text-sm font-medium">
                            Featured Project
                        </Label>
                        <p className="text-sm text-muted-foreground">
                            Highlight this project in the featured section.
                        </p>
                    </div>

                    <Switch
                        id="featured"
                        checked={isFeatured}
                        onCheckedChange={(checked) => setValue("isFeatured", checked)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                    {project.projectImages?.map((projectImage, index) => (
                        <div
                            key={projectImage.id}
                            className="group relative overflow-hidden rounded-xl border bg-muted"
                        >
                            <Image
                                src={projectImage.image.url}
                                alt={`Project image ${index + 1}`}
                                width={600}
                                height={400}
                                className="aspect-video h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

                            {/* Delete Button */}
                            <div className="absolute right-1 top-1 transition-all duration-200">
                                <ActionButton
                                    action={deleteProjectImage.bind(null, projectImage.id)}

                                />
                            </div>

                            {/* Image Number */}
                            <div className="absolute bottom-3 left-3 rounded-md bg-black/70 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:opacity-100">
                                Image {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="space-y-6">
                    <FileUploader
                        endpoint="projectImages"
                        onUpload={async (urls) => {
                            setFiles([...urls])
                        }}
                    />
                </div>
            </div>

            <div className="flex justify-end">

                <Button type="submit" disabled={isSubmitting} className="rounded btn-primary">
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </form>
    );
}