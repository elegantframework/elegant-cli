import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { Session } from "next-auth";
import Heading from "../Heading";
import { MetaTitle } from "@brandonowens/elegant-ui";
import { Collection } from "@/components/Types";
import Link from "next/link";
import { getMostRecentPostsForDashboard } from "@/utils/Db/Actions/Post";
import { PlusIcon } from "lucide-react";
import pluralize, { singular } from "pluralize";

export default function Dashboard({
    session,
    collections
}:{
    session: Session | null,
    collections: Collection[]
}) {
    useEffect(() => {
        document.title = `Dashboard - ${MetaTitle(process.env.NEXT_PUBLIC_APP_NAME || "", "Elegant CMS")}`;
    }, []);

    const [documents, setDocuments] = useState<{
        title: string,
        status: string;
        publishedAt: Date;
        slug: string;
        collection: {
            title: string;
        };
    }[] | null>();

    const getPosts = async() => {
        const results = await getMostRecentPostsForDashboard();
        setDocuments(results);
    };

    useEffect(() => {
        if(collections.length > 0) {
            getPosts();
        }
    }, []);

    return(
        <DashboardLayout 
            session={session}
            collections={collections}
        >
             <div className="flex max-w-screen-xl flex-col space-y-12 p-5 md:p-8">
                <Heading title="Dashboard">
                </Heading>
                {collections.length == 0 && (
                    <Welcome />
                )}
                {collections.length > 0 && documents && documents.length === 0 && (
                    <CollectionsCard 
                        title={collections[collections.length-1].title}
                    />
                )}
                 {collections.length > 0 && documents && documents.length > 0 && (
                    <RecentPostsCard 
                        documents={documents}
                    />
                )}
            </div>
        </DashboardLayout>
    );
}

function Welcome() {
    return(
        <div className="bg-white max-w-5xl shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                    Welcome to Elegant
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                    
                </div>
                <div className="mt-5 sm:flex sm:items-center">
                    <div className="w-full sm:max-w-xs">
                        Get started by creating your <Link href={"/admin/collections/new"}>first collection</Link>.
                    </div>
                </div>
            </div> 
            <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10 md:pr-6">
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                        
                    </p>
                    <Link
                        href={"/admin/collections/new"}
                        className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
                    >
                        Create Collection
                    </Link>
                </div>       
        </div> 
    );
}

function CollectionsCard({
    title
}:{
    title: string;
}) {
    return(
        <div className="bg-white max-w-5xl shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                    
                </div>
                <div className="mt-5 sm:flex sm:items-center">
                    <div className="w-full">
                        You haven't created any {pluralize(title)} yet. Get started by creating your <Link href={`/admin/${title}/new`}>first {singular(title)}</Link>.
                    </div>
                </div>
            </div> 
            <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10 md:pr-6">
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                        
                    </p>
                    <Link
                        href={`/admin/${title}/new`}
                        className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
                    >
                          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true"/>
                          New {singular(title)}
                    </Link>
                </div>       
        </div> 
    );
}

function RecentPostsCard({
    documents
}:{
    documents: {
        title: string,
        status: string;
        publishedAt: Date;
        slug: string;
        collection: {
            title: string;
        };
    }[]
}) {
    return(
        <div className="bg-white max-w-5xl shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                    Recently Updated
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                    
                </div>
                <div className="mt-5 sm:flex sm:items-center">
                    <div className="w-full">
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
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                            >
                                                Collection
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
                                                    <Link href={`/admin/${document.collection.title}/${document.slug}`}>
                                                        {document.title}
                                                    </Link>
                                                    <dl className="font-normal lg:hidden">
                                                        <dt className="sr-only">Status</dt>
                                                        <dd className="mt-1 truncate text-gray-700 capitalize">{document.status.toLowerCase()}</dd>
                                                    </dl>
                                                </td>
                                                <td className="py-4 text-sm font-normal text-gray-900 capitalize">
                                                    <Link href={`/admin/${document.collection.title}`}>
                                                        {document.collection.title}
                                                    </Link>
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
                    </div>
                </div>
            </div>   
        </div> 
    );
};