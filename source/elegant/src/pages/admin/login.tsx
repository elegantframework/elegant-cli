import Card from "@/components/core/Cards/Card";
import GitHubIcon from "@/components/core/Icons/GitHubIcon/GitHubIcon";
import MetaTitle from "@/utils/core/Meta/MetaTitle";

Login.layoutProps = {
  meta: {
    title: "Log In - " + MetaTitle(process.env.NEXT_PUBLIC_APP_NAME || "", "Elegant"),
  },
  stickyHeader: false
};

export default function Login() {
  return (
    <main className="relative flex h-screen flex-col items-center justify-center z-10 p-4">
      <Card>
        <p className="mb-5 dark:text-slate-200">
          Sign in with GitHub to access your&nbsp;dashboard.
        </p>
        <a
          href="/api/admin/login"
          className="mr-2 mb-2 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-primary-300 dark:focus:ring-offset-primary-900 dark:focus:ring-primary-700"
        >
          <GitHubIcon className="h-5 w-5 mr-2"/> Sign in with GitHub
        </a>
      </Card>
    </main>
  )
}