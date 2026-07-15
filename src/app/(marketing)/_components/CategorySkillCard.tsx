interface CategorySkillCardProps {
    title: string;
    children: {
        id: string;
        title: string;
        skills: {
            id: string;
            title: string;
        }[];
    }[];
}

export default function CategorySkillCard({
    title,
    children,
}: CategorySkillCardProps) {
    return (
        <section>
            {/* Heading */}
            <div className="mb-6 md:mb-8 flex items-center gap-3">
                <div className="h-7 w-1 rounded-full bg-primary md:h-9" />

                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                    {title}
                </h2>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {children.map((child) => (
                    <div
                        key={child.id}
                        className="rounded-2xl border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl sm:p-6"
                    >
                        <h3 className="mb-5 text-lg font-semibold text-primary sm:text-xl">
                            {child.title}
                        </h3>

                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {child.skills.map((skill) => (
                                <span
                                    key={skill.id}
                                    className="rounded-lg border bg-background px-3 py-2 text-xs font-medium transition-colors hover:border-primary hover:bg-primary/5 sm:px-4 sm:text-sm"
                                >
                                    {skill.title}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}