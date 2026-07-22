import React from 'react'
import { FaBold, FaHeading, FaItalic, FaListOl, FaListUl, FaUnderline } from 'react-icons/fa';
export default function ListTool({ editor }: { editor: any }) {
    return (
        <>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 ${editor.isActive("bulletList") ? "bg-gray-300" : ""
                    }`}
            >
                <FaListUl />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 ${editor.isActive("orderedList") ? "bg-gray-300" : ""
                    }`}
            >
                <FaListOl />
            </button>
        </>
    )
}
