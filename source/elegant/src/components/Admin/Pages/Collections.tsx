import React from "react";
import DashboardLayout from "../DashboardLayout";
import { Session } from "next-auth";

export default function Collections({
    session
}:{
    session: Session | null
}) {
    return(
        <DashboardLayout session={session}>
             <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
                <div className="mx-auto mt-8 max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                    <div>
                        <h2 className="text-lg font-semibold leading-7 text-gray-900">Collections</h2>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}