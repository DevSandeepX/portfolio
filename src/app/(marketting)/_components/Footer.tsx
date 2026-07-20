import Link from "next/link";

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

export function Footer() {
    return (
        <footer id="contact" className="border-t border-slate-800 bg-slate-950 px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-12 md:grid-cols-4">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500 font-bold text-white">
                                {siteSetting.siteName.charAt(0)}
                            </div>
                            <span className="text-lg font-semibold text-slate-100">
                                {siteSetting.siteName}
                            </span>
                        </div>
                        <p className="max-w-sm text-sm leading-relaxed text-slate-400">
                            {siteSetting.description}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
                            Navigation
                        </h4>
                        <ul className="space-y-2">
                            {siteSetting.navigation.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-slate-400 transition-colors hover:text-indigo-400"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
                            Connect
                        </h4>
                        <ul className="space-y-2">
                            {Object.entries(siteSetting.socialLinks).map(([name, url]) => (
                                <li key={name}>
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-slate-400 capitalize transition-colors hover:text-indigo-400"
                                    >
                                        {name}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a
                                    href={`mailto:${siteSetting.email}`}
                                    className="text-sm text-slate-400 transition-colors hover:text-indigo-400"
                                >
                                    Email
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} {siteSetting.siteName}. All rights reserved.
                    </p>
                    <p className="text-sm text-slate-500">
                        Built with Next.js & Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    );
}