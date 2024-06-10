import { ReactNode } from "react";
import Nav from "./Nav";
import Profile from "./Profile";
import { Session } from "next-auth";

export default function DashboardLayout({ 
  session, 
  children 
}: { 
  session: Session | null, 
  children: ReactNode 
}) {
    return (
      <div>
        <Nav>
          <Profile session={session}/>
        </Nav>
        <div className="min-h-screen bg-white dark:bg-black sm:pl-60">{children}</div>
      </div>
    );
  }