'use client'
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Welcome from "./Pages/Welcome";
import Error from "./Pages/Error";
import Onboard from "./Pages/Onboard";

export interface CMSProps {
    postgresUrl: string | undefined,
    nonPoolingPUrl: string | undefined
};

export default function CMS({
    postgresUrl,
    nonPoolingPUrl
}: CMSProps) {
    if(!postgresUrl || !nonPoolingPUrl) {
        return(
            <Welcome 
                postgresUrl={postgresUrl}
                nonPoolingPUrl={nonPoolingPUrl}
            />
        );
    }

    const session = "hello";
    let onboarded = true;

    if(!session && !onboarded) {
        return(
            <Onboard />
        );
    }

    if(!session) { 
        return(
            <Login />
        );
    }

    if(session) {
        return(
            <Dashboard />
        );
    }

    return(
        <Error />
    );
}