import { getAppSetting } from "@/db/setting";
import FeaturedProjects from "./_components/FeaturedProjects";
import HeroSection from "./_components/HeroSection";
import TechStackSection from "./_components/TechStackSection";
import { notFound } from "next/navigation";
import { getDashboardStats } from "@/db/dashboard";
import { getFeaturedProjects } from "@/db/product";
import { getCategoriesWithSkills } from "@/db/skill";
import { Suspense } from "react";
import HomePageSkeleton from "./_components/HomePageSkeleton";


export default async function Home() {

  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <SuspendedPage />
    </Suspense>
  );
}


async function SuspendedPage() {
  const [setting, { projects }, featuredProjects, skills] = await Promise.all([
    getAppSetting(),
    getDashboardStats(),
    getFeaturedProjects({ limit: 3 }),
    getCategoriesWithSkills()
  ])
  if (!setting) return notFound()

  return (
    <div className="w-full">
      <HeroSection setting={setting} projectCount={projects} />
      <FeaturedProjects featuredProjects={featuredProjects} />
      <TechStackSection categories={skills} />
    </div>
  )
}
