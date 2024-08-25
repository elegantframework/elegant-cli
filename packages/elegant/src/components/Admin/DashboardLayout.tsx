import { ReactNode, useEffect, useState } from "react";
import Nav from "./Nav";
import Profile from "./Profile";
import { Session } from "next-auth";
import { Collection } from "../Types";
import { getUserById } from "@/utils/Db/Actions/User";

export default function DashboardLayout({ 
  session, 
  children,
  collections,
}: { 
  session: Session | null, 
  children: ReactNode,
  collections: Collection[]
}) {
  const [user, setUser] = useState<{
    name: string;
    image: string | null;
    twitterHandle: string;
  }>({
    name: "",
    image: null,
    twitterHandle: ""
  });

  const getUser = async() => {
    const result = await getUserById(session?.user?.id || "");

    setUser({
      name: result?.name || "",
      image: result?.image || "",
      twitterHandle: result?.twitterHandle || ""
    });
  };

  useEffect(() => {
    getUser();
  }, []);
  
  return (
    <div>
      <Nav collections={collections}>
        <Profile
          name={user.name}
          image={user.image}
        />
      </Nav>
      <div className="min-h-screen bg-white dark:bg-black sm:pl-60">{children}</div>
    </div>
  );
  }