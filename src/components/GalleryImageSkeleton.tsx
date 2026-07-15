// components/skeletons/GalleryImageSkeleton.tsx

import { Skeleton } from "@/components/ui/skeleton";

export default function GalleryImageSkeleton({
    count = 12,
}: {
    count?: number;
}) {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-xl"
                >
                    <Skeleton className="h-full w-full rounded-xl" />
                </div>
            ))}
        </>
    );
}