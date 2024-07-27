import type { Metadata, ResolvingMetadata } from 'next'
import React from 'react';
 
interface Props {
    /**
     * The url segments.
     */
    params: {  cms: string[] };
};
 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "This is the elegant cms component",
  }
}

export default function CMS({ params }: Props) {

    // fetch admin count

    // fetch collections

    return(
        <>
            Hello world
        </>
    );
}