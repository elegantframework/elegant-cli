import React from "react";
import DashboardLayout from "../DashboardLayout";
import { Session } from "next-auth";
import Heading from "../Heading";

export default function SiteSettings({
  session
}:{
  session: Session | null
}) {
    return(
        <DashboardLayout session={session}>
             <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
              <Heading title="Settings">

              </Heading>
            </div>
        </DashboardLayout>
    );
}