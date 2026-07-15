import GalleryInfinite from "../_components/GalleryClient";
import { getPaginatedPublishedGalleryImages } from "@/actions/image";

const LIMIT = 20;

export default async function GalleryPage() {
    const { data, hasMore } = await getPaginatedPublishedGalleryImages({
        page: 1,
        limit: LIMIT,
    });

    if (data.length == 0) {
        return (
            <div className=""></div>
        )
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