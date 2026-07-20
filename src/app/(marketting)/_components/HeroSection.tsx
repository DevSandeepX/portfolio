const siteSetting = {
    // Site Identity
    siteName: "Alex Morgan",
    tagline: "Full-Stack Developer & UI Designer",
    description:
        "I craft digital experiences that blend clean code with thoughtful design. Based in San Francisco, working worldwide.",

    // Branding
    logo: "/logo.svg",
    favicon: "/favicon.ico",

    // Contact & Social
    email: "hello@alexmorgan.dev",
    socialLinks: {
        github: "https://github.com/alexmorgan",
        linkedin: "https://linkedin.com/in/alexmorgan",
        twitter: "https://twitter.com/alexmorgan",
        dribbble: "https://dribbble.com/alexmorgan",
    },

    // Navigation
    navigation: [
        { label: "Work", href: "#work" },
        { label: "Blog", href: "#blog" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
    ],

    // Theme Settings
    theme: {
        primaryColor: "#6366f1", // indigo-500
        darkMode: true,
    },

    // Homepage Sections
    sections: {
        hero: {
            enabled: true,
            showCta: true,
            ctaText: "View My Work",
            ctaLink: "#work",
            secondaryCta: {
                text: "Get in Touch",
                link: "#contact",
            },
        },
        stats: {
            enabled: true,
            items: [
                { label: "Years Experience", value: "8+" },
                { label: "Projects Completed", value: "120+" },
                { label: "Happy Clients", value: "50+" },
                { label: "Cups of Coffee", value: "∞" },
            ],
        },
        featuredWork: {
            enabled: true,
            title: "Featured Projects",
            subtitle: "A selection of my recent work",
            showAllLink: "/work",
        },
        blog: {
            enabled: true,
            title: "Latest from the Blog",
            subtitle: "Thoughts on development, design, and everything in between",
            postsToShow: 3,
            showAllLink: "/blog",
        },
        newsletter: {
            enabled: true,
            title: "Stay Updated",
            description: "Subscribe to get notified about new projects and articles.",
            buttonText: "Subscribe",
        },
    },

    // SEO
    seo: {
        title: "Alex Morgan | Full-Stack Developer & UI Designer",
        description:
            "Portfolio of Alex Morgan - Full-stack developer and UI designer crafting digital experiences.",
        ogImage: "/og-image.jpg",
    },
};

export function HeroSection() {
    const { hero } = siteSetting.sections;

    return (
        <section className="relative overflow-hidden bg-white">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-white" />

            <div className="relative mx-auto max-w-6xl px-6 py-24">
                <div className="max-w-3xl">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-indigo-600">
                        {siteSetting.tagline}
                    </p>

                    <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                        Building digital products that{" "}
                        <span className="text-indigo-600">matter</span>
                    </h1>

                    <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-600">
                        {siteSetting.description}
                    </p>

                    {hero.showCta && (
                        <div className="flex flex-wrap gap-4">
                            <a
                                href={hero.ctaLink}
                                className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
                            >
                                {hero.ctaText}
                            </a>

                            <a
                                href={hero.secondaryCta.link}
                                className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:border-indigo-600 hover:text-indigo-600"
                            >
                                {hero.secondaryCta.text}
                            </a>
                        </div>
                    )}
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
  name: "${siteSetting.siteName}",
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