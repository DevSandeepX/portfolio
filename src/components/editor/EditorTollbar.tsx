"use client"
import HeadingTool from './HeadingTool';
import FormattingTool from './FormattingTool';
import ListTool from './ListTool';
import ParagraphTool from './ParagraphTool';
import CodeTool from './CodeTool';


export default function EditorTollbar({ editor }: { editor: any }) {

    return (
        <div className="flex space-x-2 mb-2">
            <HeadingTool editor={editor} />
            <ParagraphTool editor={editor} />
            <FormattingTool editor={editor} />
            <ListTool editor={editor} />
            <CodeTool editor={editor} />
        </div>
    )
}


