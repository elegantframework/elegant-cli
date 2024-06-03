'use client'
import ArrowLongLeftIcon from "@heroicons/react/20/solid/ArrowLongLeftIcon";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return(
        <Link
            href="#"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => router.back()}
        >
            <ArrowLongLeftIcon className='h-6 w-6 inline'/> Go back
        </Link> 
    );
}