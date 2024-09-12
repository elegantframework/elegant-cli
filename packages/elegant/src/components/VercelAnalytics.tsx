'use client'

import { usePathname } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';

export default function VercelAnalytics() {
    const pathname = usePathname();

    if(pathname.includes('/admin')) {
        return;
    }

    return <Analytics />;
}