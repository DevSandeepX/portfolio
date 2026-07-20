import Link from "next/link";

const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express.js",
    "Prisma",
    "PostgreSQL",
    "MongoDB",
    "Tailwind CSS",
    "Docker",
];

export default function AboutPage() {
    return (
        <main className="container mx-auto px-6 py-24">
            {/* Hero */}
            <section className="max-w-3xl">
                <span className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-600">
                    About Me
                </span>

                <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
                    Building modern web applications with clean code and thoughtful
                    design.
                </h1>

                <p className="mt-6 text-lg leading-8 text-slate-600">
                    Hi, I'm <strong>Sandeep Chauhan</strong>, a Full Stack Developer from
                    India. I enjoy turning ideas into fast, scalable, and user-friendly
                    web applications using modern technologies.
                </p>
            </section>

            {/* About */}
            <section className="mt-20 grid gap-12 lg:grid-cols-2">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900">
                        My Journey
                    </h2>

                    <p className="mt-6 leading-8 text-slate-600">
                        My passion for web development started with simple HTML and CSS
                        projects. Over time, I expanded into JavaScript, React, Next.js, and
                        backend technologies, allowing me to build complete full-stack
                        applications.
                    </p>

                    <p className="mt-4 leading-8 text-slate-600">
                        I enjoy solving real-world problems, optimizing performance, and
                        creating intuitive user experiences. Whether it's an admin dashboard,
                        portfolio, LMS, or blog platform, I focus on writing maintainable
                        and scalable code.
                    </p>

                    <Link
                        href="/projects"
                        className="mt-8 inline-flex rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
                    >
                        View My Projects
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                        <h3 className="text-3xl font-bold text-indigo-600">15+</h3>
                        <p className="mt-2 text-slate-600">Projects Completed</p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                        <h3 className="text-3xl font-bold text-indigo-600">10+</h3>
                        <p className="mt-2 text-slate-600">
                            Technologies Worked With
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                        <h3 className="text-3xl font-bold text-indigo-600">100%</h3>
                        <p className="mt-2 text-slate-600">
                            Passion for Learning
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                        <h3 className="text-3xl font-bold text-indigo-600">∞</h3>
                        <p className="mt-2 text-slate-600">Coffee Consumed</p>
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section className="mt-24">
                <h2 className="text-3xl font-bold text-slate-900">
                    Technologies I Work With
                </h2>

                <p className="mt-3 max-w-2xl text-slate-600">
                    These are the tools and technologies I use to build modern, scalable,
                    and high-performance web applications.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-600 hover:text-indigo-600"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="mt-24 rounded-3xl bg-slate-900 px-8 py-16 text-center">
                <h2 className="text-4xl font-bold text-white">
                    Let's build something amazing.
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                    I'm always interested in exciting projects, collaborations, and new
                    opportunities.
                </p>

                <Link
                    href="/contact"
                    className="mt-8 inline-flex rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
                >
                    Get In Touch
                </Link>
            </section>
        </main>
    );
}