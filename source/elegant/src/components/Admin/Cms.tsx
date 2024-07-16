'use client'
import Dashboard from "./Pages/Dashboard";
import Welcome from "./Pages/Welcome";
import Error from "./Pages/Error";
import Onboard from "./Pages/Onboard";
import SiteSettings from "./Pages/SiteSettings";
import UserSettings from "./Pages/UserSettings";
import { Session } from "next-auth";
import Collections from "./Pages/Collections";
import NewCollection from "./Pages/NewCollection";
import Login from "./Pages/Login";
import DocumentList from "./Pages/DocumentList";
import EditDocument from "./Pages/EditDocument";
import { useEffect, useState } from "react";
import { Collection } from "../Types";
import { getAllCollections } from "@/utils/Db/Actions/Collection";

export interface CMSProps {
    postgresUrl: string | undefined,
    nonPoolingPUrl: string | undefined,
    adminCount: number,
    session: Session | null,
    params: { 
        cms: string[]
    } 
};

export default function CMS({
    postgresUrl,
    nonPoolingPUrl,
    adminCount,
    session,
    params
}: CMSProps) {
    const [collections, setCollections] = useState<Collection[]>();

    useEffect(() => {
        getAllCollections().then(
            collections => {
                setCollections(collections)
            }
        );
    }, [params.cms]);

    if(!postgresUrl || !nonPoolingPUrl) {
        return(
            <Welcome 
                postgresUrl={postgresUrl}
                nonPoolingPUrl={nonPoolingPUrl}
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
            <Dashboard session={session}/>
        );
    }

    if(params.cms[0] === "settings") {
        return(
            <SiteSettings session={session}/>
        );
    }

    if(params.cms[0] === "user") {
        return(
            <UserSettings session={session}/>
        );
    }

    if(params.cms[0] === "collections" && !params.cms[1]) {
        return(
            <Collections session={session}/>
        );
    }

    if(params.cms[0] === "collections" && params.cms[1] === "new") {
        return(
            <NewCollection 
                session={session}
                collections={[]}
            />
        );
    }

    if(collections && collections.find(e => e.title === params.cms[0]) && !params.cms[1]) {
        return(
            <DocumentList session={session} title={params.cms[0]}/>
        );
    }

    if(collections && collections.find(e => e.title === params.cms[0]) && params.cms[1]) {
        return(
            <EditDocument session={session}/>
        );
    }

    if(collections && !collections.find(e => e.title === params.cms[0])) {
        return(
            <Error />
        );
    }
}