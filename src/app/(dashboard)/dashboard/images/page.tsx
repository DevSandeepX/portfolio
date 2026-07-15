import { getPaginatedAdminGalleryImages, getPaginatedPublishedGalleryImages } from "@/actions/image";
import { FaImage } from "react-icons/fa6";
import GalleryInfinite from "../../_components/GalleryClient";

const LIMIT = 20;

export default async function GalleryPage() {
    const { data, hasMore } = await getPaginatedAdminGalleryImages({
        page: 1,
        limit: LIMIT,
    });

    if (data.length === 0) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                <FaImage className="size-48" />

                <h2 className="text-2xl font-semibold">
                    No Images Found
                </h2>

                <p className="mt-2 max-w-md text-muted-foreground">
                    There are no gallery images available at the moment.
                    Please check back later.
                </p>
            </div>
        );
    }

    return (
        <div className="container py-10">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold tracking-tight">
                    Gallery
                </h1>

                <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                    Explore screenshots, UI designs, development work, and moments from my projects.
                </p>
            </div>
            <GalleryInfinite
                initialImages={data}
                initialHasMore={hasMore}

            />
        </div>
    );
}