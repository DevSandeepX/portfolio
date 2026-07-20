import { ACTIONS } from "@/server/actions/setting";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ConfigureSettingPage() {
    const result = await ACTIONS.createSetting();

    if (result.success) {
        redirect("/");
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="items-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
                        <AlertTriangle className="h-7 w-7" />
                    </div>

                    <CardTitle>Configuration Failed</CardTitle>

                    <CardDescription>
                        We couldn't create the initial site settings. Please try again.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                    <Button className="w-full">
                        <Link href="/configure-setting" className="flex">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Retry Setup
                        </Link>
                    </Button>

                    <Button variant="outline" className="w-full">
                        <Link href="/">Go to Home</Link>
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}