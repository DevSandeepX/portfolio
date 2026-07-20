// src/components/TipTabRenderer.tsx
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import { JSONContent } from '@tiptap/core';

interface TipTabRendererProps {
    content: JSONContent | null | undefined | unknown;
}

export function TipTabRenderer({ content }: TipTabRendererProps) {
    if (!content) {
        return <div className="text-gray-500">No content</div>;
    }

    // Normalize content structure
    const normalizedContent: JSONContent =
        typeof content === 'string'
            ? JSON.parse(content)
            : content;

    // Ensure root doc node exists
    const docContent: JSONContent =
        normalizedContent.type === 'doc'
            ? normalizedContent
            : { type: 'doc', content: [normalizedContent] };

    try {
        const html = generateHTML(docContent, [StarterKit]);
        return (
            <div
                className="prose dark:prose-invert prose-lg mt-8 max-w-none
      prose-h1:text-2xl prose-h1:font-semibold prose-h1:mt-8 prose-h1:mb-4
      prose-h2:text-xl prose-h2:font-semibold"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        );
    } catch (error) {
        console.error('Tiptap render error:', error);
        return <div className="text-red-500">Failed to render content</div>;
    }
}