import React, { Suspense } from "react";
import DashboardLayout from "../DashboardLayout";
import { Card } from "@brandonowens/elegant-ui";

export default function UserSettings() {
    // const session = await getSession();
    // if (!session) {
    //   redirect("/login");
    // }

    return(
        <DashboardLayout>
            <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
                <div className="mx-auto mt-8 max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                    <div>
                        <h2 className="text-lg font-semibold leading-7 text-gray-900">Account Settings</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-500">
                            This is the settings page for your personal profile.
                        </p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}