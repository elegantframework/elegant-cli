import CMS from "@/components/Admin/Cms";
import "@/components/Editor/css/editor.css";

interface Props {
    params: {  cms: string[] };
};

export default function Admin({ params }: Props) {
    return(
      <CMS 
        postgresUrl={process.env.POSTGRES_PRISMA_URL || ""}
        nonPoolingPUrl={process.env.POSTGRES_URL_NON_POOLING || ""}      
        params={params}
      />
    );
}