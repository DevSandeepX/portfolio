import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Briefcase,
    Download,
    GitBranchIcon,
    Mail,
    MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const techStack = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "Prisma",
    "MySQL",
];

export default function AboutSection() {
    return (
        <section
            id="about"
            className="relative overflow-hidden py-24 lg:py-32"
        >
            {/* Background */}

            <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
            <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-primary/10 blur-[160px]" />

            <div className="container relative z-10">

                {/* Heading */}

                <div className="mx-auto mb-20 max-w-3xl text-center">
                    <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                        About Me
                    </span>

                    <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                        Building Modern Web Applications
                        <br />
                        with Clean Code & Great UX.
                    </h2>

                    <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                        Passionate about creating fast, scalable and responsive digital
                        experiences using modern web technologies.
                    </p>
                </div>

                <div className="grid items-center gap-16 lg:grid-cols-[360px_1fr]">

                    {/* LEFT */}

                    <div className="glass sticky top-28 rounded-3xl p-8">

                        <div className="flex flex-col items-center">

                            <div className="relative flex h-[420px] w-[340px] items-center justify-center rounded-3xl border bg-card shadow-2xl">
                                <Image
                                    src="/assets/images/profile.jpeg"
                                    width={240}
                                    height={300}
                                    alt="Sandeep Chauhan"
                                    className="h-full w-full rounded-3xl object-cover"
                                />
                            </div>
                            <h3 className="mt-6 text-2xl font-bold">
                                Sandeep Chauhan
                            </h3>

                            <p className="mt-1 text-muted-foreground">
                                Full Stack Developer
                            </p>
                        </div>

                        <div className="mt-10 space-y-5">

                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-primary" />
                                <span>Uttar Pradesh, India</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Briefcase className="h-5 w-5 text-primary" />
                                <span>Python Trainer @ GIIT</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <ArrowRight className="h-5 w-5 text-primary" />
                                <span>Open to Freelance & Full-Time</span>
                            </div>

                        </div>

                        <div className="mt-10 flex justify-center gap-4">

                            <Link
                                href="https://github.com/DevSandeepX"
                                target="_blank"
                                className="social-icon"
                            >
                                <GitBranchIcon className="h-5 w-5" />
                            </Link>

                            <Link
                                href="mailto:sandeep87565590@gmail.com"
                                className="social-icon"
                            >
                                <Mail className="h-5 w-5" />
                            </Link>

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div>

                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                            Who I Am
                        </p>

                        <h3 className="mt-4 text-4xl font-bold leading-tight">
                            Passionate Full Stack Developer creating
                            user-focused digital products.
                        </h3>

                        <p className="mt-8 text-lg leading-8 text-muted-foreground">
                            I'm a Full Stack Developer with a passion for transforming ideas
                            into modern, scalable and high-performance web applications. I
                            enjoy building clean interfaces, writing maintainable backend
                            code, and delivering seamless user experiences.
                        </p>

                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            Alongside development, I teach Python, Web Development, IoT and
                            Advanced Excel. I enjoy solving real-world problems, exploring
                            new technologies, and continuously improving my development
                            skills through practical projects.
                        </p>

                        {/* Tech */}

                        <div className="mt-10">

                            <h4 className="mb-4 text-lg font-semibold">
                                Technologies I Work With
                            </h4>

                            <div className="flex flex-wrap gap-3">

                                {techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-full border border-border bg-background px-4 py-2 text-sm transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:text-primary"
                                    >
                                        {tech}
                                    </span>
                                ))}

                            </div>

                        </div>

                        <div className="mt-12 flex flex-wrap gap-4">

                            <Button size="lg">
                                <Download className="mr-2 h-4 w-4" />
                                Download Resume
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"

                            >
                                <Link href="/projects">
                                    View Projects
                                </Link>
                            </Button>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}