import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QUERIES } from "@/server/db/post-queries";
import CustomPagination from "@/components/CustomPagination";
export default async function BlogPage({
    searchParams,
}: {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        q?: string;
    }>;
}) {
    const {
        page = "1",
        limit = "10",
        q = "",
    } = await searchParams;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const { posts, pagination } = await QUERIES.getAllPosts({
        page: pageNumber,
        limit: limitNumber,
        q,
    });

    return (
        <main className="container py-12 space-y-12">

            {/* Hero */}

            <section className="text-center max-w-3xl mx-auto space-y-4">

                <Badge>Developer Blog</Badge>

                <h1 className="text-5xl font-bold">
                    Web Development Articles & Tutorials
                </h1>

                <p className="text-muted-foreground text-lg">
                    Practical tutorials about Next.js, React, Node.js, Prisma,
                    TypeScript, backend architecture and modern frontend development.
                </p>

                <div className="flex gap-3 mt-6">
                    <Input placeholder="Search articles..." />
                    <Button>Search</Button>
                </div>

            </section>



            <section>

                <h2 className="text-3xl font-bold mb-8">
                    Latest Articles
                </h2>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blogs/${post.slug}`}
                            className="border rounded-xl overflow-hidden hover:shadow-lg transition"
                        >

                            <div className="relative aspect-video">

                                {post.image && <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />}

                            </div>

                            <div className="p-5 space-y-3">

                                <Badge>{post.categoryId}</Badge>

                                <h3 className="font-bold text-xl">
                                    {post.title}
                                </h3>

                                <p className="text-muted-foreground text-sm line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="flex justify-between text-xs text-muted-foreground">

                                    <span>{post.publishedAt && post.publishedAt.toLocaleTimeString() || "Unknown date"}</span>

                                    <span>{post.readTime}</span>

                                </div>

                            </div>

                        </Link>
                    ))}

                </div>

            </section>

            {/* Pagination */}
            <CustomPagination
                totalPages={pagination.totalPages}
            />

        </main>
    );
}