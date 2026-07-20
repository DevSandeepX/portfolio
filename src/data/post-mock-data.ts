import type { JSONContent } from "@tiptap/core";
export const categories = [
    "All",
    "Next.js",
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Prisma",
    "CSS",
];

type MockPost = {
    id: string;
    title: string;
    slug: string;
    content: JSONContent;
    excerpt: string;
    category: string;
    image: string;
    author: string;
    publishedAt: string;
    readTime: string;
    featured: boolean;
    tags: string[];
};


export const posts: MockPost[] = [
    {
        id: "1",
        title: "Mastering Next.js App Router in 2026",
        slug: "mastering-nextjs-app-router",
        content: {
            "type": "doc",
            "content": [
                {
                    "type": "heading",
                    "attrs": {
                        "level": 1
                    },
                    "content": [
                        {
                            "type": "text",
                            "text": "Mastering Next.js App Router in 2026"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "text",
                            "text": "The App Router is the modern way to build scalable applications with Next.js. It introduces layouts, nested routing, server components, streaming, and powerful caching mechanisms that simplify application architecture."
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "type": "text",
                            "text": "Why App Router?"
                        }
                    ]
                },
                {
                    "type": "bulletList",
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": "Nested layouts reduce code duplication."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": "Server Components improve performance."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": "Streaming makes pages load faster."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": "Built-in data caching simplifies fetching."
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "type": "text",
                            "text": "Project Structure"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": "txt"
                    },
                    "content": [
                        {
                            "type": "text",
                            "text": "app/\n ├── layout.tsx\n ├── page.tsx\n ├── blog/\n │    ├── page.tsx\n │    └── [slug]/page.tsx\n └── dashboard/"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "text",
                            "text": "Each route can have its own layout, loading state, error boundary, and metadata. This makes large applications much easier to organize."
                        }
                    ]
                },
                {
                    "type": "blockquote",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "The App Router encourages thinking in layouts instead of pages."
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "type": "text",
                            "text": "Best Practices"
                        }
                    ]
                },
                {
                    "type": "orderedList",
                    "attrs": {
                        "start": 1
                    },
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": "Use Server Components by default."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": "Move client-only logic into Client Components."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": "Cache database queries whenever possible."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": "Optimize images using the Next.js Image component."
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "horizontalRule"
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "type": "text",
                            "text": "Conclusion"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "text",
                            "text": "Next.js App Router is now the recommended architecture for modern React applications. By leveraging layouts, server components, caching, and streaming, developers can build applications that are both fast and maintainable."
                        }
                    ]
                }
            ]
        },
        excerpt:
            "Learn layouts, server components, caching, routing and best practices for building scalable Next.js applications.",
        category: "Next.js",
        image:
            "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        author: "Sandeep Chauhan",
        publishedAt: "July 15, 2026",
        readTime: "8 min read",
        featured: true,
        tags: ["Next.js", "React"],
    },
    {
        id: "2",
        title: "React Performance Optimization Guide",
        slug: "react-performance",
        content: {
            "type": "doc",
            "content": [
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "text",
                            "text": "Hello World"
                        }
                    ]
                }
            ]
        },
        excerpt:
            "Improve rendering speed using memoization, lazy loading and server components.",
        category: "React",
        image:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        author: "Sandeep Chauhan",
        publishedAt: "July 12, 2026",
        readTime: "6 min read",
        featured: false,
        tags: ["React", "Performance"],
    },
    {
        id: "3",
        title: "Building REST APIs with Node.js & Express",
        slug: "node-rest-api",
        content: {
            "type": "doc",
            "content": [
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "text",
                            "text": "Hello World"
                        }
                    ]
                }
            ]
        },
        excerpt:
            "Create production-ready REST APIs using Express, Prisma and PostgreSQL.",
        category: "Node.js",
        image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        author: "Sandeep Chauhan",
        publishedAt: "July 10, 2026",
        readTime: "10 min read",
        featured: false,
        tags: ["Node.js", "Express"],
    },
    {
        id: "4",
        title: "Prisma Tips Every Backend Developer Should Know",
        slug: "prisma-tips",
        content: {
            "type": "doc",
            "content": [
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "text",
                            "text": "Hello World"
                        }
                    ]
                }
            ]
        },
        excerpt:
            "Schema design, transactions, indexes and query optimization with Prisma.",
        category: "Prisma",
        image:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        author: "Sandeep Chauhan",
        publishedAt: "July 8, 2026",
        readTime: "7 min read",
        featured: false,
        tags: ["Prisma", "Database"],
    },
    {
        id: "5",
        title: "TypeScript Patterns for Large Projects",
        slug: "typescript-patterns",
        content: {
            "type": "doc",
            "content": [
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "text",
                            "text": "Hello World"
                        }
                    ]
                }
            ]
        },
        excerpt:
            "Build maintainable applications using utility types, generics and strict typing.",
        category: "TypeScript",
        image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475",
        author: "Sandeep Chauhan",
        publishedAt: "July 5, 2026",
        readTime: "9 min read",
        featured: false,
        tags: ["TypeScript"],
    },
    {
        id: "6",
        title: "Modern CSS Tricks You Should Use",
        slug: "modern-css",
        content: {
            "type": "doc",
            "content": [
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "text",
                            "text": "Hello World"
                        }
                    ]
                }
            ]
        },
        excerpt:
            "Container queries, clamp(), fluid typography and modern layouts.",
        category: "CSS",
        image:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
        author: "Sandeep Chauhan",
        publishedAt: "July 2, 2026",
        readTime: "5 min read",
        featured: false,
        tags: ["CSS"],
    },
];