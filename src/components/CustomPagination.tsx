"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CustomPagination({
    totalPages,
}: {
    totalPages: number;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const page = Number(searchParams.get("page") ?? 1);

    const changePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams);

        if (newPage === 1) {
            params.delete("page");
        } else {
            params.set("page", String(newPage));
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <section className="flex justify-center gap-2">
            <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => changePage(page - 1)}
            >
                Previous
            </Button>

            {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;

                return (
                    <Button
                        key={pageNumber}
                        variant={page === pageNumber ? "default" : "outline"}
                        onClick={() => changePage(pageNumber)}
                    >
                        {pageNumber}
                    </Button>
                );
            })}

            <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={() => changePage(page + 1)}
            >
                Next
            </Button>
        </section>
    );
}