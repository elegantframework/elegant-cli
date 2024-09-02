'use client'
import React, { useEffect, useState } from "react";
import { Card, ElegantLogo, MetaTitle } from '@brandonowens/elegant-ui';
import Link from "next/link";
import ArrowLongLeftIcon from '@heroicons/react/20/solid/ArrowLongLeftIcon';
import { XCircleIcon } from "lucide-react";
import { createRootAdmin } from "@/utils/Db/Actions/User";
import { useRouter } from "next/navigation";

export default function Onboard() {
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        document.title = `Create an admin account - ${MetaTitle(process.env.NEXT_PUBLIC_APP_NAME || "Elegant", "Elegant CMS")}`;
        router.replace('/admin');
    }, []);

    return(
        <main className="relative flex bg-gray-50 dark:bg-gray-900 flex-col items-center justify-center z-10 p-0 md:p-4 mb-20">
            <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-md">
                <ElegantLogo className="w-auto h-8 mx-auto"/>
            </div>
            <Card className="mt-10 w-full max-w-xl shadow-md p-0">
                <div className="w-full px-6 py-4 sm:px-12">
                    <h2 className="mt-6 text-left text-2xl font-bold leading-9 tracking-tight text-slate-900 dark:text-slate-200">
                        Create a root admin account
                    </h2>
                    <p className="mt-1 mb-6 text-left text-sm leading-6 dark:text-slate-300">
                        One last step before accessing your admin panel.
                    </p>
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
                    <form 
                        className="space-y-6 text-left"
                        action={async (data: FormData) => {
                            await createAdminUser(data).then((res: any) => {
                                window.location.reload();
                            }).catch((error) => {
                                setError(error)
                            });
                        }}
                    >
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                Full name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:ring-white/10 dark:focus:ring-2 dark:focus:ring-inset dark:focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:ring-white/10 dark:focus:ring-2 dark:focus:ring-inset dark:focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                            Password
                            </label>
                            <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:ring-white/10 dark:focus:ring-2 dark:focus:ring-inset dark:focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Create account
                            </button>
                        </div>
                    </form>
                </div>
            </Card>
            <div className="sm:mx-auto sm:w-full max-w-2xl xs:pl-0 sm:pl-4 text-left mt-10 mb-20 text-neutral-950 dark:text-white">
                <Link href="/" className="hover:underline">
                    <ArrowLongLeftIcon className="h-6 w-6 inline mr-2"/>Go to {process.env.NEXT_PUBLIC_APP_NAME || "Elegant"}
                </Link>
            </div>
        </main>
    );
}

export async function createAdminUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    return await createRootAdmin({
        name: name,
        email: email,
        password: password
    });
}