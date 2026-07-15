"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";



const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
});


interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    readOnly?: boolean;
}

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["blockquote", "code-block"],
        ["link", "image"],
        ["clean"],
    ],

};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "align",
    "color",
    "background",
    "blockquote",
    "code-block",
    "link",
    "image",
];

export default function RichTextEditor({
    value,
    onChange,
    placeholder = "Write something...",
    className = "",
    readOnly = false,
}: RichTextEditorProps) {
    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
            placeholder={placeholder}
            readOnly={readOnly}
            className={className}
        />
    );
}