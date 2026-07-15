import type { CategoryWithChildren } from "@/db/skill";
import CategorySkillCard from "./CategorySkillCard";


interface TechStackSectionProps {
    categories: CategoryWithChildren[];
}

export default function TechStackSection({
    categories,
}: TechStackSectionProps) {
    return (
        <section
            id="skills"
            className="py-24"
        >
            <div className="container">

                {/* Heading */}

                <div className="mx-auto mb-20 max-w-3xl text-center">
                    <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                        Tech Stack
                    </span>

                    <h2 className="mt-5 text-4xl font-bold md:text-5xl">
                        Technologies I Work With
                    </h2>

                    <p className="mt-6 text-lg text-muted-foreground">
                        My expertise spans modern frontend, backend, databases,
                        cloud platforms, and development tools used to build
                        scalable web applications.
                    </p>
                </div>

                {/* Categories */}

                <div className="space-y-12 md:space-y-16 lg:space-y-20">
                    {categories.map((parent) => (
                        <CategorySkillCard
                            key={parent.id}
                            title={parent.title}
                            children={parent.children}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}