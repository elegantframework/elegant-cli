import chalk from "chalk";
import { NextResponse } from "next/server";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import R2Client from "@/utils/CloudFlare/R2Client";

export const runtime = "edge";

export async function POST(req: Request) {
    console.log(chalk.yellow(`Generating an upload URL!`))

    const contentType = req.headers.get("content-type") || "text/plain";
    const filename = req.headers.get("filename") || "";

    const signedUrl = await getSignedUrl(
        R2Client(
            process.env.R2_ACCOUNT_ID || "",
            process.env.R2_ACCESS_KEY_ID || "",
            process.env.R2_SECRET_ACCESS_KEY || ""
        ),
        new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: filename,
            ContentType: contentType,
        }),
        { expiresIn: 60 }
    )

    console.log(chalk.green(`Success generating upload URL!`))

    return NextResponse.json({ url: signedUrl })
}
