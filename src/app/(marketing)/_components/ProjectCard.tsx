import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GitBranchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type ProjectCardProps = {
    title: string;
    description?: string | null;
    image: string;
    slug: string;
    liveUrl?: string | null;
    githubUrl?: string | null;
};

export function ProjectCard({
    title,
    description,
    image,
    slug,
    liveUrl,
    githubUrl,
}: ProjectCardProps) {
    return (
        <article className="group overflow-hidden rounded border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <Link href={`/projects/${slug}`} className="block">
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            </Link>

            <div className="space-y-6 p-6">
                <div>
                    <Link
                        href={`/projects/${slug}`}
                        className="inline-block transition-colors hover:text-primary"
                    >
                        <h3 className="text-2xl font-bold">{title}</h3>
                    </Link>

                    {description && (
                        <p className="mt-3 line-clamp-3 text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>

                <div className="flex flex-wrap gap-3">
                    {liveUrl && (
                        <Button >
                            <Link
                                href={liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex"
                            >
                                Live Demo
                                <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    )}

                    {githubUrl && (
                        <Button variant="outline" >
                            <Link
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex"
                            >
                                <GitBranchIcon className="mr-2 h-4 w-4" />
                                Source Code
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </article>
    );
}