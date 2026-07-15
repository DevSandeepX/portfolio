import { getAppSetting } from "@/db/setting";
import { Suspense } from "react";
import AppSettingForm from "../../_components/AppSettingForm";
import { notFound } from "next/navigation";


export default async function SettingsPage() {
    const setting = await getAppSetting();

    if (!setting) {
        notFound();
    }

    return (
        <div className="w-full">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Site Settings
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your website branding, profile, and resume settings.
                    </p>
                </div>
                <Suspense>
                    <SuspendedForm />
                </Suspense>

            </div>
        </div>
    );
}


async function SuspendedForm() {
    const setting = await getAppSetting()
    if (!setting) return notFound()
    return (
        <div className="w-full">
            <AppSettingForm setting={setting} />
        </div>
    )
}