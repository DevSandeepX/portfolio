import { getUser } from "@/db/user";
import { auth } from "@clerk/nextjs/server";

export async function requireAdmin() {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const user = await getUser(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const role = sessionClaims?.metadata?.role;

    if (role?.toLowerCase() !== "admin") {
        throw new Error("Forbidden");
    }

    return user;
}