import { blogTable } from "@/drizzle/schema";
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


import type { InferInsertModel } from "drizzle-orm";

export const mockBlogs: InferInsertModel<typeof blogTable>[] = [
    {
        title: "Mastering Next.js 15 App Router",
        slug: "mastering-nextjs-15-app-router",
        excerpt:
            "Learn the App Router, Server Components, Route Handlers, caching, and best practices in Next.js 15.",
        image:
            "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        status: "published",
        categoryId: "11111111-1111-1111-1111-111111111111",
        authorId: "user_2abc123",
        content: {
            "type": "doc",
            "content": [
                {
                    "type": "heading",
                    "attrs": { "level": 1 },
                    "content": [{ "type": "text", "text": "Mastering Next.js 15: The Complete Guide" }]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "text",
                            "marks": [{ "type": "italic" }],
                            "text": "Next.js 15 brings revolutionary changes to the React ecosystem."
                        },
                        { "type": "text", "text": " With the new compiler, improved caching strategies, and the App Router reaching maturity, there's never been a better time to upgrade your skills." }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": { "level": 2 },
                    "content": [{ "type": "text", "text": "What's New in Next.js 15?" }]
                },
                {
                    "type": "paragraph",
                    "content": [{ "type": "text", "text": "The latest release focuses on performance and developer experience. Here are the key highlights:" }]
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
                                        { "type": "text", "marks": [{ "type": "bold" }], "text": "Turbopack" },
                                        { "type": "text", "text": " - Now stable and 700x faster than Webpack for large applications" }
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
                                        { "type": "text", "marks": [{ "type": "bold" }], "text": "Server Actions" },
                                        { "type": "text", "text": " - Enhanced security and automatic deduplication" }
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
                                        { "type": "text", "marks": [{ "type": "bold" }], "text": "Partial Prerendering" },
                                        { "type": "text", "text": " - Static and dynamic content combined seamlessly" }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": { "level": 2 },
                    "content": [{ "type": "text", "text": "The App Router Deep Dive" }]
                },
                {
                    "type": "paragraph",
                    "content": [{ "type": "text", "text": "The App Router represents a paradigm shift in how we build React applications. Understanding its core concepts is crucial:" }]
                },
                {
                    "type": "orderedList",
                    "attrs": { "start": 1 },
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        { "type": "text", "marks": [{ "type": "bold" }], "text": "Server Components" },
                                        { "type": "text", "text": " - Render on the server by default, reducing JavaScript bundle size" }
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
                                        { "type": "text", "marks": [{ "type": "bold" }], "text": "Client Components" },
                                        { "type": "text", "text": " - Opt-in interactivity with the 'use client' directive" }
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
                                        { "type": "text", "marks": [{ "type": "bold" }], "text": "Layouts" },
                                        { "type": "text", "text": " - Nested layouts that preserve state across navigation" }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": { "level": 2 },
                    "content": [{ "type": "text", "text": "Code Example: Server Actions" }]
                },
                {
                    "type": "paragraph",
                    "content": [{ "type": "text", "text": "Here's how to implement a secure form submission using Server Actions:" }]
                },
                {
                    "type": "codeBlock",
                    "attrs": { "language": "typescript" },
                    "content": [
                        {
                            "type": "text",
                            "text": "'use server'\n\nimport { revalidatePath } from 'next/cache'\nimport { redirect } from 'next/navigation'\n\nexport async function createPost(formData: FormData) {\n  const title = formData.get('title') as string\n  const content = formData.get('content') as string\n  \n  // Validate input\n  if (!title || !content) {\n    throw new Error('Title and content are required')\n  }\n  \n  // Database logic here\n  await db.post.create({\n    data: { title, content, slug: slugify(title) }\n  })\n  \n  revalidatePath('/posts')\n  redirect('/posts')\n}"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [{ "type": "text", "text": "The beauty of this approach is that the code runs exclusively on the server, eliminating API boilerplate while maintaining type safety." }]
                },
                {
                    "type": "heading",
                    "attrs": { "level": 2 },
                    "content": [{ "type": "text", "text": "Caching Strategies" }]
                },
                {
                    "type": "paragraph",
                    "content": [
                        { "type": "text", "text": "Next.js 15 introduces " },
                        { "type": "text", "marks": [{ "type": "code" }], "text": "unstable_cache" },
                        { "type": "text", "text": " for fine-grained control. Understanding the caching layers is essential:" }
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
                                        { "type": "text", "marks": [{ "type": "bold" }], "text": "Request Memoization" },
                                        { "type": "text", "text": " - Deduplicates fetch requests during rendering" }
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
                                        { "type": "text", "marks": [{ "type": "bold" }], "text": "Data Cache" },
                                        { "type": "text", "text": " - Persists fetch results across requests" }
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
                                        { "type": "text", "marks": [{ "type": "bold" }], "text": "Full Route Cache" },
                                        { "type": "text", "text": " - Statically generates pages at build time" }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": { "level": 2 },
                    "content": [{ "type": "text", "text": "Conclusion" }]
                },
                {
                    "type": "paragraph",
                    "content": [{ "type": "text", "text": "Mastering Next.js 15 requires understanding the shift toward server-first architecture. By leveraging Server Components, Actions, and the new caching model, you can build applications that are both fast and maintainable." }]
                },
                {
                    "type": "paragraph",
                    "content": [
                        { "type": "text", "text": "Ready to upgrade? Check out the " },
                        {
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "href": "https://nextjs.org/docs",
                                        "target": "_blank",
                                        "rel": "noopener noreferrer nofollow"
                                    }
                                }
                            ],
                            "text": "official documentation"
                        },
                        { "type": "text", "text": " for detailed migration guides." }
                    ]
                }
            ]
        },
        tags: ["Next.js", "React", "App Router"],
        readTime: 8,
        featured: true,
        keywords: [
            "nextjs",
            "app router",
            "react",
            "server components",
        ],
        seoTitle: "Mastering Next.js 15 App Router",
        seoDescription:
            "Complete guide to Next.js 15 App Router with practical examples.",
        seoKeywords: [
            "Next.js",
            "React",
            "App Router",
            "Server Components",
        ],
        canonicalUrl:
            "https://sandeep.dev/blog/mastering-nextjs-15-app-router",
        allowComments: true,
        publishedAt: new Date("2026-07-10"),
    },

    {
        title: "Build a Secure Authentication System with Clerk",
        slug: "build-secure-authentication-with-clerk",
        excerpt:
            "Implement authentication, user management, organizations, middleware, and webhooks using Clerk.",
        image:
            "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
        status: "published",
        categoryId: "11111111-1111-1111-1111-111111111112",
        authorId: "user_2abc123",
        content: {
            "type": "doc",
            "content": [
                {
                    "type": "heading",
                    "attrs": { "level": 2 },
                    "content": [{ "type": "text", "text": "Features" }]
                },
                {
                    "type": "bulletList",
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [{ "type": "text", "text": "First item" }]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [{ "type": "text", "text": "Second item" }]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": { "language": "typescript" },
                    "content": [{ "type": "text", "text": "const x = 1;" }]
                }
            ]
        },
        tags: ["Clerk", "Authentication", "Next.js"],
        readTime: 10,
        featured: false,
        keywords: [
            "clerk auth",
            "authentication",
            "nextjs auth",
        ],
        seoTitle: "Complete Clerk Authentication Guide",
        seoDescription:
            "Learn how to build secure authentication using Clerk and Next.js.",
        seoKeywords: [
            "Clerk",
            "Authentication",
            "Next.js",
        ],
        canonicalUrl:
            "https://sandeep.dev/blog/build-secure-authentication-with-clerk",
        allowComments: true,
        publishedAt: new Date("2026-07-08"),
    },

    {
        title: "Prisma ORM Complete Guide with PostgreSQL",
        slug: "prisma-orm-complete-guide",
        excerpt:
            "Learn Prisma schema design, migrations, relations, transactions, and performance optimization.",
        image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        status: "published",
        categoryId: "11111111-1111-1111-1111-111111111113",
        authorId: "user_2abc123",
        content: {
            "type": "doc",
            "content": [
                {
                    "type": "heading",
                    "attrs": { "level": 2 },
                    "content": [{ "type": "text", "text": "Features" }]
                },
                {
                    "type": "bulletList",
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [{ "type": "text", "text": "First item" }]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [{ "type": "text", "text": "Second item" }]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": { "language": "typescript" },
                    "content": [{ "type": "text", "text": "const x = 1;" }]
                }
            ]
        },
        tags: ["Prisma", "PostgreSQL", "Database"],
        readTime: 12,
        featured: true,
        keywords: [
            "prisma",
            "postgres",
            "database",
            "orm",
        ],
        seoTitle: "Prisma ORM with PostgreSQL",
        seoDescription:
            "Everything you need to know about Prisma ORM and PostgreSQL.",
        seoKeywords: [
            "Prisma",
            "PostgreSQL",
            "ORM",
        ],
        canonicalUrl:
            "https://sandeep.dev/blog/prisma-orm-complete-guide",
        allowComments: true,
        publishedAt: new Date("2026-07-05"),
    },

    {
        title: "Docker for Node.js Developers",
        slug: "docker-for-nodejs-developers",
        excerpt:
            "Learn Docker, Docker Compose, multi-stage builds, volumes, and production deployment for Node.js.",
        image:
            "https://images.unsplash.com/photo-1605745341112-85968b19335b",
        status: "published",
        categoryId: "11111111-1111-1111-1111-111111111114",
        authorId: "user_2abc123",
        content: {
            "type": "doc",
            "content": [
                {
                    "type": "heading",
                    "attrs": { "level": 2 },
                    "content": [{ "type": "text", "text": "Features" }]
                },
                {
                    "type": "bulletList",
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [{ "type": "text", "text": "First item" }]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [{ "type": "text", "text": "Second item" }]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": { "language": "typescript" },
                    "content": [{ "type": "text", "text": "const x = 1;" }]
                }
            ]
        },
        tags: ["Docker", "Node.js", "DevOps"],
        readTime: 9,
        featured: false,
        keywords: [
            "docker",
            "docker compose",
            "nodejs",
            "deployment",
        ],
        seoTitle: "Docker Guide for Node.js Developers",
        seoDescription:
            "Deploy Node.js applications using Docker like a professional.",
        seoKeywords: [
            "Docker",
            "Node.js",
            "DevOps",
        ],
        canonicalUrl:
            "https://sandeep.dev/blog/docker-for-nodejs-developers",
        allowComments: true,
        publishedAt: new Date("2026-07-02"),
    },

    {
        title: "Understanding React Server Components",
        slug: "understanding-react-server-components",
        excerpt:
            "Deep dive into React Server Components, rendering strategies, and performance improvements.",
        image:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        status: "published",
        categoryId: "11111111-1111-1111-1111-111111111115",
        authorId: "user_2abc123",
        content: {
            "type": "doc",
            "content": [
                {
                    "type": "heading",
                    "attrs": { "level": 2 },
                    "content": [{ "type": "text", "text": "Features" }]
                },
                {
                    "type": "bulletList",
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [{ "type": "text", "text": "First item" }]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [{ "type": "text", "text": "Second item" }]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": { "language": "typescript" },
                    "content": [{ "type": "text", "text": "const x = 1;" }]
                }
            ]
        },
        tags: ["React", "RSC", "Performance"],
        readTime: 11,
        featured: true,
        keywords: [
            "react",
            "server components",
            "rsc",
            "performance",
        ],
        seoTitle: "Understanding React Server Components",
        seoDescription:
            "Learn React Server Components with practical examples and best practices.",
        seoKeywords: [
            "React",
            "Server Components",
            "RSC",
        ],
        canonicalUrl:
            "https://sandeep.dev/blog/understanding-react-server-components",
        allowComments: true,
        publishedAt: new Date("2026-06-28"),
    },
];

export const projects = [
    {
        title: "AI Learning Management System",
        slug: "ai-learning-management-system",
        content: {
            type: "doc",
            content: [
                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Project Overview" }],
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "AI Learning Management System is a modern full-stack web application that helps educational institutions manage courses, students, quizzes, and learning progress. The platform leverages AI to automatically generate quizzes from course content, reducing manual effort while improving the learning experience.",
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Problem Statement" }],
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "Traditional learning platforms often require instructors to manually create quizzes and manage student progress. This project aims to simplify these tasks with automation, analytics, and an intuitive dashboard.",
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Key Features" }],
                },
                {
                    type: "bulletList",
                    content: [
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "AI-powered quiz generation" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Role-based authentication and authorization" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Course and chapter management" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Interactive analytics dashboard" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Responsive design for desktop and mobile" }],
                                },
                            ],
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Technology Stack" }],
                },
                {
                    type: "orderedList",
                    attrs: {
                        start: 1,
                    },
                    content: [
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Next.js & React" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "TypeScript" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Prisma & PostgreSQL" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Tailwind CSS & shadcn/ui" }],
                                },
                            ],
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Challenges" }],
                },
                {
                    type: "blockquote",
                    content: [
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    text: "Building a scalable architecture while maintaining performance and reusable components was one of the biggest challenges during development.",
                                },
                            ],
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Code Example" }],
                },
                {
                    type: "codeBlock",
                    attrs: {
                        language: "typescript",
                    },
                    content: [
                        {
                            type: "text",
                            text: "const quizzes = await db.quiz.findMany();",
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Conclusion" }],
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "This project demonstrates my ability to build scalable, production-ready web applications using modern technologies while focusing on clean architecture, user experience, and maintainable code.",
                        },
                    ],
                },
            ],
        },
        description:
            "A full-stack LMS with AI-powered quiz generation, authentication, analytics, and course management.",
        image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
        tags: ["Next.js", "Prisma", "PostgreSQL", "OpenAI"],
        github: "#",
        live: "#",
        featured: true,
    },
    {
        title: "Developer Portfolio",
        slug: "developer-portfolio",
        content: {
            type: "doc",
            content: [
                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Project Overview" }],
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "AI Learning Management System is a modern full-stack web application that helps educational institutions manage courses, students, quizzes, and learning progress. The platform leverages AI to automatically generate quizzes from course content, reducing manual effort while improving the learning experience.",
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Problem Statement" }],
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "Traditional learning platforms often require instructors to manually create quizzes and manage student progress. This project aims to simplify these tasks with automation, analytics, and an intuitive dashboard.",
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Key Features" }],
                },
                {
                    type: "bulletList",
                    content: [
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "AI-powered quiz generation" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Role-based authentication and authorization" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Course and chapter management" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Interactive analytics dashboard" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Responsive design for desktop and mobile" }],
                                },
                            ],
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Technology Stack" }],
                },
                {
                    type: "orderedList",
                    attrs: {
                        start: 1,
                    },
                    content: [
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Next.js & React" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "TypeScript" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Prisma & PostgreSQL" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Tailwind CSS & shadcn/ui" }],
                                },
                            ],
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Challenges" }],
                },
                {
                    type: "blockquote",
                    content: [
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    text: "Building a scalable architecture while maintaining performance and reusable components was one of the biggest challenges during development.",
                                },
                            ],
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Code Example" }],
                },
                {
                    type: "codeBlock",
                    attrs: {
                        language: "typescript",
                    },
                    content: [
                        {
                            type: "text",
                            text: "const quizzes = await db.quiz.findMany();",
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Conclusion" }],
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "This project demonstrates my ability to build scalable, production-ready web applications using modern technologies while focusing on clean architecture, user experience, and maintainable code.",
                        },
                    ],
                },
            ],
        },
        description:
            "A modern personal portfolio built with Next.js, Tailwind CSS, and TypeScript.",
        image:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
        tags: ["Next.js", "Tailwind", "TypeScript"],
        github: "#",
        live: "#",
        featured: false,
    },
    {
        title: "Blog CMS",
        slug: "blog-cms",
        content: {
            type: "doc",
            content: [
                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Project Overview" }],
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "AI Learning Management System is a modern full-stack web application that helps educational institutions manage courses, students, quizzes, and learning progress. The platform leverages AI to automatically generate quizzes from course content, reducing manual effort while improving the learning experience.",
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Problem Statement" }],
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "Traditional learning platforms often require instructors to manually create quizzes and manage student progress. This project aims to simplify these tasks with automation, analytics, and an intuitive dashboard.",
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Key Features" }],
                },
                {
                    type: "bulletList",
                    content: [
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "AI-powered quiz generation" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Role-based authentication and authorization" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Course and chapter management" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Interactive analytics dashboard" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Responsive design for desktop and mobile" }],
                                },
                            ],
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Technology Stack" }],
                },
                {
                    type: "orderedList",
                    attrs: {
                        start: 1,
                    },
                    content: [
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Next.js & React" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "TypeScript" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Prisma & PostgreSQL" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Tailwind CSS & shadcn/ui" }],
                                },
                            ],
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Challenges" }],
                },
                {
                    type: "blockquote",
                    content: [
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    text: "Building a scalable architecture while maintaining performance and reusable components was one of the biggest challenges during development.",
                                },
                            ],
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Code Example" }],
                },
                {
                    type: "codeBlock",
                    attrs: {
                        language: "typescript",
                    },
                    content: [
                        {
                            type: "text",
                            text: "const quizzes = await db.quiz.findMany();",
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Conclusion" }],
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "This project demonstrates my ability to build scalable, production-ready web applications using modern technologies while focusing on clean architecture, user experience, and maintainable code.",
                        },
                    ],
                },
            ],
        },
        description:
            "A blogging platform featuring a rich text editor, categories, tags, SEO, and markdown support.",
        image:
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
        tags: ["React", "Prisma", "TipTap"],
        github: "#",
        live: "#",
        featured: false,
    },
    {
        title: "E-Commerce Store",
        slug: "ecommerce-store",
        content: {
            type: "doc",
            content: [
                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Project Overview" }],
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "AI Learning Management System is a modern full-stack web application that helps educational institutions manage courses, students, quizzes, and learning progress. The platform leverages AI to automatically generate quizzes from course content, reducing manual effort while improving the learning experience.",
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Problem Statement" }],
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "Traditional learning platforms often require instructors to manually create quizzes and manage student progress. This project aims to simplify these tasks with automation, analytics, and an intuitive dashboard.",
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Key Features" }],
                },
                {
                    type: "bulletList",
                    content: [
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "AI-powered quiz generation" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Role-based authentication and authorization" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Course and chapter management" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Interactive analytics dashboard" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Responsive design for desktop and mobile" }],
                                },
                            ],
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Technology Stack" }],
                },
                {
                    type: "orderedList",
                    attrs: {
                        start: 1,
                    },
                    content: [
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Next.js & React" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "TypeScript" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Prisma & PostgreSQL" }],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Tailwind CSS & shadcn/ui" }],
                                },
                            ],
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Challenges" }],
                },
                {
                    type: "blockquote",
                    content: [
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    text: "Building a scalable architecture while maintaining performance and reusable components was one of the biggest challenges during development.",
                                },
                            ],
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Code Example" }],
                },
                {
                    type: "codeBlock",
                    attrs: {
                        language: "typescript",
                    },
                    content: [
                        {
                            type: "text",
                            text: "const quizzes = await db.quiz.findMany();",
                        },
                    ],
                },

                {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: "Conclusion" }],
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "This project demonstrates my ability to build scalable, production-ready web applications using modern technologies while focusing on clean architecture, user experience, and maintainable code.",
                        },
                    ],
                },
            ],
        },
        description:
            "A responsive online store with cart, authentication, product management, and payments.",
        image:
            "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1200&q=80",
        tags: ["Next.js", "Stripe", "PostgreSQL"],
        github: "#",
        live: "#",
        featured: true,
    },
];