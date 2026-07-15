import { Card } from "@/components/ui/card";
import {
    Mail,
    Phone,
    MapPin,
    GitBranch,
} from "lucide-react";

type Props = {
    contactInfo: {
        fullName: string | null;
        email: string | null;
        phone: string | null;
        location: string | null;
        githubUrl: string | null;
    };
};

export default function ContactInfo({ contactInfo }: Props) {
    return (
        <Card className="p-6 rounded-lg space-y-6">
            <div>
                <h3 className="text-xl font-semibold">
                    {contactInfo.fullName}
                </h3>
                <p className="text-sm text-muted-foreground">
                    Feel free to contact me anytime.
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Mail className="size-5 text-primary" />
                    <span>{contactInfo.email}</span>
                </div>

                <div className="flex items-center gap-3">
                    <Phone className="size-5 text-primary" />
                    <span>{contactInfo.phone}</span>
                </div>

                <div className="flex items-center gap-3">
                    <MapPin className="size-5 text-primary" />
                    <span>{contactInfo.location}</span>
                </div>

                <div className="flex items-center gap-3">
                    <GitBranch className="size-5 text-primary" />
                    <a
                        href={contactInfo.githubUrl ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        {contactInfo.githubUrl}
                    </a>
                </div>
            </div>


        </Card>
    );
}