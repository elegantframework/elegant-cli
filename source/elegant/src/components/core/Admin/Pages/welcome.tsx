import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { envVars } from '@/utils/core/envVarsCheck';

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
        <title>Welcome to Elegant CMS</title>
      </Head>
        <div className="absolute bottom-10 w-full left-0 overflow-hidden z-0 md:-top-10">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1200 365"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-276.32 159.182C-232.477 130.613 -193.037 95.4797 -149.142 66.8773C-123.398 50.1026 -99.0091 30.5473 -69.5694 19.7442C-38.5686 8.36831 -2.85928 -3.31376 37.4064 4.54405C65.5725 10.0406 93.927 20.2194 125.473 43.3305C150.292 61.5127 166.609 84.5943 185.936 114.255C220.569 167.405 225.81 223.228 224.615 265.934C223.2 316.536 198.5 341.652 158.621 340.382C121.027 339.185 71.9868 320.328 45.0005 250.638C8.63388 156.723 111.095 159.937 149.344 159.325C235.509 157.945 334.997 185.056 433.145 218.102C547.034 256.448 651.041 336.753 780 356C940 384.5 1235.5 330.311 1237.95 70.5232"
              stroke="#1E293B"
              className="stroke-2 md:stroke-1"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <main className="relative flex h-screen flex-col items-center justify-center z-10 p-4">
          <div className="mb-20 max-w-2xl p-8 px-4 md:p-8 text-black bg-white rounded-lg border border-gray-200 shadow-md">
            <p className="mb-5">
              Before you can access your admin area, make sure the following
              environment variables are set up:
            </p>
            <ul className="mb-5">
              {Object.entries(variables.required).map(([key, value]) => (
                <li key={key} className="mb-1">
                  {`${value ? '✅' : '❌'} Variable`}{' '}
                  <span className="font-semibold">{key}</span>{' '}
                  {`is ${value ? 'set.' : 'missing!'}`}
                </li>
              ))}
            </ul>
            {!variables.optional.OST_CONTENT_PATH && (
              <p className="mb-5 p-2 bg-primary-100 rounded">
                Optional variable{' '}
                <span className="font-semibold">OST_CONTENT_PATH</span> defines
                where your content is saved.
                <br />
                Defaulting to <code>outstatic/content</code>
              </p>
            )}
            {!variables.optional.NEXT_PUBLIC_CMS_REPOSITORY_OWNER && (
              <p className="mb-5 p-2 bg-primary-100 rounded">
                Optional variable{' '}
                <span className="font-semibold">NEXT_PUBLIC_CMS_REPOSITORY_OWNER</span> is not
                set.
                <br />
                Defaulting to your GitHub user.
              </p>
            )}
            <p>You need to restart Next.js to apply the changes.</p>
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

  console.log({ envVars })

  return {
    props: {
      variables: envVars.envVars
    }
  }
}
