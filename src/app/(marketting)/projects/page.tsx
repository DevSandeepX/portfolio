import Link from "next/link";

const projects = [
    {
        id: 1,
        title: "AI Learning Management System",
        slug: "ai-learning-management-system",
        description:
            "A full-stack LMS with AI-powered quiz generation, authentication, analytics, and course management.",
        image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
        tags: ["Next.js", "Prisma", "PostgreSQL", "OpenAI"],
        github: "#",
        live: "#",
        featured: true,
    },
    {
        id: 2,
        title: "Developer Portfolio",
        slug: "developer-portfolio",
        description:
            "A modern personal portfolio built with Next.js, Tailwind CSS, and TypeScript.",
        image:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
        tags: ["Next.js", "Tailwind", "TypeScript"],
        github: "#",
        live: "#",
        featured: false,
    },
    {
        id: 3,
        title: "Blog CMS",
        slug: "blog-cms",
        description:
            "A blogging platform featuring a rich text editor, categories, tags, SEO, and markdown support.",
        image:
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
        tags: ["React", "Prisma", "TipTap"],
        github: "#",
        live: "#",
        featured: false,
    },
    {
        id: 4,
        title: "E-Commerce Store",
        slug: "ecommerce-store",
        description:
            "A responsive online store with cart, authentication, product management, and payments.",
        image:
            "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1200&q=80",
        tags: ["Next.js", "Stripe", "PostgreSQL"],
        github: "#",
        live: "#",
        featured: true,
    },
];

export default function ProjectsPage() {
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
                {projects.map((project) => (
                    <article
                        key={project.id}
                        className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="relative aspect-video overflow-hidden">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />

                            {project.featured && (
                                <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                                    Featured
                                </span>
                            )}
                        </div>

                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-slate-900">
                                {project.title}
                            </h2>

                            <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                                {project.description}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="font-medium text-indigo-600 hover:text-indigo-700"
                                >
                                    View Details →
                                </Link>

                                <div className="flex gap-4 text-sm">
                                    <a
                                        href={project.github}
                                        className="text-slate-600 hover:text-slate-900"
                                    >
                                        GitHub
                                    </a>

                                    <a
                                        href={project.live}
                                        className="text-slate-600 hover:text-slate-900"
                                    >
                                        Live
                                    </a>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}