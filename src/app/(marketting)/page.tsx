import Link from "next/link";
import Image from "next/image";
import { Footer } from "./_components/Footer";
import { HeroSection } from "./_components/HeroSection";
import { QUERIES } from "@/server/db/setting";


function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}


export default async function HomePage() {
  const setting = await QUERIES.getSetting()
  console.log(setting)
  return (
    <main className="min-h-screen text-slate-100">
      <HeroSection setting={setting} />
    </main>
  );
}

