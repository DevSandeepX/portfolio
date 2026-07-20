import React from 'react'
import { Project } from '../projects/page'
import Link from 'next/link'

export default function ProjectCard({ props }: { props: { project: Project } }) {
    const { project } = props
    return (
        <article
            key={project.id}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            <Link href={`/projects/${project.slug}`}>
                <div className="relative aspect-video overflow-hidden">
                    {project.image && <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />}

                    {project.featured && (
                        <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                            Featured
                        </span>
                    )}
                </div>
            </Link>
            <div className="p-6">
                <h2 className="text-xl font-semibold text-slate-900">
                    {project.title}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                    {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                    {project.techStack?.map((tag) => (
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
                        <a target="_blank"
                            href={project.github}
                            className="text-slate-600 hover:text-slate-900"
                        >
                            GitHub
                        </a>

                        <a target="_blank"
                            href={project.live}
                            className="text-slate-600 hover:text-slate-900"
                        >
                            Live
                        </a>
                    </div>
                </div>
            </div>

        </article>
    )
}
