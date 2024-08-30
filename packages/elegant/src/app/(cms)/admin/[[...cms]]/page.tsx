import CMS from "@/components/Admin/Cms";
import "@/components/Editor/css/editor.css";

interface Props {
    params: {  cms: string[] };
};

export default function Admin({ params }: Props) {
    return(
      <div className="h-full text-neutral-950 dark:text-white">
        <CMS 
          postgresUrl={process.env.POSTGRES_PRISMA_URL || ""}
          nonPoolingPUrl={process.env.POSTGRES_URL_NON_POOLING || ""} 
          r2Config={{
            accountId: process.env.R2_ACCOUNT_ID || "",
            accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
            bucketName: process.env.R2_BUCKET_NAME || "",
            publicBucketUrl: process.env.R2_PUBLIC_BUCKET_URL || ""
          }}
          params={params}
        />
      </div>
    );
}