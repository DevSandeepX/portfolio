"use client"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useQuery } from "@/lib/pagination"
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CustomPagination({ totalPages }: {
    totalPages: number
}) {
    // Todo
    const updateQuery = useQuery();
    const searchParams = useSearchParams()
    const page = Number(searchParams.get("page") || 1)
    const hasMore = page < totalPages

    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <Button className="rounded" variant="outline" disabled={page === 1} onClick={() => updateQuery("page", String(page - 1))}>
                            <PaginationPrevious />
                        </Button>
                    </PaginationItem>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <PaginationItem key={index + 1} onClick={() =>
                            updateQuery("page", String(index + 1))
                        }>
                            <Button className={cn("rounded", page == index + 1 && "btn-primary")} variant="ghost">
                                <PaginationLink>{index + 1}</PaginationLink>
                            </Button>
                        </PaginationItem>
                    ))}
                    <PaginationEllipsis />
                    <PaginationItem>
                        <Button className="rounded" variant="outline" disabled={!hasMore} onClick={() => updateQuery("page", String(page + 1))}>
                            <PaginationNext />
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
