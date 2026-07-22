"use client";

import { useFormContext } from "react-hook-form";
import Tiptap from "@/components/editor/RteEditor";
import { Card } from "@/components/ui/card";

export default function ContentEditor() {
    const { watch, setValue } = useFormContext();

    return (
        <Card className="p-4">
            <div>
                <h2 className="text-xl font-semibold">
                    Write Blog Content
                </h2>
                <p className="text-sm text-muted-foreground">
                    Write  details of your blog post.
                </p>
            </div>
            <Tiptap
                value={watch("content")}
                onChange={(content) =>
                    setValue("content", content)
                }
            />
        </Card>
    );
}