import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import React from 'react'

export default function TipTabRenderer({ content }: {
    content: any
}) {
    const html = generateHTML(content, [
        StarterKit,
    ]);

    return (
        <article
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}
