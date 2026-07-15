"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoTerminal } from "react-icons/go";
import { IoHome } from "react-icons/io5";
import { FaFolder } from "react-icons/fa";
import { AiFillProject } from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import { MdOutlineSettings } from "react-icons/md";
import { BsLightningChargeFill } from "react-icons/bs";
import AppCacheButton from "./AppCacheButton";



export default function DashboardSidebar() {

    return (
        <div className='w-full px-2'>
            <div className='h-14 md:h-16 lg:h-18 flex items-center justify-start'>
                <div className='flex items-center'>
                    <Button className="bg-blue-700 text-white rounded mr-2 hover:bg-blue-800">
                        <GoTerminal className="size-4" />
                    </Button>
                    <div className="-space-y-2">
                        <h2 className="text-sm font-semibold">Portfolio</h2>
                        <span className="text-xs text-blue-700">Admin</span>
                    </div>
                </div>
            </div>
            <div className="py-4">
                <NavLink icon={IoHome} label="Dashboard" href="/dashboard" />
            </div>

            <div className="space-y-4">
                <h2 className="text-gray-400  text-base">Manage Content</h2>
                <div className="flex flex-col gap-2">
                    <NavLink icon={FaFolder} label="Categories" href="/dashboard/categories" />
                    <NavLink icon={BsLightningChargeFill} label="Skills" href="/dashboard/skills" />
                    <NavLink icon={AiFillProject} label="Projects" href="/dashboard/projects" />
                    <NavLink icon={GrGallery} label="Images" href="/dashboard/images" />
                </div>
            </div>
            <div className="space-y-4 mt-4">
                <h2 className="text-gray-400  text-base">App settings</h2>
                <div className="flex flex-col gap-2">
                    <NavLink icon={MdOutlineSettings} label="Settings" href="/dashboard/settings" />
                    <AppCacheButton />
                </div>
            </div>
        </div>
    )
}

type NavLinkProps = {
    icon: any,
    label: string,
    href: string
}

function NavLink({ href, icon: Icon, label }: NavLinkProps) {
    const pathname = usePathname()
    return (
        <Link href={href} className={cn("flex items-center px-2 rounded text-sm text-gray-300 py-2", pathname === href && "bg-blue-700 text-white")}>
            <Icon className="size-4  mr-2" /> {label}
        </Link>
    )
}