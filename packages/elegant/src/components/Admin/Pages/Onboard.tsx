'use client'
import React, { useEffect } from "react";
import { Card, ElegantLogo, MetaTitle } from '@brandonowens/elegant-ui';
import Link from "next/link";
import ArrowLongLeftIcon from '@heroicons/react/20/solid/ArrowLongLeftIcon';
import { createAdmin } from "../../../utils/Db/Actions/Actions";
import { useRouter } from "next/navigation";

export default function Onboard() {
    const router = useRouter();

    useEffect(() => {
        document.title = `Create an admin account - ${MetaTitle(process.env.NEXT_PUBLIC_APP_NAME || "", "Elegant CMS")}`;
    }, []);

    return(
        <main className="relative flex h-screen flex-col items-center justify-center z-10 p-0 md:p-4">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <ElegantLogo className="w-auto h-8 mx-auto"/>
            </div>
            <Card className="mt-10 w-full max-w-xl shadow-md p-0">
                <div className="bg-white w-full px-6 pt-1 pb-12 sm:px-12">
                    <h2 className="text-left text-2xl font-bold leading-9 tracking-tight text-slate-900 dark:text-slate-200">
                        Create an admin account
                    </h2>
                    <p className="mt-1 mb-6 text-left text-sm leading-6 text-gray-500">
                        One last step before accessing your admin panel.
                    </p>
                    <form 
                        className="space-y-6 text-left"
                        action={async (data: FormData) => {
                            await createAdminUser(data).then((res: any) => {
                                router.refresh();
                            }).catch((error) => {
                                console.log(error)
                            });
                        }}
                    >
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Full name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                            </label>
                            <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            <div className="sm:mx-auto sm:w-full max-w-xl xs:pl-0 sm:pl-4 text-left mt-10 dark:text-white">
                <Link href="/" className="hover:underline">
                    <ArrowLongLeftIcon className="h-6 w-6 inline mr-2"/>Go to {process.env.NEXT_PUBLIC_APP_NAME || ""}
                </Link>
            </div>
        </main>
    );
}

export async function createAdminUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    return await createAdmin({
        name: name,
        email: email,
        password: password
    });
}