import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    Calendar,
    ExternalLink,
    GitBranch

} from "lucide-react";
import { TipTapRenderer } from "@/components/TipTapRenderer";
import { QUERIES } from "@/server/db/project";


export default async function ProjectDetailsPage({ params }: {
    params: Promise<{ slug: string }>
}) {


    const { slug } = await params

    const project = await QUERIES.getProjectBySlug(slug)
    return (
        <main className="container mx-auto max-w-7xl py-12">
            <Link
                href="/projects"
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
            </Link>

            <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
                {/* Main Content */}
                <div>
                    {project.image && <div className="overflow-hidden rounded-2xl border">
                        <Image
                            src={project.image}
                            alt={project.title}
                            width={1400}
                            height={800}
                            className="aspect-video w-full object-cover"
                        />
                    </div>}

                    <div className="mt-8">


                        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
                            {project.title}
                        </h1>

                        <p className="mt-5 text-lg leading-8 text-muted-foreground">
                            {project.description}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            {project.live && <Link
                                href={project.live}
                                target="_blank"
                                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-primary-foreground"
                            >
                                <ExternalLink size={18} />
                                Live Demo
                            </Link>}

                            {project.github && <Link
                                href={project.github}
                                target="_blank"
                                className="inline-flex items-center gap-2 rounded-lg border px-5 py-3"
                            >
                                <GitBranch size={18} />
                                GitHub
                            </Link>}
                        </div>
                    </div>

                    {project.content && <article className="prose mt-12 max-w-none dark:prose-invert">
                        <TipTapRenderer content={project.content} />
                    </article>}
                </div>

                {/* Sidebar */}
                <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
                    <div className="rounded-xl border p-6">
                        <h2 className="mb-5 text-lg font-semibold">
                            Project Information
                        </h2>

                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <span>Status</span>
                                <span className="font-medium">{project.status}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    Created
                                </span>

                                <span>{project.createdAt.toLocaleString()}</span>
                            </div>

                        </div>
                    </div>

                    <div className="rounded-xl border p-6">
                        <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold">
                            Tech Stack
                        </h2>

                        <div className="flex flex-wrap gap-2">
                            {project.techStack && project.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-full border bg-muted px-3 py-1 text-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}