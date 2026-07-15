import { requireAdmin } from "@/lib/requireAdmin";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = async () => {
    return await requireAdmin()
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    projectImages: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 6,
        },
    })

        .middleware(async ({ req }) => {
            const user = await auth();
            if (!user) throw new UploadThingError("Unauthorized");
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {

            return { uploadedBy: metadata.userId };
        }),
    siteFavicon: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 6,
        },
    })

        .middleware(async ({ req }) => {
            const user = await auth();
            if (!user) throw new UploadThingError("Unauthorized");
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {

            return { uploadedBy: metadata.userId };
        }),
    profileImage: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 6,
        },
    })

        .middleware(async ({ req }) => {
            const user = await auth();
            if (!user) throw new UploadThingError("Unauthorized");
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {

            return { uploadedBy: metadata.userId };
        }),
    resume: f({
        pdf: {
            maxFileSize: "4MB",
            maxFileCount: 1,
        },
    })

        .middleware(async ({ req }) => {
            const user = await auth();
            if (!user) throw new UploadThingError("Unauthorized");
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {

            return { uploadedBy: metadata.userId };
        }),


} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
