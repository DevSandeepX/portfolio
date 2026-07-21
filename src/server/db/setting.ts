import { db } from "@/drizzle/db"
import { settingTable } from "@/drizzle/schema"
import { redirect } from "next/navigation"

export const SETTINGQUERIES = {
    getSetting: async () => {
        const [setting] = await db.select().from(settingTable)
        if (!setting) return redirect("/configure-setting")
        return setting
    }
}


export const SETTINGMUTATION = {
    createSetting: async () => {
        const [existing] = await db.select().from(settingTable)
        if (existing) return existing
        return db.insert(settingTable).values({
            title: "Sandeep.dev",
            tagline: "Building Modern Web Experiences",

            description:
                "Portfolio of Sandeep Chauhan showcasing full-stack web development projects, technical blogs, and expertise in Next.js, React, TypeScript, Node.js, Prisma, and PostgreSQL.",

            primaryCta: "Explore My Work",
            primaryCtaUrl: "/projects",

            secondaryCta: "Let's Connect",
            secondaryCtaUrl: "/contact",

            theme: "LIGHT",
        })
    }
}