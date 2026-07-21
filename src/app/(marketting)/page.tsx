
import { HeroSection } from "./_components/HeroSection";
import { SETTINGQUERIES } from "@/server/db/setting";


function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}


export default async function HomePage() {
  const setting = await SETTINGQUERIES.getSetting()
  console.log(setting)
  return (
    <main className="min-h-screen text-slate-100">
      <HeroSection setting={setting} />
    </main>
  );
}

