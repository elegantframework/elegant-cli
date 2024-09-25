'use client'
import React, { ChangeEvent, Suspense, useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { Session } from "next-auth";
import Heading from "../Heading";
import { MetaTitle } from "@brandonowens/elegant-ui";
import { Collection } from "@/components/Types";
import { getUserById, updateUser } from "@/utils/Db/Actions/User";
import { UserRound } from "lucide-react";
import Image from 'next/image';
import SettingsCard from "../SettingsCard";
import SaveFile from "@/utils/CloudFlare/R2";
import Input from "../Input";

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
    const [savingImage, setSavingImage] = useState(false);
    const [showImageLink, setShowImageLink] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageUrlError, setImageUrlError] = useState('');

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
                <form>
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                        Avatar
                    </h3>
                    <div className="flex flex-col md:items-center justify-center space-y-2 md:flex-row md:justify-between sm:space-y-0">
                      <p className="mt-2  mb-2 md:mb-0 text-sm text-gray-500">
                        Select an image from your files or enter a URL to set your custom avatar. 
                      </p>
                      {user.image.length > 0 && (
                        <div className="h-16 w-16 relative">
                          <Image
                            src={user.image}
                            alt={"User avatar"}
                            width={100}
                            height={100}
                            className="h-16 w-16 rounded-full"
                          />
                        </div>
                      )}
                      {user.image.length === 0 && (
                        <div className="h-16 w-16 rounded-full bg-neutral-200">
                          <UserRound className="text-neutral-500 relative top-5 left-5"/>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10 md:px-6">
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                        {/* {helperText} */}
                    </p>
                    <div className="w-full md:w-auto">
                      {!showImageLink && (
                        <>
                          <button
                            type="button"
                            className="w-full mr-4 mb-4 md:mb-0 sm:w-auto rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={() => {
                                setShowImageLink(true);
                            }}
                          >
                            Set URL
                          </button>
                          <label
                            htmlFor={`user-image-upload`}
                            className="w-full sm:w-auto justify-center sm:justify-between inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-indigo-300 dark:focus:ring-offset-indigo-900 dark:focus:ring-indigo-700 cursor-pointer"
                          >
                            {savingImage ? (
                                <>
                                  <svg
                                    className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Uploading
                                </>
                            ) : (
                                'Upload Image'
                            )}
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            id={`user-image-upload`}
                            onChange={async (e) => {
                              setSavingImage(true);
                              await saveUserImage(e).then(
                                (result) => {
                                  updateUserSettings(
                                    result || "",
                                    "image"
                                  ).then(() => {
                                    setSavingImage(false);
                                    window.location.reload();
                                  });
                                }
                              );
                            }}
                            className="hidden"
                          />
                        </>
                      )}
                      {showImageLink && (
                        <>
                          <Input
                              label="Set URL"
                              id="avatar-image-input"
                              wrapperClass="mb-4"
                              onChange={(value) => {
                                setImageUrlError('');
                                setImageUrl(value);
                              }}
                              error={imageUrlError}
                          />
                            <div className="w-full flex justify-end shrink-0 items-center gap-x-6 mt-2">
                              <button
                                onClick={() => {
                                  setImageUrl('');
                                  setImageUrlError('');
                                  setShowImageLink(false);
                                }}
                                type="button"
                                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={savingImage}
                                className="w-full sm:w-auto justify-center sm:justify-between inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-indigo-300 dark:focus:ring-offset-indigo-900 dark:focus:ring-indigo-700 cursor-pointer"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if(imageUrl.length === 0) {
                                    setImageUrlError('Please enter a valid url.');
                                  }
                                  else {
                                    setSavingName(true);
                                    updateUserSettings(
                                      imageUrl,
                                      "image"
                                    ).then(() => {
                                      setShowImageLink(false);
                                      setSavingName(false);
                                      window.location.reload();
                                    });
                                  }
                                }}
                              >
                                {savingImage ? (
                                    <>
                                        <svg
                                            className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Saving
                                    </>
                                ) : (
                                  'Save'
                                )}
                              </button>
                            </div>
                        </>
                      )}
                    </div>
                  </div>
                </form>           
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

async function saveUserImage({
  currentTarget
}:ChangeEvent<HTMLInputElement>){
  if (currentTarget.files?.length && currentTarget.files?.[0] !== null) {
      const file = currentTarget.files[0];
      const blob = await SaveFile(file);        ;

      return blob;
  }
}