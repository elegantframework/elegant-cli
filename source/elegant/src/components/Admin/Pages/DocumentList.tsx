import { Session } from "next-auth";
import DashboardLayout from "../DashboardLayout";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export default function DocumentList({
    session
}:{
    session: Session | null
}) {
    return(
        <DashboardLayout session={session}>
            <div className="flex max-w-screen-xl flex-col space-y-12 p-5 md:p-8">
                <div className="mt-16 md:mt-8 md:mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
                    <div className="flex items-center gap-x-6">
                        <h2 className="text-lg font-semibold leading-7 text-gray-900">Docs</h2>
                    </div>
                    <div className="flex items-center gap-x-4 sm:gap-x-6">
                        <Link 
                            href={"/admin/docs/new"}
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true"/>
                            New Doc
                        </Link>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}