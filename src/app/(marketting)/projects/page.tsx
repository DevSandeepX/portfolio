import { PROJECTQUERIES } from "@/server/db/project";
import Link from "next/link";
import ProjectCard from "../_components/ProjectCard";


export interface Project {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    image: string | null;
    github: string;
    live: string;
    status: "in_progress" | "complated" | "archived";
    techStack: string[] | null;
    featured: boolean | null;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;

}
export default async function ProjectsPage() {
    const projects: Project[] = await PROJECTQUERIES.getAllProjects()
    return (
        <main className="container mx-auto px-6 py-24">
            {/* Hero */}
            <section className="max-w-3xl">
                <span className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-600">
                    Portfolio
                </span>

                <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
                    Projects I've Built
                </h1>

                <p className="mt-6 text-lg leading-8 text-slate-600">
                    A collection of applications I've designed and developed using modern
                    web technologies.
                </p>
            </section>

            {/* Grid */}
            <section className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} props={{ project }} />
                ))}
            </section>
        </main>
    );
}