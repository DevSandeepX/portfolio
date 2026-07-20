import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, User } from "lucide-react";
import { posts } from "@/data/post-mock-data";
import { QUERIES } from "@/server/db/post-queries";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function PostPage({ params }: Props) {
    const { slug } = await params;

    const post = await QUERIES.getPostBySlug(slug)

    if (!post) {
        notFound();
    }

    return (
        <main className="mx-auto container pt-10 pb-20">
            <article className="space-y-8">
                <div className="space-y-4">
                    <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                        {post.category}
                    </span>

                    <h1 className="text-4xl font-bold md:text-5xl">
                        {post.title}
                    </h1>

                    <p className="text-lg text-muted-foreground">
                        {post.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <User size={16} />
                            {post.author}
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            {post.publishedAt}
                        </div>

                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            {post.readTime}
                        </div>
                    </div>
                </div>

                <div className="relative h-[450px] overflow-hidden rounded-xl">
                    {post.image && <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />}
                </div>

            </article>
        </main>
    );
}