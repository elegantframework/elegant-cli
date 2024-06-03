'use client'
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Welcome from "./Pages/Welcome";
import Error from "./Pages/Error";
import Onboard from "./Pages/Onboard";
import { usePathname, useRouter } from "next/navigation";

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
    const onboarded = true;
    const router = useRouter();
    const pathname = usePathname();

    if(!session && !onboarded) {
        router.push("/admin");
        return(
            <Onboard />
        );
    }

    if(!session) { 
        router.push("/admin");
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
            <Dashboard />
        );
    }

    if(session && pathname === "/admin/user") {
        return(
            <Dashboard />
        );
    }

    return(
        <Error />
    );
}