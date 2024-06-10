import React from "react";
import DashboardLayout from "../DashboardLayout";
import { Session } from "next-auth";

export default function SiteSettings({
  session
}:{
  session: Session | null
}) {
    return(
        <DashboardLayout session={session}>
             <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
                <div className="mx-auto mt-8 max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                    <div>
                        <h2 className="text-lg font-semibold leading-7 text-gray-900">Settings</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-500">
                            This is the setings page for the application.
                        </p>
                    </div>
                    <form className="md:col-span-2">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    
                  </div>

                  <div className="mt-8 flex">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </form>
                </div>
            </div>
        </DashboardLayout>
    );
}