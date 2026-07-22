"use client"
import { FaBold, FaHeading, FaItalic, FaListOl, FaListUl, FaUnderline } from 'react-icons/fa';

export default function FormattingTool({ editor }: { editor: any }) {
    return (
        <div>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 ${editor.isActive("bold") ? "bg-gray-300" : ""}`}
            >
                <FaBold />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 ${editor.isActive("italic") ? "bg-gray-300" : ""
                    }`}
            >
                <FaItalic />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 ${editor.isActive("underline") ? "bg-gray-300" : ""
                    }`}
            >
                <FaUnderline />
            </button>
        </div>
    )
}
