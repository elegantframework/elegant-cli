import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import { Session } from "next-auth";

export default function Profile({
  session
}:{
  session: Session | null
}) {
  if (!session?.user) {
    return;
  }

  return (
    <div className="flex w-full items-center justify-between">
      <Link
        href="/admin/user"
        className="flex w-full flex-1 items-center space-x-3 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
      >
        <Image
          src={
            session.user.image ??
            `https://avatars.githubusercontent.com/u/10189130?v=4`
          }
          width={40}
          height={40}
          alt={session.user.name ?? "User avatar"}
          className="h-6 w-6 rounded-full"
        />
        <span className="truncate text-sm font-medium">
          {session.user.name}
        </span>
      </Link>
      <LogoutButton />
    </div>
  );
}
