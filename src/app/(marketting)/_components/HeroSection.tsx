import { cn } from "@/lib/utils";


interface SiteSetting {
    setting: {
        id: string;
        title: string;
        tagline: string | null;
        description: string | null;
        primaryCta: string | null;
        primaryCtaUrl: string | null;
        secondaryCta: string | null;
        secondaryCtaUrl: string | null;
        theme: "LIGHT" | "DARK" | "SYSTEM";
        createdAt: Date;
        updatedAt: Date;
    }
}
export function HeroSection({ setting }: SiteSetting) {

    return (
        <section className={cn("relative overflow-hidden bg-white")}>
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-white" />

            <div className="relative mx-auto max-w-6xl px-6 py-24">
                <div className="max-w-3xl">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-indigo-600">
                        {setting.tagline}
                    </p>

                    <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                        {setting.title}

                    </h1>

                    <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-600">
                        {setting.description}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        {setting.primaryCtaUrl && (
                            <a
                                href={setting.primaryCtaUrl}
                                className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
                            >
                                {setting.primaryCta}
                            </a>
                        )}
                        {setting.secondaryCtaUrl && (
                            <a
                                href={setting.secondaryCtaUrl}
                                className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
                            >
                                {setting.secondaryCta}
                            </a>
                        )}


                    </div>
                </div>

                {/* Code Card */}
                <div className="mt-16 hidden lg:block">
                    <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
                        <div className="mb-4 flex gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500" />
                            <div className="h-3 w-3 rounded-full bg-yellow-500" />
                            <div className="h-3 w-3 rounded-full bg-green-500" />
                        </div>

                        <pre className="overflow-x-auto font-mono text-sm text-slate-700">
                            <code>{`const developer = {
  name: "${setting.title}",
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "Design"
  ],
  passion: "Creating exceptional user experiences",
  availableForHire: true
};`}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
}