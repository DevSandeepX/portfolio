import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSearchParams(searchParams: URLSearchParams | Record<string, string | string[] | undefined>) {
  const query =
    searchParams instanceof URLSearchParams
      ? searchParams
      : new URLSearchParams(
        Object.entries(searchParams).flatMap(([key, value]) =>
          Array.isArray(value)
            ? value.map((v) => [key, v])
            : value
              ? [[key, value]]
              : []
        )
      );

  return {
    page: Number(query.get("page") || 1),
    limit: Number(query.get("limit") || 50),
    search: query.get("search") || "",
  };
}

export function generateSlug(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD") // Remove accents
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Spaces -> -
    .replace(/-+/g, "-") // Multiple - -> single -
    .replace(/^-|-$/g, ""); // Trim -
}
