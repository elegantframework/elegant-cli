import { auth } from "@/utils/Auth/Auth";
import { GetSignedUrl } from "@/utils/CloudFlare/R2";
import axios from "axios";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export const runtime = "edge";

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return new Response(
            "Not authenticated.",
            {
            status: 403,
            },
        );
    }

    const file = req.body || "";
    const contentType = req.headers.get("content-type") || "text/plain";
    const filename = `${uuidv4()}.${contentType.split("/")[1]}`;

    const signedUrl = await GetSignedUrl(
        filename,
        contentType
    );

    await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": contentType,
        }
    });

    const blob = `${process.env.R2_PUBLIC_BUCKET_URL}/${filename}`;

    return NextResponse.json(blob);
}
