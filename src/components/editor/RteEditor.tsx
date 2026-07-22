"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import EditorToolbar from "./EditorTollbar";
import type { JSONContent } from "@tiptap/core";

interface Props {
    value?: JSONContent | null;
    onChange: (value: JSONContent) => void;
}

export default function Tiptap({
    value,
    onChange,
}: Props) {
    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: value ?? {
            type: "doc",
            content: [
                {
                    type: "paragraph",
                },
            ],
        },
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class:
                    "prose prose-sm max-w-none min-h-[300px] p-4 focus:outline-none",
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getJSON());
        },
    });

    useEffect(() => {
        if (!editor || !value) return;

        const current = editor.getJSON();

        if (JSON.stringify(current) !== JSON.stringify(value)) {
            editor.commands.setContent(value);
        }
    }, [editor, value]);

    if (!editor) return null;

    return (
        <div className="rounded-lg border overflow-hidden p-2">
            <EditorToolbar editor={editor} />

            <EditorContent
                editor={editor}
                className="min-h-[300px]"
            />
        </div>
    );
}