"use server"
import { getUser } from "@/db/user"
import { auth } from "@clerk/nextjs/server"
import { UserButton } from "@clerk/nextjs"
import { Badge } from "@/components/ui/badge"
import { redirect } from "next/navigation"
import { Suspense } from "react"

export default async function CustomUserButton() {
    return (
        <Suspense>
            <SuspendedPage />
        </Suspense>
    )
}

async function SuspendedPage() {
    const { userId } = await auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const user = await getUser(userId)

    if (!user) {
        redirect("/sign-in")
    }

    return (
        <div className="flex items-center justify-between gap-4 rounded-lg border bg-card p-3">
            <div className="min-w-0 flex-1">
                <h4 className="truncate font-medium">
                    {user.name ?? "Anonymous User"}
                </h4>

                <p className="truncate text-sm text-muted-foreground">
                    {user.email}
                </p>

                <Badge variant="secondary" className="mt-2 capitalize">
                    {user.role.toLowerCase()}
                </Badge>
            </div>

            <UserButton
                appearance={{
                    elements: {
                        avatarBox: "h-10 w-10",
                    },
                }}
            />
        </div>
    )
}