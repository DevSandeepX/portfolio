import { Suspense } from "react";
import StatsGrid from "../_components/StatsGrid";
import { Card } from "@/components/ui/card";
import { getRecentProjects } from "@/db/product";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import RecentProjectTable from "../_components/RecentProjectTable";
import { getRecentImages } from "@/db/image";
import { cn } from "@/lib/utils";
import { FaFolder } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { BsLightningChargeFill } from "react-icons/bs";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <Suspense fallback={<p>Loading...</p>}>
                <StatsGrid />
            </Suspense>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Suspense>
                    <Card className="p-4 rounded-sm shadow-sm">
                        <div className="flex justify-between">
                            <h2 className="text-xl font-semibold">Recent Projects</h2>
                            <Button className="rounded" variant="outline">
                                <Link href="/dashboard/projects">
                                    View all projects
                                </Link>
                            </Button>
                        </div>
                        <SuspendedRecentProjects />
                    </Card>
                </Suspense>
                <Suspense>
                    <div className="flex flex-col gap-6">
                        <Card className="p-4 rounded-sm shadow-sm">
                            <div className="flex justify-between">
                                <h2 className="text-xl font-semibold">Recent Images</h2>
                                <Button className="rounded" variant="outline">
                                    <Link href="/dashboard/images">
                                        View all images
                                    </Link>
                                </Button>
                            </div>
                            <SuspendedRecentImages />
                        </Card>

                        <Card className="p-4 rounded-sm shadow-sm">
                            <h2 className="text-xl font-semibold">Quick Actions</h2>
                            <div className="w-full grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                                <ActionCard
                                    bgcolor="bg-cyan-100"
                                    href="/dashboard/projects/create"
                                    textColor="text-cyan-500"
                                    iocn={CiCirclePlus}
                                    label="Add Project"
                                />
                                <ActionCard
                                    bgcolor="bg-green-100"
                                    href="/dashboard/projects/create"
                                    textColor="text-green-500"
                                    iocn={BsLightningChargeFill}
                                    label="Add Skill"
                                />
                                <ActionCard
                                    bgcolor="bg-purple-100"
                                    href="/dashboard/projects/create"
                                    textColor="text-purple-500"
                                    iocn={FaFolder}
                                    label="Add Category"
                                />
                            </div>
                        </Card>
                    </div>
                </Suspense>
            </section>
        </div>
    )
}

type ActionCardProps = {
    label: string,
    iocn: any,
    href: string
    textColor: string,
    bgcolor: string
}

function ActionCard({ bgcolor, href, iocn: Icon, label, textColor }: ActionCardProps) {
    return (
        <Link href={href}
            className={cn(
                "flex items-center justify-center gap-2 flex-col p-6 rounded-sm w-full",
                textColor,
                bgcolor)}>
            <Icon className="size-6" />
            <span>{label}</span>
        </Link>
    )
}


async function SuspendedRecentProjects() {
    const recentProjects = await getRecentProjects()

    return (
        <RecentProjectTable projects={recentProjects} />
    )
}
async function SuspendedRecentImages() {
    const images = await getRecentImages()

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, index) => (
                <div
                    key={index}
                    className="relative aspect-video overflow-hidden rounded-lg border"
                >
                    <Image
                        src={img.url}
                        alt={`Image ${index + 1}`}
                        fill
                        className="object-cover"
                    />
                </div>
            ))}
        </div>
    )
}