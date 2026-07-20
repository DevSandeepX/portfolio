import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, User, ArrowLeft, Share2, Bookmark, Link2 } from "lucide-react";
import { notFound } from "next/navigation";
import { QUERIES } from "@/server/db/post-queries";
import { TipTabRenderer } from "@/components/TipTabRenderer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function BlogPage({ params }: Props) {
    const { slug } = await params;
    const post = await QUERIES.getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const authorName = post.authorId ?? "Unknown Author";
    const categoryName = post.categoryId ?? "Article";

    return (
        <main className="min-h-screen bg-background">
            {/* Sticky Navigation */}
            <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
                <div className="container mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
                    <Button variant="ghost" size="sm" >
                        <Link href="/blogs" className="gap-2 text-muted-foreground hover:text-foreground flex">
                            <ArrowLeft className="size-4" />
                            Back to articles
                        </Link>
                    </Button>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="size-9">
                            <Bookmark className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-9">
                            <Share2 className="size-4" />
                        </Button>
                    </div>
                </div>
            </nav>

            <article className="container pb-20">
                {/* Hero Section */}
                <header className="pt-12 md:pt-16">
                    {/* Category Badge */}
                    <div className="flex items-center gap-3">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary ring-1 ring-primary/20">
                            {categoryName}
                        </span>
                        {post.featured && (
                            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-600 ring-1 ring-amber-500/20">
                                Featured
                            </span>
                        )}
                    </div>

                    <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    {post.excerpt && (
                        <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
                            {post.excerpt}
                        </p>
                    )}

                    {/* Author & Meta Bar */}
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y py-6">
                        <div className="flex items-center gap-4">
                            {/* <Avatar className="size-12 border-2 border-border">
                                {post.author?.avatar ? (
                                    <Image src={post.author.avatar} alt={authorName} width={48} height={48} />
                                ) : (
                                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                        {authorInitials}
                                    </AvatarFallback>
                                )}
                            </Avatar> */}
                            <div>
                                <p className="font-semibold text-foreground">{authorName}</p>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    {post.publishedAt && (
                                        <time dateTime={post.publishedAt.toISOString()}>
                                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </time>
                                    )}
                                    {post.readTime && (
                                        <>
                                            <span className="text-border">•</span>
                                            <span className="flex items-center gap-1">
                                                <Clock3 className="size-3.5" />
                                                {post.readTime} min read
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Social Share */}

                    </div>
                </header>



                {/* Article Content */}
                <div className="">
                    <TipTabRenderer content={post.content} />
                </div>

                {/* Engagement Section */}
                <div className="mt-16 rounded-2xl bg-muted/50">
                    <div className="flex flex-col items-center text-center gap-4">
                        <h3 className="text-2xl font-bold">Enjoyed this article?</h3>
                        <p className="text-muted-foreground max-w-md">
                            Subscribe to our newsletter for weekly insights on Next.js, React, and modern web development.
                        </p>
                        <div className="flex w-full max-w-sm gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                            />
                            <Button>Subscribe</Button>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-12">
                        <Separator className="mb-8" />
                        <div className="flex flex-wrap items-center gap-3">

                            {post.tags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/blogs?tag=${encodeURIComponent(tag)}`}
                                    className="group flex items-center gap-1.5 rounded-full border bg-background px-4 py-2 text-sm transition-colors hover:border-primary hover:bg-primary/5"
                                >
                                    <span className="text-muted-foreground group-hover:text-primary">#</span>
                                    <span className="font-medium">{tag}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-16">
                    <h3 className="text-2xl font-bold mb-6">More to read</h3>
                    <div className="grid gap-6 sm:grid-cols-2">
                        {[1, 2].map((i) => (
                            <Link
                                key={i}
                                href="/blogs"
                                className="group block rounded-xl border bg-card p-6 transition-colors hover:bg-accent"
                            >
                                <span className="text-xs font-medium text-primary">Next.js</span>
                                <h4 className="mt-2 font-semibold group-hover:text-primary transition-colors">
                                    Understanding Server Components in Depth
                                </h4>
                                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                    A comprehensive guide to building performant applications with React Server Components.
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </article>
        </main>
    );
}