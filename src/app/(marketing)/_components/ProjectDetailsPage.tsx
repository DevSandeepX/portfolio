"use client";

import Image from "next/image";
import Link from "next/link";
import { GitBranch, Globe, CalendarDays, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Project = {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    githubUrl: string | null;
    liveUrl: string | null;
    isFeatured: boolean;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;

    images: {
        id: string;
        url: string;
    }[];
};

export default function ProjectDetails({
    project,
}: {
    project: Project;
}) {
    return (
        <div className="container py-12 space-y-12">
            {/* Header */}

            <section className="space-y-5">
                <div className="flex flex-wrap gap-3">
                    {project.isFeatured && (
                        <Badge className="rounded-full">
                            <Star className="mr-1 h-3 w-3 fill-current" />
                            Featured
                        </Badge>
                    )}

                    {project.isPublished ? (
                        <Badge variant="secondary">Published</Badge>
                    ) : (
                        <Badge variant="outline">Draft</Badge>
                    )}
                </div>

                <div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        {project.title}
                    </h1>

                    <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
                        {project.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    {project.liveUrl && (
                        <Button >
                            <Link
                                href={project.liveUrl}
                                target="_blank"
                                className="flex items-center"
                            >
                                <Globe className="mr-2 h-4 w-4" />
                                Live Demo
                            </Link>
                        </Button>
                    )}

                    {project.githubUrl && (
                        <Button
                            variant="outline"

                        >
                            <Link
                                href={project.githubUrl}
                                target="_blank"
                                className="flex items-center"

                            >
                                <GitBranch className="mr-2 h-4 w-4" />
                                GitHub
                            </Link>
                        </Button>
                    )}
                </div>
            </section>

            {/* Hero Image */}

            {project.images.length > 0 && (
                <section>
                    <Image
                        src={project.images[0].url}
                        alt={project.title}
                        width={1400}
                        height={800}
                        className="aspect-video w-full rounded-2xl border object-cover"
                    />
                </section>
            )}

            {/* Gallery */}

            <section className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold">
                        Project Screenshots
                    </h2>

                    <p className="text-muted-foreground mt-2">
                        Explore different pages and features of the application.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {project.images.map((image, index) => (
                        <div
                            key={image.id}
                            className="group overflow-hidden rounded-xl border bg-card"
                        >
                            <Image
                                src={image.url}
                                alt={`${project.title} Screenshot ${index + 1}`}
                                width={1200}
                                height={700}
                                className="aspect-video w-full object-cover transition duration-300 group-hover:scale-105"
                            />

                            <div className="border-t p-4">
                                <p className="font-medium">
                                    Screenshot {index + 1}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* Information */}

            <section className="rounded-2xl border p-6">
                <h2 className="mb-6 text-2xl font-semibold">
                    Project Information
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Created
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            {new Date(project.createdAt).toLocaleDateString()}
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Last Updated
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            {new Date(project.updatedAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}