import {
    ArrowRight,
    Download,
    GitBranchIcon,
    // Linkedin,
    Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

interface HeroSectionProps {
    projectCount: number,
    setting: {
        fullName: string;
        designation: string;
        siteDescription: string | null;
        profileImage: string | null;
        experienceYears: number | null;
        resumeUrl: string | null;
        githubUrl: string | null;
        linkedinUrl: string | null;
        email: string | null;
        id: string;
        siteTitle: string;


    }
}



export default function HeroSection({ setting, projectCount }: HeroSectionProps) {
    const {
        fullName,
        designation,
        siteDescription,
        profileImage,
        resumeUrl,
        githubUrl,
        linkedinUrl,
        email,
        siteTitle
    } = setting;


    return (

        <section id="hero" className="relative overflow-hidden">
            {/* Background Blur */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 py-24">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Left */}
                    <div className="space-y-8">
                        <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                            👋 Available for Freelance
                        </span>

                        <div className="space-y-5">
                            <h1 className="title font-bold leading-tight">

                                <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                                    {siteTitle}
                                </span>
                            </h1>

                            <h2 className="subtitle font-semibold text-muted-foreground">
                                {designation ?? "Full Stack Developer"}
                            </h2>

                            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                                {siteDescription}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:scale-105"
                            >
                                View Projects
                                <ArrowRight size={18} />
                            </Link>

                            {resumeUrl && (
                                <Link
                                    href={resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-xl border px-6 py-3 font-medium transition hover:bg-muted"
                                >
                                    <Download size={18} />
                                    Download CV
                                </Link>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            {githubUrl && (
                                <Link
                                    href={githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 hover:-translate-y-1 hover:text-primary"
                                >
                                    <GitBranchIcon className="h-5 w-5" />
                                </Link>
                            )}

                            {linkedinUrl && (
                                <Link
                                    href={linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 hover:-translate-y-1 hover:text-primary"
                                >
                                    {/* <Linkedin className="h-5 w-5" /> */}
                                </Link>
                            )}

                            {email && (
                                <Link
                                    href={`mailto:${email}`}
                                    className="glass flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 hover:-translate-y-1 hover:text-primary"
                                >
                                    <Mail className="h-5 w-5" />
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary to-cyan-500 opacity-20 blur-3xl" />

                            <div className="relative h-[420px] w-[340px] overflow-hidden rounded-3xl border bg-card shadow-2xl">
                                <Image
                                    src={
                                        profileImage ??
                                        "/assets/images/profile.jpeg"
                                    }
                                    alt={fullName}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            </div>


                            <HeroCard
                                title="🚀 Experience"
                                value={`${setting.experienceYears || 2}`}
                                subtitle="Years"
                                className="-left-8 top-10"
                            />


                            <HeroCard
                                title="💼 Projects"
                                value={`${projectCount} +`}
                                subtitle="Completed"
                                className="-right-8 bottom-10"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

interface HeroCardProps {
    title: string;
    value: string;
    subtitle: string;
    className?: string;
}

function HeroCard({
    title,
    value,
    subtitle,
    className,
}: HeroCardProps) {
    return (
        <div
            className={`absolute hidden rounded-xl border bg-background/90 px-4 py-3 shadow-lg backdrop-blur lg:block ${className}`}
        >
            <p className="text-sm font-medium">{title}</p>

            <p className="text-xl font-bold">
                {value}{" "}
                <span className="text-base font-medium text-muted-foreground">
                    {subtitle}
                </span>
            </p>
        </div>
    );
}