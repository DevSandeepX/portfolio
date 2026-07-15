import { deleteUser, upsertUser } from "@/actions/user";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const evt = await verifyWebhook(req);

        switch (evt.type) {
            case "user.created":
            case "user.updated": {
                const {
                    id,
                    first_name,
                    last_name,
                    image_url,
                    email_addresses,
                    public_metadata,
                } = evt.data;

                await upsertUser({
                    clerkId: id,
                    name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
                    email: email_addresses[0]?.email_address ?? "",
                    avatarUrl: image_url,
                    role: (public_metadata?.role as "ADMIN" | "CLIENT") ?? "CLIENT",
                });

                break;
            }

            case "user.deleted": {
                if (evt.data.id) {
                    await deleteUser(evt.data.id);
                }
                break;
            }
        }

        return Response.json({ success: true });
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                success: false,
                message: "Webhook verification failed",
            },
            {
                status: 400,
            }
        );
    }
}