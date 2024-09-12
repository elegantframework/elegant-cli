'use client'

import { usePathname } from 'next/navigation';
import { GoogleTagManager } from "@next/third-parties/google";

export default function Analytics({
    GA_ID
}:{
    GA_ID: string
}) {
    const pathname = usePathname();

    if(pathname.includes('/admin')) {
        return;
    }

    return <GoogleTagManager gtmId={GA_ID} />;
}