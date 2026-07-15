import { Card } from "@/components/ui/card"
import { getDashboardStats } from "@/db/dashboard"
import { FaFolder } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { BsLightningChargeFill } from "react-icons/bs";
import { GoProjectRoadmap } from "react-icons/go";

export default async function StatsGrid() {
    const { categories, images, projects, skills } = await getDashboardStats()
    return (
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <DashboardStats
                icon={FaFolder}
                iconBgColor="bg-purple-100"
                iconColor="text-purple-400"
                label="Categories"
                value={categories}
            />
            <DashboardStats
                icon={GoProjectRoadmap}
                iconBgColor="bg-green-100"
                iconColor="text-green-400"
                label="Projects"
                value={projects}
            />

            <DashboardStats
                icon={BsLightningChargeFill}
                iconBgColor="bg-blue-100"
                iconColor="text-blue-400"
                label="Skills"
                value={skills}
            />

            <DashboardStats
                icon={GrGallery}
                iconBgColor="bg-yellow-100"
                iconColor="text-yellow-400"
                label="Images"
                value={images}
            />


        </div>
    )
}

type DashboardStatsProps = {
    icon: any,
    label: string,
    value: any,
    iconColor: string,
    iconBgColor: string
}

function DashboardStats({ icon: Icon, iconBgColor, iconColor, label, value }: DashboardStatsProps) {
    return (
        <Card className="rounded-sm shadow-sm p-4">
            <div className="flex items-start">
                <span className={`p-2 rounded ${iconBgColor} mr-4`}>
                    <Icon className={`size-8 ${iconColor}`} />
                </span>
                <div className="">
                    <h4 className="text-sm text-gray-700">{label}</h4>
                    <h2 className="text-2xl font-bold">{value}</h2>
                </div>
            </div>
        </Card>
    )
}
