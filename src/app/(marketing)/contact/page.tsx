import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ContactPage() {
    return (
        <div className="container min-h-screen py-10">
            <div className="max-w-3xl space-y-4">
                <span className="inline-flex items-center rounded-full border bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                    📬 Get In Touch
                </span>

                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                    Let's Build Something
                    <span className="text-primary"> Amazing Together.</span>
                </h1>

                <p className="text-lg leading-8 text-muted-foreground">
                    Have a project in mind, need a professional website, or want to
                    collaborate? I'm always open to discussing new ideas and helping turn
                    your vision into a fast, modern, and scalable web application.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
                <div className="h-72 rounded-lg overflow-hidden border">
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.8357820348065!2d83.54222227520724!3d26.104278777138333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39918634017482b7%3A0xf900fc02b6c8af3f!2sGIIT%20Gyansthaly%20(GIIT%20COMPUTER%20EDUCATION)%2C%20Ghosi!5e0!3m2!1sen!2sus!4v1783940130355!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        allowFullScreen
                    />

                </div>

                <Suspense fallback={<ContactInfoSkeleton />}>
                    <SuspendedPage />
                </Suspense>


            </div>
        </div>
    );
}


import { getContactInfo } from "@/db/setting";
import { notFound } from "next/navigation";
import ContactInfo from "../_components/ContactInfo";


async function SuspendedPage() {
    const contactInfo = await getContactInfo();

    if (!contactInfo) {
        notFound();
    }

    return <ContactInfo contactInfo={contactInfo} />;
}
function ContactInfoSkeleton() {
    return (
        <Card className="p-6 rounded-lg space-y-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-52 w-full rounded-md" />
        </Card>
    );
}