"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { getPaginatedPublishedGalleryImages } from "@/actions/image";
import { Loader2Icon } from "lucide-react";
import GalleryImageSkeleton from "@/components/GalleryImageSkeleton";

const LIMIT = 20;

type ImageType = {
    id: string;
    url: string;
};

export default function GalleryInfinite({
    initialImages,
    initialHasMore,
}: {
    initialImages: ImageType[];
    initialHasMore: boolean,
}) {
    const [images, setImages] = useState(initialImages);
    const loadingRef = useRef(false);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [loading, setLoading] = useState(false);

    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: "100px"
    });

    useEffect(() => {
        if (!inView || loadingRef.current || !hasMore) return;

        const loadMore = async () => {
            loadingRef.current = true;
            setLoading(true);

            try {
                const res = await getPaginatedPublishedGalleryImages({
                    page,
                    limit: LIMIT,
                });

                setImages((prev) => [...prev, ...res.data]);
                setHasMore(res.hasMore);
                setPage((prev) => prev + 1);
            } catch (error) {
                console.error(error);
            } finally {
                loadingRef.current = false;
                setLoading(false);
            }
        };

        loadMore();
    }, [inView, page, hasMore]);

    return (
        <>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className="relative aspect-square overflow-hidden rounded-xl"
                    >
                        <Image
                            src={image.url}
                            alt=""
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>

            {loading && (
                <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                    <GalleryImageSkeleton count={LIMIT} />
                </div>
            )}

            {hasMore && (
                <div ref={ref} className="h-10" />
            )}

            {!hasMore && (
                <div className="flex justify-center py-8">
                    No more images
                </div>
            )}
        </>
    );
}