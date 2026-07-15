"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@/lib/pagination";

export default function SearchForm() {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const updateQuery = useQuery()

    return (
        <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
                placeholder="Search projects..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        updateQuery("search", search)
                    }
                }}
            />
        </div>
    );
}