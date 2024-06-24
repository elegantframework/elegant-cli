import { MetaTitle } from "@brandonowens/elegant-ui";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    // read route params
    const id = params.id
   
    // // fetch data
    // const product = await fetch(`https://.../${id}`).then((res) => res.json())
   
    // // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []
   
    return {
      title: `Log In - ${MetaTitle(process.env.NEXT_PUBLIC_APP_NAME || "", "Elegant CMS")}`,
    }
}