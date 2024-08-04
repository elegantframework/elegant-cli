'use client'
import { Session } from "next-auth";
import DashboardLayout from "../DashboardLayout";
import { plural } from 'pluralize';
import { useEffect, useState } from "react";
import { XCircleIcon } from "lucide-react";
import { createCollection, getCollectionByName } from "@/utils/Db/Actions/Collection";
import { useRouter } from "next/navigation";
import Heading from "../Heading";
import { MetaTitle } from "@brandonowens/elegant-ui";
import { Collection } from "@/components/Types";

export default function NewCollection({
    session,
    collections
}:{
    session: Session | null,
    collections: Collection[]
}) {
    useEffect(() => {
        document.title = `New Collection - ${MetaTitle(process.env.NEXT_PUBLIC_APP_NAME || "", "Elegant CMS")}`;
    }, []);

    const [pluralized, setPlural] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const onSubmit = async() => {
        setError("");
        setLoading(true);

        try {
            if(pluralized.toLowerCase() === "settings" ||
                pluralized.toLowerCase() === "collections" ||
                pluralized.toLowerCase() === "users"
            ) {
                setError(`${pluralized} is not a valid collection name.`);
            }

            else if(await getCollectionByName({title: pluralized.toLowerCase()}) ) {
                setError(`${pluralized} is already taken.`);
            }

            else {
                // save the collection
               await createCollection({
                   title: pluralized.toLowerCase()
               }).then(() => {
                   router.push(`/admin/${pluralized.toLowerCase()}`);
               });
           }

           setLoading(false);
        }
        catch(error) {
            // setError(error);
            setLoading(false);
        }
    };

    return(
        <DashboardLayout 
            session={session}
            collections={collections}
        >
            <div className="flex max-w-screen-xl flex-col space-y-12 p-5 md:p-8">
                <Heading title="New Collection">

                </Heading>
                <div>
                    {pluralized && error.length === 0 && (
                        <div className="rounded-md bg-blue-50 p-4">
                            <div className="flex">
                                <div className="ml-3 flex-1 md:flex md:justify-between">
                                    <p className="text-sm text-blue-700">
                                        Your collection will appear as{' '}
                                        <span className="font-semibold capitalize">{pluralized}</span> on
                                        on the sidebar.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {error.length > 0 && (
                        <div className="rounded-md bg-red-50 p-4 mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">
                                        {error}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    )}
                    <form action={() => {onSubmit()}}>
                        <div className="space-y-12">
                            <div className="">
                                <div className="mt-10 grid grid-cols-1 gap-y-8 sm:grid-cols-4">
                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="collection_name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Collection Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="collection_name"
                                                name="collection_name"
                                                type="text"
                                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue={''}
                                                placeholder="Ex: Posts"
                                                required
                                                onChange={(e) => {
                                                    setPlural(plural(e.target.value));
                                                    setError('');
                                                }}
                                            />
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-gray-600">Use the plural form of the collection name, ex: Docs.</p>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="mb-2 mt-0 sm:mt-[30px] ml-0 sm:ml-4 mr-0 sm:mr-2 w-full sm:w-auto justify-center sm:justify-between inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-indigo-300 dark:focus:ring-offset-indigo-900 dark:focus:ring-indigo-700 cursor-pointer"
                                        >
                                            {loading ? (
                                                <>
                                                    <svg
                                                        className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Saving
                                                </>
                                            ) : (
                                                'Save'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}