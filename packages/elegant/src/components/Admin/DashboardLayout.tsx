import { ReactNode } from "react";
import Nav from "./Nav";
import Profile from "./Profile";
import { Session } from "next-auth";
import { Collection } from "../Types";

export default function DashboardLayout({ 
  session, 
  children,
  collections,
}: { 
  session: Session | null, 
  children: ReactNode,
  collections: Collection[]
}) {
    return (
      <div>
        <Nav collections={collections}>
          <Profile session={session}/>
        </Nav>
        <div className="min-h-screen bg-white dark:bg-black sm:pl-60">{children}</div>
      </div>
    );
  }