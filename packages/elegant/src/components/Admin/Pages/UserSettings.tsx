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
    const [savingName, setSavingName] = useState(false);

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
              <SettingsCard 
                heading="Display Name"
                message="Please enter your full name, or a display name you are comfortable with."
                defaultValue={user.name}
                helperText="Please use 32 characters maximum."
                saving={savingName}
                onSave={(value) => {
                  setSavingName(true);
                  updateUserSettings(
                    value,
                    "name"
                  ).then(() => {
                    setSavingName(false);
                    window.location.reload();
                  });
                }}
              />
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
                  ).then(() => {
                    setSavingTwitterHandle(false);
                    window.location.reload();
                  });
                }}
              />

            </div>
        </DashboardLayout>
    );
}