// app/page.tsx (Next.js App Router example)
// or pages/index.tsx for Pages Router

import Link from "next/link";
import Image from "next/image";
import { Footer } from "./_components/Footer";
import { HeroSection } from "./_components/HeroSection";

// ============================================================================
// MOCK DATA - Simulating data from siteSetting API/CMS
// ============================================================================



// Mock Portfolio Projects
const projects = [
  {
    id: 1,
    title: "Fintech Dashboard",
    category: "Web Application",
    description:
      "A comprehensive financial analytics platform with real-time data visualization and portfolio management.",
    image: "/projects/fintech.jpg",
    tags: ["React", "TypeScript", "D3.js", "Node.js"],
    link: "/work/fintech-dashboard",
    featured: true,
    year: "2024",
  },
  {
    id: 2,
    title: "E-commerce Redesign",
    category: "UI/UX Design",
    description:
      "Complete redesign of a fashion e-commerce platform focusing on mobile-first experience and conversion optimization.",
    image: "/projects/ecommerce.jpg",
    tags: ["Figma", "Next.js", "Tailwind CSS", "Stripe"],
    link: "/work/ecommerce-redesign",
    featured: true,
    year: "2024",
  },
  {
    id: 3,
    title: "AI Content Platform",
    category: "SaaS Product",
    description:
      "An AI-powered content creation tool helping marketers generate and optimize copy for multiple channels.",
    image: "/projects/ai-platform.jpg",
    tags: ["Python", "OpenAI", "FastAPI", "PostgreSQL"],
    link: "/work/ai-content-platform",
    featured: true,
    year: "2023",
  },
  {
    id: 4,
    title: "Health & Wellness App",
    category: "Mobile App",
    description:
      "Cross-platform mobile application for tracking fitness goals and mental wellness with social features.",
    image: "/projects/health.jpg",
    tags: ["React Native", "Firebase", "HealthKit"],
    link: "/work/health-app",
    featured: false,
    year: "2023",
  },
];

// Mock Blog Posts
const blogPosts = [
  {
    id: 1,
    title: "Building Scalable Design Systems in 2024",
    excerpt:
      "A deep dive into creating design systems that grow with your product and team, from tokens to components.",
    slug: "building-scalable-design-systems-2024",
    coverImage: "/blog/design-systems.jpg",
    publishedAt: "2024-06-15",
    readingTime: "8 min read",
    category: "Design",
    featured: true,
  },
  {
    id: 2,
    title: "The Future of React Server Components",
    excerpt:
      "Exploring how RSCs are changing the way we build React applications and what it means for developers.",
    slug: "future-of-react-server-components",
    coverImage: "/blog/react-rsc.jpg",
    publishedAt: "2024-05-28",
    readingTime: "12 min read",
    category: "Development",
    featured: true,
  },
  {
    id: 3,
    title: "From Code to Canvas: My Creative Process",
    excerpt:
      "How I approach the intersection of technical implementation and visual design in my projects.",
    slug: "code-to-canvas-creative-process",
    coverImage: "/blog/creative-process.jpg",
    publishedAt: "2024-05-10",
    readingTime: "6 min read",
    category: "Personal",
    featured: false,
  },
  {
    id: 4,
    title: "TypeScript Patterns I Use Daily",
    excerpt:
      "Practical TypeScript patterns that have improved my code quality and developer experience.",
    slug: "typescript-patterns-daily",
    coverImage: "/blog/typescript.jpg",
    publishedAt: "2024-04-22",
    readingTime: "10 min read",
    category: "Development",
    featured: false,
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}


export default function HomePage() {
  return (
    <div className="min-h-screen text-slate-100">
      <main>
        <HeroSection />
      </main>
    </div>
  );
}

