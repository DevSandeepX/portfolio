import { NextRequest, NextResponse } from "next/server";
import { getPublishedImages } from "@/db/image";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 20);

    const data = await getPublishedImages({ page, limit });

    return NextResponse.json(data);
}