import Link from "next/link";



export default function Navbar() {
    const publicLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Blogs", href: "/blogs" },
        { label: "Contact", href: "/contact" },
    ]
    return (
        <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
            <nav className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight text-slate-900"
                >
                    Sandeep<span className="text-indigo-600">.dev</span>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-8">
                    {publicLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
                        >
                            {link.label}
                        </Link>
                    ))}


                </div>
            </nav>
        </header>
    );
}