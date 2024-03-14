import { Card, GitHubIcon, ElegantLogo } from "@brandonowens/elegant-ui";
import Config from '@/utils/Config/Config';
import MetaTitle from "@/utils/Meta/MetaTitle";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Seo from "@/components/Seo/Seo";

Login.layoutProps = {
  stickyHeader: false
};

export default function Login() {
  return (
    <>
      <Seo 
        title={`Log In - ${MetaTitle(Config('app.name'), "Elegant CMS")}`}
      />
      <main className="relative flex h-screen flex-col items-center justify-center z-10 p-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <ElegantLogo className="w-auto h-8 mx-auto"/>
        </div>
        <Card className="mt-10">
          <p className="mb-5 dark:text-slate-200">
            Sign in with GitHub to access your dashboard.
          </p>
          <Link
            className="mr-2 mb-2 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-indigo-300 dark:focus:ring-offset-indigo-900 dark:focus:ring-indigo-700"
            href={"/api/admin/login"}
          >
            <GitHubIcon className="h-5 w-5 mr-2"/> Sign in with GitHub
          </Link>
        </Card>
        <div className="sm:mx-auto sm:w-full sm:max-w-md xs:pl-0 sm:pl-4 text-left -mt-6 dark:text-white">
          <Link 
            href="/"
            className="hover:underline"
          >
            <ArrowLongLeftIcon className="h-6 w-6 inline mr-2"/>Go to {Config("app.name")}
          </Link>
        </div>
      </main>    
    </>
  )
}