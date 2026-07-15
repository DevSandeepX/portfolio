"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useQuery() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function updateQuery(key: string, value: string) {
        const params = new URLSearchParams(searchParams.toString());

        if (value.trim()) {
            params.set(key, value.trim());
        } else {
            params.delete(key);
        }

        router.replace(`${pathname}?${params.toString()}`);
    }

    return updateQuery;
}