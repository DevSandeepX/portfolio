import Link from "next/link";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

type NotFoundProps = {
    title?: string;
    description?: string;
    actionLabel?: string;
    actionHref?: string;
};

export default function CustomNotFound({
    title = "Nothing Found",
    description = "We couldn't find the resource you're looking for. It may have been moved, deleted, or doesn't exist.",
    actionLabel = "Go Back Home",
    actionHref = "/",
}: NotFoundProps) {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border bg-muted">
                <SearchX className="h-10 w-10 text-muted-foreground" />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight">
                {title}
            </h2>

            <p className="mt-3 max-w-md text-muted-foreground">
                {description}
            </p>

            <Button className="mt-8">
                <Link href={actionHref}>{actionLabel}</Link>
            </Button>
        </div>
    );
}