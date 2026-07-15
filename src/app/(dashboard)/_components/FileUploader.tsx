"use client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton, UploadDropzone } from "@/services/uploadthing";
import toast from "react-hot-toast";

type Props = {
    endpoint: keyof OurFileRouter;
    onUpload: (urls: string[]) => Promise<void> | void;
};

export default function FileUploader({
    endpoint,
    onUpload,
}: Props) {
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={async (res) => {
                try {
                    const urls = res.map((file) => file.ufsUrl);

                    await onUpload(urls);

                    toast.success("Files uploaded successfully.");
                } catch {
                    toast.error("Failed to process uploaded files.");
                }
            }}
            onUploadError={(error: Error) => {
                console.error(error);
                toast.error(error.message);
            }}
        />
    );
}