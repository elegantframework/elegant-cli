import { Session } from "next-auth";
import DashboardLayout from "../DashboardLayout";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import Heading from "../Heading";
import { singular } from "pluralize";

export default function DocumentList({
    session,
    title
}:{
    session: Session | null;
    title: string;
}) {
    return(
        <DashboardLayout session={session}>
            <div className="flex max-w-screen-xl flex-col space-y-12 p-5 md:p-8">
                <Heading title={title}>
                    <div className="flex items-center gap-x-4 sm:gap-x-6">
                        <Link 
                            href={`/admin/${title.toLowerCase()}/new`}
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true"/>
                            New {singular(title)}
                        </Link>
                    </div>
                </Heading>
            </div>
        </DashboardLayout>
    );
}