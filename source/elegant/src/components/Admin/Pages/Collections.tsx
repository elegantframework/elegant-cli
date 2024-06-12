import React from "react";
import DashboardLayout from "../DashboardLayout";
import { Session } from "next-auth";
import Link from "next/link";
import ContentLoader from 'react-content-loader';
import EmptyState from "../Collections/EmptyState";
import { PlusIcon } from "lucide-react";

export default function Collections({
    session
}:{
    session: Session | null
}) {
    return(
        <DashboardLayout session={session}>
            <div className="flex max-w-screen-xl flex-col space-y-12 p-5 md:p-8">
                <div className="mt-16 md:mt-8 md:mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
                    <div className="flex items-center gap-x-6">
                        <h2 className="text-lg font-semibold leading-7 text-gray-900">Collections</h2>
                    </div>
                    <div className="flex items-center gap-x-4 sm:gap-x-6">
                        <Link 
                            href={"/admin/collections/new"}
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true"/>
                            New Collection
                        </Link>
                    </div>
                </div>
                <div className="border-t border-gray-200 dark:border-white/10">
                    <EmptyState />
                </div>
                {/* <div>
                    <ContentLoader
                        width={1200}
                        height={400}
                        viewBox="0 0 1200 400"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="27" y="139" rx="4" ry="4" width="20" height="20" />
                        <rect x="67" y="140" rx="10" ry="10" width="85" height="19" />
                        <rect x="188" y="141" rx="10" ry="10" width="169" height="19" />
                        <rect x="402" y="140" rx="10" ry="10" width="85" height="19" />
                        <rect x="523" y="141" rx="10" ry="10" width="169" height="19" />
                        <rect x="731" y="139" rx="10" ry="10" width="85" height="19" />
                        <rect x="852" y="138" rx="10" ry="10" width="85" height="19" />

                        <rect x="26" y="196" rx="4" ry="4" width="20" height="20" />
                        <rect x="66" y="197" rx="10" ry="10" width="85" height="19" />
                        <rect x="187" y="198" rx="10" ry="10" width="169" height="19" />
                        <rect x="401" y="197" rx="10" ry="10" width="85" height="19" />
                        <rect x="522" y="198" rx="10" ry="10" width="169" height="19" />
                        <rect x="730" y="196" rx="10" ry="10" width="85" height="19" />
                        <rect x="851" y="195" rx="10" ry="10" width="85" height="19" />

                        <rect x="26" y="258" rx="4" ry="4" width="20" height="20" />
                        <rect x="66" y="259" rx="10" ry="10" width="85" height="19" />
                        <rect x="187" y="260" rx="10" ry="10" width="169" height="19" />
                        <rect x="401" y="259" rx="10" ry="10" width="85" height="19" />
                        <rect x="522" y="260" rx="10" ry="10" width="169" height="19" />
                        <rect x="730" y="258" rx="10" ry="10" width="85" height="19" />
                        <rect x="851" y="257" rx="10" ry="10" width="85" height="19" />

                        <rect x="26" y="316" rx="4" ry="4" width="20" height="20" />
                        <rect x="66" y="317" rx="10" ry="10" width="85" height="19" />
                        <rect x="187" y="318" rx="10" ry="10" width="169" height="19" />
                        <rect x="401" y="317" rx="10" ry="10" width="85" height="19" />
                        <rect x="522" y="318" rx="10" ry="10" width="169" height="19" />
                        <rect x="730" y="316" rx="10" ry="10" width="85" height="19" />
                        <rect x="851" y="315" rx="10" ry="10" width="85" height="19" />

                        <rect x="26" y="379" rx="4" ry="4" width="20" height="20" />
                        <rect x="66" y="380" rx="10" ry="10" width="85" height="19" />
                        <rect x="187" y="381" rx="10" ry="10" width="169" height="19" />
                        <rect x="401" y="380" rx="10" ry="10" width="85" height="19" />
                        <rect x="522" y="381" rx="10" ry="10" width="169" height="19" />
                        <rect x="730" y="379" rx="10" ry="10" width="85" height="19" />
                        <rect x="851" y="378" rx="10" ry="10" width="85" height="19" />

                        <rect x="978" y="138" rx="10" ry="10" width="169" height="19" />
                        <rect x="977" y="195" rx="10" ry="10" width="169" height="19" />
                        <rect x="977" y="257" rx="10" ry="10" width="169" height="19" />
                        <rect x="977" y="315" rx="10" ry="10" width="169" height="19" />
                        <rect x="977" y="378" rx="10" ry="10" width="169" height="19" />
                    </ContentLoader>
                </div> */}
            </div>
        </DashboardLayout>
    );
}