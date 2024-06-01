import React from "react";
import Welcome from "./welcome";
import Login from "./login";

export interface CMSProps {

};

export default function CMS({}: CMSProps) {
    if(!process.env.POSTGRES_PRISMA_URL || !process.env.POSTGRES_URL_NON_POOLING) {
        return(
            <Welcome />
        );
    }

    return(
        <Login />
    );
}