import { Editor } from "@tiptap/react";
import { FaParagraph } from "react-icons/fa";

type Props = {
    editor: Editor;
};

export default function ParagraphTool({ editor }: Props) {
    return (
        <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`p-2 rounded ${editor.isActive("paragraph") ? "bg-gray-300" : ""
                }`}
        >
            <FaParagraph />
        </button>
    );
}