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
            {!variables.optional.NEXT_PUBLIC_CMS_CONTENT_PATH && (
              <p className="mb-5 p-2 bg-primary-100 rounded">
                Optional variable{' '}
                <span className="font-semibold">NEXT_PUBLIC_CMS_CONTENT_PATH</span> defines
                where your content is saved.
                <br />
                Defaulting to <code>content</code>
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
