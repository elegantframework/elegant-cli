import React, { Suspense, useEffect } from "react";
import DashboardLayout from "../DashboardLayout";
import { Session } from "next-auth";
import Heading from "../Heading";
import { MetaTitle } from "@brandonowens/elegant-ui";
import { Collection } from "@/components/Types";

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

    return(
        <DashboardLayout 
          session={session}
          collections={collections}
        >
            <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
                <Heading title="Account Settings">

                </Heading>
            </div>
        </DashboardLayout>
    );
}