import Link from "next/link";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import { UserRound } from "lucide-react";

export default function Profile({
  name,
  image
}:{
  name: string;
  image: string | null;
}) {
  return (
    <div className="flex w-full items-center justify-between">
      <Link
        href="/admin/user"
        className="flex w-full flex-1 items-center space-x-3 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
      >
        {image && image.length > 0 &&(
          <Image
            src={image}
            width={40}
            height={40}
            alt={name ?? "User avatar"}
            className="h-6 w-6 rounded-full"
          />
        )}
        {image?.length === 0 &&(
          <div className="h-6 w-6 rounded-full bg-neutral-200">
            <UserRound className="text-neutral-500"/>
          </div>
        )}
        <span className="truncate text-sm font-medium">
          {name}
        </span>
      </Link>
      <LogoutButton />
    </div>
  );
}
