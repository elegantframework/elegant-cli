import { Session } from "next-auth";
import DashboardLayout from "../DashboardLayout";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import Heading from "../Heading";
import { singular } from "pluralize";
import { useEffect, useState } from "react";
import { getAllPostsForCollection } from "@/utils/Db/Actions/Post";
import ContentLoader from "react-content-loader";
import EmptyState from "../Documents/EmptyState";
import { MetaTitle } from "@brandonowens/elegant-ui";
import { Collection } from "@/components/Types";

export default function DocumentList({
    session,
    collection,
    collections
}:{
    session: Session | null;
    collection: string;
    collections: Collection[];
}) {
    useEffect(() => {
        document.title = `${collection[0].toUpperCase() + collection.slice(1)} - ${MetaTitle(process.env.NEXT_PUBLIC_APP_NAME || "", "Elegant CMS")}`;
    }, []);
    
    const [documents, setDocuments] = useState<{
        title: string,
        status: string;
        publishedAt: Date;
        slug: string;
    }[] | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getDocuments = async() => {
        setIsLoading(true); 
        const results = await getAllPostsForCollection(
            collection.toLowerCase()
        );
        setDocuments(results);
        setIsLoading(false);
    };

    useEffect(() => {
        getDocuments();
    }, []);

    return(
        <DashboardLayout 
            session={session}
            collections={collections}
        >
            <div className="flex max-w-screen-xl flex-col space-y-12 p-5 md:p-8">
                <Heading title={collection}>
                    <div className="flex items-center gap-x-4 sm:gap-x-6">
                        <Link 
                            href={`/admin/${collection.toLowerCase()}/new`}
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true"/>
                            New {singular(collection)}
                        </Link>
                    </div>
                </Heading>
                {isLoading && (
                    <div>
                        <ContentLoader
                            viewBox="0 0 1200 400"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        >
                            <rect x="0" y="40" rx="10" ry="10" width="85" height="19" />

                            <rect x="10" y="86" rx="4" ry="4" width="20" height="20" />
                            <rect x="66" y="87" rx="10" ry="10" width="85" height="19" />
                            <rect x="187" y="88" rx="10" ry="10" width="169" height="19" />
                            <rect x="401" y="87" rx="10" ry="10" width="85" height="19" />
                            <rect x="522" y="88" rx="10" ry="10" width="169" height="19" />
                            <rect x="730" y="86" rx="10" ry="10" width="85" height="19" />
                            <rect x="851" y="85" rx="10" ry="10" width="85" height="19" />
                            <rect x="977" y="85" rx="10" ry="10" width="220" height="19" />

                            <rect x="10" y="148" rx="4" ry="4" width="20" height="20" />
                            <rect x="66" y="149" rx="10" ry="10" width="85" height="19" />
                            <rect x="187" y="150" rx="10" ry="10" width="169" height="19" />
                            <rect x="401" y="149" rx="10" ry="10" width="85" height="19" />
                            <rect x="522" y="150" rx="10" ry="10" width="169" height="19" />
                            <rect x="730" y="148" rx="10" ry="10" width="85" height="19" />
                            <rect x="851" y="147" rx="10" ry="10" width="85" height="19" />
                            <rect x="977" y="147" rx="10" ry="10" width="220" height="19" />

                            <rect x="10" y="206" rx="4" ry="4" width="20" height="20" />
                            <rect x="66" y="207" rx="10" ry="10" width="85" height="19" />
                            <rect x="187" y="208" rx="10" ry="10" width="169" height="19" />
                            <rect x="401" y="207" rx="10" ry="10" width="85" height="19" />
                            <rect x="522" y="208" rx="10" ry="10" width="169" height="19" />
                            <rect x="730" y="206" rx="10" ry="10" width="85" height="19" />
                            <rect x="851" y="205" rx="10" ry="10" width="85" height="19" />
                            <rect x="977" y="205" rx="10" ry="10" width="220" height="19" />

                            <rect x="10" y="269" rx="4" ry="4" width="20" height="20" />
                            <rect x="66" y="270" rx="10" ry="10" width="85" height="19" />
                            <rect x="187" y="271" rx="10" ry="10" width="169" height="19" />
                            <rect x="401" y="270" rx="10" ry="10" width="85" height="19" />
                            <rect x="522" y="271" rx="10" ry="10" width="169" height="19" />
                            <rect x="730" y="269" rx="10" ry="10" width="85" height="19" />
                            <rect x="851" y="268" rx="10" ry="10" width="85" height="19" />
                            <rect x="977" y="268" rx="10" ry="10" width="220" height="19" />
                        </ContentLoader>
                    </div>
                )}
                {documents && documents.length > 0 && !isLoading && (
                    <div className="">
                        <div className="-mx-4 sm:-mx-0">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th 
                                            scope="col" 
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                        >
                                            Title
                                        </th>
                                        <th
                                            scope="col"
                                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                                        >
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {documents.map((document) => (
                                        <tr key={document.title}>
                                            <td className="px-3 py-4 text-sm font-medium text-gray-900 capitalize">
                                                <Link href={`/admin/${collection}/${document.slug}`}>
                                                    {document.title}
                                                </Link>
                                                <dl className="font-normal lg:hidden">
                                                    <dt className="sr-only">Status</dt>
                                                    <dd className="mt-1 truncate text-gray-700 capitalize">{document.status.toLowerCase()}</dd>
                                                </dl>
                                            </td>
                                            <td className="hidden px-3 py-4 text-sm text-gray-500 capitalize lg:table-cell">
                                                {document.status.toLowerCase()}
                                            </td>
                                            <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                                {document.publishedAt.toLocaleDateString(
                                                    'en-US',
                                                    {  
                                                        year: 'numeric' as const,
                                                        month: 'long' as const,
                                                        day: 'numeric' as const
                                                    }
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {documents && documents.length === 0 && !isLoading && (
                    <div className="border-t border-gray-200 dark:border-white/10">
                        <EmptyState title={singular(collection)}/>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}