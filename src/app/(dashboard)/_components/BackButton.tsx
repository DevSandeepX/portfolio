import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackButton({
    title,
    href,
}: {
    title: string;
    href: string;
}) {
    return (
        <Button variant="outline" className="rounded">
            <Link href={href} className="flex items-center">
                <ArrowLeft className="mr-2 size-4" />
                {title}
            </Link>
        </Button>
    );
}