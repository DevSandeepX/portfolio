import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';
import { getAppSetting, getAppSettingWithoutCache } from './db/setting';


const publicRoutes = [
    "/",
    "/about",
    "/projects",
    "/contact",
];

export default clerkMiddleware(async (auth, req) => {
    const pathname = req.nextUrl.pathname;
    const { sessionClaims } = await auth();
    const role = sessionClaims?.metadata?.role?.toLowerCase();
    const setting = await getAppSettingWithoutCache();

    // Maintenance Mode
    if (
        setting?.isMantananceMode &&
        pathname !== "/maintenance" &&
        !pathname.startsWith("/api") &&
        role !== "admin"
    ) {
        return NextResponse.redirect(new URL("/maintenance", req.url));
    }

    if (pathname.startsWith("/dashboard")) {
        const { sessionClaims } = await auth()
        const role = sessionClaims?.metadata?.role
        if (role?.toLowerCase() !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }
        await auth.protect();
    }


});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
        // Always run for Clerk-specific frontend API routes
        '/__clerk/(.*)',
    ],
}