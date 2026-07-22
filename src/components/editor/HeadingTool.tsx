"use client"
import { useState } from 'react'
import { FaHeading } from 'react-icons/fa';

export default function HeadingTool({ editor }: { editor: any }) {
    const [headingLevel, setHeadingLevel] = useState(1);
    return (
        <div className="relative">
            <button className={`p-2`}>
                <FaHeading />
            </button>
            <select
                value={headingLevel}
                onChange={(e) => {
                    const level = Number(e.target.value);
                    setHeadingLevel(level);
                    editor.chain().focus().toggleHeading({ level }).run();
                }}
                className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
            >
                {[1, 2, 3, 4, 5, 6].map((level) => (
                    <option key={level} value={level}>
                        H{level}
                    </option>
                ))}
            </select>
        </div>
    )
}
