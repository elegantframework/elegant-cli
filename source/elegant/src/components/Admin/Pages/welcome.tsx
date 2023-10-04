import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { envVars } from '@/utils/envVarsCheck';
import Logo from '../../Logos/Logo/Logo';
import Card from '../../Cards/Card';
import ArrowLongLeftIcon from '@heroicons/react/20/solid/ArrowLongLeftIcon';
import Config from '@/utils/Config/Config';
import MetaTitle from '@/utils/Meta/MetaTitle';

type WelcomeProps = {
  variables: {
    required: {
      [key: string]: boolean
    }
    optional: {
      [key: string]: boolean
    }
  }
}

export default function Welcome({ variables }: WelcomeProps) {
  return (
    <>
      <Head>
        <title>
          Welcome to Elegant CMS - {MetaTitle(process.env.NEXT_PUBLIC_APP_NAME || "", "Elegant")}
        </title>
      </Head>
        <main className="relative flex h-screen flex-col items-center justify-center z-10 p-4">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Logo className="w-auto h-8 mx-auto"/>
          </div>
          <Card className="mt-10">
            <div className="w-full border-b border-gray-200 bg-white pb-5 text-left -mt-[10px]">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Welcome to Elegant CMS</h3>
            </div>
            <p className="mb-5 mt-10 text-left dark:text-slate-200">
              Before you can access your admin area, please set the following environment variables in your `.env` file:
            </p>
            <ul className="mb-5">
              {Object.entries(variables.required).map(([key, value]) => (
                <li key={key} className="mb-1 text-left">
                  {`${value ? '✅' : '❌'} `}{' '}
                  <span className="font-semibold">{key}</span>{' '}
                  {`is ${value ? 'set.' : 'missing!'}`}
                </li>
              ))}
            </ul>
            <p>You need to restart Next.js to apply the changes.</p>
          </Card>
          <div className="sm:mx-auto sm:w-full max-w-2xl xs:pl-0 sm:pl-4 text-left -mt-6 dark:text-white">
            <a href="/"
              className="hover:underline"
            >
              <ArrowLongLeftIcon className="h-6 w-6 inline mr-2"/>Go to {Config("app.name")}
            </a>
          </div>
        </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (!envVars.hasMissingEnvVars) {
    context.res.writeHead(302, {
      Location: '/admin'
    })
    context.res.end()
  }

  return {
    props: {
      variables: envVars.envVars
    }
  }
}
