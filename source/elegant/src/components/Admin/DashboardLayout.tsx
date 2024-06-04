import { ReactNode, Suspense } from "react";
import Nav from "./Nav";
import Profile from "./Profile";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
      <div>
        <Nav>
          <Suspense fallback={<div>Loading...</div>}>
            <Profile />
          </Suspense>
        </Nav>
        <div className="min-h-screen bg-white dark:bg-black sm:pl-60">{children}</div>
      </div>
    );
  }