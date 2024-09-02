'use client'
import React, { useEffect, useState } from "react";
import { Card, ElegantLogo, MetaTitle } from '@brandonowens/elegant-ui';
import Link from "next/link";
import ArrowLongLeftIcon from '@heroicons/react/20/solid/ArrowLongLeftIcon';
import { useRouter } from "next/navigation";
import { XCircleIcon } from "lucide-react";
import { logUserIn } from "@/utils/Db/Actions/User";

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = `Log In - ${MetaTitle(process.env.NEXT_PUBLIC_APP_NAME || "Elegant", "Elegant CMS")}`;
        router.replace('/admin');
    }, []);

    return(
        <main className="relative flex bg-gray-50 dark:bg-gray-900 flex-col items-center justify-center z-10 p-0 md:p-4 mb-20">
            <div className="mt-20 mr-3 flex-none w-[2.0625rem] overflow-hidden">
                <ElegantLogo className="w-auto h-8 mx-auto"/>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-slate-900 dark:text-slate-200">
                    Sign in to your account
                </h2>
            </div>
            <Card className="mt-10 w-full max-w-xl shadow-md p-0">
                <div className="w-full px-6 py-4 sm:px-12">
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
                        action={
                            async (data: FormData) => {
                                const email = data.get("email") as string;
                                const password = data.get("password") as string;
                                setError("");
                        
                                await logUserIn({
                                    email: email,
                                    password: password
                                }).then((res: any) => {
                                    if(res.error.includes("Read more at ")) {
                                        setError("Invalid email or password.");
                                    }
                                    else {
                                        router.refresh();
                                    }
                                })
                            }
                        }
                    >
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
                        <div className="flex items-center justify-between">
                            <div className="flex items-center"></div>
                            <div className="text-sm leading-6">
                                {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a> */}
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    {/* <div>
                        <div className="relative mt-10">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm font-medium leading-6">
                                <span className="bg-white px-6 text-gray-900">Or continue with</span>
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <a
                            href="#"
                            className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                            >
                            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                                <path
                                d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                fill="#EA4335"
                                />
                                <path
                                d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                fill="#4285F4"
                                />
                                <path
                                d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                fill="#FBBC05"
                                />
                                <path
                                d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                fill="#34A853"
                                />
                            </svg>
                            <span className="text-sm font-semibold leading-6">Google</span>
                            </a>

                            <a
                            href="#"
                            className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                            >
                            <svg className="h-5 w-5 fill-[#24292F]" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                fillRule="evenodd"
                                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-sm font-semibold leading-6">GitHub</span>
                            </a>
                        </div>
                    </div> */}
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