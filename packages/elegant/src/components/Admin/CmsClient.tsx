'use client'

import React from "react";
import Dashboard from "./Pages/Dashboard";
import Error from "./Pages/Error";
import SiteSettings from "./Pages/SiteSettings";
import UserSettings from "./Pages/UserSettings";
import { Session } from "next-auth";
import Collections from "./Pages/Collections";
import NewCollection from "./Pages/NewCollection";
import DocumentList from "./Pages/DocumentList";
import EditDocument from "./Pages/EditDocument";
import { Collection, R2Config } from '../Types';
import Onboard from "./Pages/Onboard";
import Welcome from "./Pages/Welcome";
import Login from "./Pages/Login";

export interface CMSProps {
    postgresUrl: string | undefined,
    nonPoolingPUrl: string | undefined,
    r2Config: R2Config | undefined;
    adminCount: number,
    session: Session | null,
    params: { 
        cms: string[]
    },
    collections: Collection[]
};

export default function CmsClient({
    postgresUrl,
    nonPoolingPUrl,
    r2Config,
    adminCount,
    session,
    params,
    collections
}: CMSProps) {
    if(!postgresUrl || !nonPoolingPUrl || !r2Config) {
        return(
            <Welcome 
                postgresUrl={postgresUrl}
                nonPoolingPUrl={nonPoolingPUrl}
                r2Config={r2Config}
            />
        );
    }

    if(adminCount === 0) {
        return(
            <Onboard />
        );
    }

    if(!session) { 
        return(
            <Login />
        );
    }

    if(!params.cms) {
        return(
            <Dashboard 
                session={session}
                collections={collections || []}
            />
        );
    }

    if(params.cms[0] === "settings") {
        return(
            <SiteSettings 
                session={session}
                collections={collections || []}
            />
        );
    }

    if(params.cms[0] === "user") {
        return(
            <UserSettings 
                session={session}
                collections={collections || []}
            />
        );
    }

    if(params.cms[0] === "collections" && !params.cms[1]) {
        return(
            <Collections 
                session={session}
                collections={collections || []}
            />
        );
    }

    if(params.cms[0] === "collections" && params.cms[1] === "new") {
        return(
            <NewCollection 
                session={session}
                collections={collections || []}
            />
        );
    }

    if(collections && collections.find(e => e.title === params.cms[0]) && !params.cms[1]) {
        return(
            <DocumentList 
                session={session} 
                collection={params.cms[0]}
                collections={collections || []}
            />
        );
    }

    if(collections && collections.find(e => e.title === params.cms[0]) && params.cms[1]) {
        return(
            <EditDocument 
                session={session} 
                collection={
                    collections.find(e => e.title === params.cms[0]) || {
                        id: "",
                        title: ""
                    }
                }
                slug={params.cms[1]}
                collections={collections || []}
            />
        );
    }

    if(collections && !collections.find(e => e.title === params.cms[0])) {
        return(
            <Error />
        );
    }
}