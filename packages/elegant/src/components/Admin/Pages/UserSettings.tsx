'use client'
import React, { Suspense, useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { Session } from "next-auth";
import Heading from "../Heading";
import { MetaTitle } from "@brandonowens/elegant-ui";
import { Collection } from "@/components/Types";
import { getUserById, updateUser } from "@/utils/Db/Actions/User";
import { UserRound } from "lucide-react";
import Image from 'next/image';
import SettingsCard from "./SettingsCard";

export default function UserSettings({
    session,
    collections
  }:{
    session: Session | null;
    collections: Collection[];
  }) {
    useEffect(() => {
      document.title = `Account Settings - ${MetaTitle(process.env.NEXT_PUBLIC_APP_NAME || "", "Elegant CMS")}`;
    }, []);

    const [user, setUser] = useState<{
      name: string;
      image: string;
      twitterHandle: string;
    }>({
      name: "",
      image: "",
      twitterHandle: ""
    });
    const [savingTwitterHandle, setSavingTwitterHandle] = useState(false);

    const getUser = async() => {
      const result = await getUserById(session?.user?.id || "");

      setUser({
        name: result?.name || "",
        image: result?.image || "",
        twitterHandle: result?.twitterHandle || ""
      });
    };

    useEffect(() => {
      getUser();
    }, []);

    const updateUserSettings = async(
      value: string,
      key: string
    ) => {
      const result = await updateUser(
        value,
        session?.user?.id || "",
        key
      );

      return result;
    };

    return(
        <DashboardLayout 
          session={session}
          collections={collections}
        >
            <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
              <Heading title="Account Settings">

              </Heading>
            
              <div className="bg-white max-w-5xl shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900">Avatar</h3>
                  <div className="flex flex-col md:items-center justify-center space-y-2 md:flex-row md:justify-between sm:space-y-0">
                    <p className="text-sm text-gray-500 my-4 md:my-0">Click on the avatar to upload a custom one from your files.</p>
                    {user.image.length > 0 && (
                      <Image 
                        src={user.image}
                        height={14}
                        width={14}
                        alt=""
                      />
                    )}
                    {user.image.length === 0 && (
                      <div className="h-16 w-16 rounded-full bg-neutral-200 md:relative md:-top-4">
                        <UserRound className="text-neutral-500 relative top-5 left-5"/>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white max-w-5xl shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg">
                <form>
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">Display Name</h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>Please enter your full name, or a display name you are comfortable with.</p>
                    </div>
                    <div className="mt-5 sm:flex sm:items-center">
                      <div className="w-full sm:max-w-xs">
                        <label htmlFor="name" className="sr-only">
                          Full Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={user.name}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
                    <p className="text-sm text-stone-500 dark:text-stone-400">Please use 32 characters maximum.</p>
                    <button
                      type="submit"
                      className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
                    >
                      Save
                    </button>
                  </div>
                </form>           
              </div>

              <SettingsCard 
                heading="Twitter Handle"
                message="Enter the url of the Twitter handle that you would like to be displayed to readers."
                defaultValue={user.twitterHandle}
                helperText="Including your Twitter handle is optional but strongly recommended."
                saving={savingTwitterHandle}
                onSave={(value) => {
                  setSavingTwitterHandle(true);
                  updateUserSettings(
                    value,
                    "twitterHandle"
                  ).then((result) => {
                    setSavingTwitterHandle(false);
                    window.location.reload;
                  });
                }}
              />

            </div>
        </DashboardLayout>
    );
}