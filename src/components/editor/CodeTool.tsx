import { FaCode } from "react-icons/fa";
import { Editor } from "@tiptap/react";

export default function CodeTool({ editor }: { editor: Editor }) {
    return (
        <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-2 rounded ${editor.isActive("code") ? "bg-gray-300" : ""
                }`}
        >
            <FaCode />
        </button>
    );
}