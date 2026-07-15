import { Wrench, Clock, Mail } from "lucide-react";
import Footer from "@/components/Footer";

export default function MaintenancePage() {
    return (


        <main className="flex min-h-screen items-center justify-center px-6">
            <div className="container text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/10">
                    <Wrench className="h-10 w-10 text-orange-500" />
                </div>

                <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl">
                    We'll Be Back Soon
                </h1>

                <p className="mt-4 text-lg text-muted-foreground">
                    Our portfolio is currently undergoing scheduled maintenance to improve
                    performance and add new features.
                </p>

                <div className="mt-8 rounded-xl border bg-card p-6 text-left mb-20">
                    <div className="flex items-start gap-3">
                        <Clock className="mt-0.5 h-5 w-5 text-orange-500" />
                        <div>
                            <h2 className="font-semibold">Maintenance in Progress</h2>
                            <p className="text-sm text-muted-foreground">
                                We're working to get everything back online as quickly as
                                possible. Thank you for your patience.
                            </p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </main>

    );
}