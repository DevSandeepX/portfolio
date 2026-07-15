import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GitBranchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./ProjectCard";

type FeaturedProject = {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    githubUrl: string | null;
    liveUrl: string | null;
    projectImages: {
        image: {
            id: string;
            url: string;
        };
    }[];
};

export default function FeaturedProjects({
    featuredProjects,
}: {
    featuredProjects: FeaturedProject[];
}) {
    if (!featuredProjects.length) return null;

    return (
        <section id="projects" className="py-20">
            <div className="container">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                        Featured Projects
                    </span>

                    <h2 className="mt-5 text-4xl font-bold">
                        Things I've Built
                    </h2>

                    <p className="mt-5 text-lg text-muted-foreground">
                        A selection of projects showcasing my experience in
                        building modern, scalable web applications.
                    </p>
                </div>

                <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {featuredProjects.map((project) => {
                        const image =
                            project.projectImages[0]?.image.url ??
                            "/assets/images/project-placeholder.png";

                        return (
                            <ProjectCard key={project.id} {...{ ...project, image }} />
                        )
                    })}
                </div>

                <div className="mt-16 flex justify-center">
                    <Button size="lg" variant="outline">
                        <Link href="/projects">
                            View All Projects
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}