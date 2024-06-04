'use client'
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Welcome from "./Pages/Welcome";
import Error from "./Pages/Error";
import Onboard from "./Pages/Onboard";
import { usePathname, useRouter } from "next/navigation";
import SiteSettings from "./Pages/SiteSettings";
import UserSettings from "./Pages/UserSettings";

export interface CMSProps {
    postgresUrl: string | undefined,
    nonPoolingPUrl: string | undefined
};

export default function CMS({
    postgresUrl,
    nonPoolingPUrl
}: CMSProps) {
    const router = useRouter();
    const pathname = usePathname();
    let onboarded = false;

    if(!postgresUrl || !nonPoolingPUrl) {
        return(
            <Welcome 
                postgresUrl={postgresUrl}
                nonPoolingPUrl={nonPoolingPUrl}
            />
        );
    }

    const session = null;

    if(session) {
        onboarded = true;
    }
    else {
        // @todo: check if an admin user has been onboarded
    }

    if(!session && !onboarded) {
        router.push("/admin");
        return(
            <Onboard />
        );
    }

    if(!session) { 
        return(
            <Login />
        );
    }

    if(session && pathname === "/admin") {
        return(
            <Dashboard />
        );
    }

    if(session && pathname === "/admin/settings") {
        return(
            <SiteSettings />
        );
    }

    if(session && pathname === "/admin/user") {
        return(
            <UserSettings />
        );
    }

    return(
        <Error />
    );
}