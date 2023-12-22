import { ApolloClient, ApolloProvider } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { CMSProvider } from '@/utils/Context';
import {
  CollectionsDocument,
  CollectionsQuery,
  CollectionsQueryVariables
} from '@/graphql/generated';
import { initializeApollo, useApollo } from '@/utils/Apollo/apollo';
import { getLoginSession } from '@/utils/Auth/auth';
import { envVars, EnvVarsType } from '@/utils/envVarsCheck';
import Error from './404';
import NewCollection from '@/components/Admin/Pages/new-collection';
import Collections from './collections';
import EditDocument from '@/components/Admin/Pages/edit-document';
import List from './list';
import Settings from './settings';
import Welcome from './welcome';
import AddCustomField from '@/components/Admin/Pages/add-custom-field';
import { Session } from '@/types/Index';
import Config from 'Config';
import Login from './login';

type Props = {
  missingEnvVars: EnvVarsType | false
  providerData: {
    client: ApolloClient<any>
    repoOwner: string
    repoSlug: string
    repoBranch: string
    contentPath: string
    monorepoPath: string
    session: Session | null
    initialApolloState?: null
    collections: string[]
    pages: string[]
  }
}

const defaultPages: { [key: string]: ReactElement | undefined } = {
  settings: <Settings />,
  collections: undefined
}

const CMS = ({ missingEnvVars, providerData }: Props) => {
  const [pages, setPages] = useState(providerData?.pages);
  const [collections, setCollections] = useState(providerData?.collections);
  const router = useRouter();
  const client = useApollo(providerData?.initialApolloState);

  /**
   * Add a new content page
   * @param page A page url slug
   */
  const addPage = (page: string) => {

    if (pages.includes(page)){
      return;
    }

    if (collections.includes(page)){
      return;
    }

    setPages([...pages, page]);
    setCollections([...collections, page]);
  }

  const removePage = (page: string) => {
    setPages(pages.filter((p) => p !== page))
    setCollections(collections.filter((p) => p !== page))
    console.log('removePage', page)
  }

  if (missingEnvVars) {
    return <Welcome variables={missingEnvVars} />;
  } 

  const { session } = providerData;

  // if the user is not logged in, redirect them to the sign in page
  if (!session) {  
    return <Login />;
  }

  if (!router) {
    return null;
  }

  const slug = router.query?.cms?.[0] || '';
  const slug2 = router.query?.cms?.[1] || '';

  if (slug && !pages.includes(slug)) {
    return <Error />;
  }

  const isContent = slug && collections.includes(slug);

  return (
    <CMSProvider
      {...providerData}
      pages={pages}
      collections={collections}
      addPage={addPage}
      removePage={removePage}
    >
      <ApolloProvider client={client}>
        {!slug && <Collections />}
        {slug2 && isContent && <EditDocument collection={slug} />}
        {!slug2 && isContent ? <List collection={slug} /> : defaultPages[slug]}
        {(slug === 'collections' && collections.includes(slug2) && (
          <AddCustomField collection={slug2} />
        )) ||
          (!!slug2 && !isContent && <NewCollection />)}
      </ApolloProvider>
    </CMSProvider>
  )
}

export default CMS;

CMS.layoutProps = {
  stickyHeader: false,
  meta: {
    noIndex: true
  }
};

export const CMSServerSideProps: GetServerSideProps = async ({ req }) => {
  if (envVars.hasMissingEnvVars) {
    return {
      props: {
        missingEnvVars: envVars.envVars
      }
    }
  }

  const session = await getLoginSession(req)

  const apolloClient = session ? initializeApollo(null, session) : null

  let collections: String[] = []

  if (apolloClient) {
    try {
      const { data: documentQueryData } = await apolloClient.query<
        CollectionsQuery,
        CollectionsQueryVariables
      >({
        query: CollectionsDocument,
        variables: {
          name:
            Config('admin.cms_repository_slug') ?? process.env.VERCEL_GIT_REPO_SLUG ?? '',
          contentPath: `${Config('admin.cms_repository_branch')}:${
            Config('admin.cms_monorepo_path')
          }${Config('admin.cms_content_path') || '_content'}`,
          owner: Config('admin.cms_repository_owner') || session?.user?.login || ''
        }
      })

      const documentQueryObject = documentQueryData?.repository?.object

      if (documentQueryObject?.__typename === 'Tree') {
        collections = documentQueryObject?.entries
          ?.map((entry) => (entry.type === 'tree' ? entry.name : undefined))
          .filter(Boolean) as String[]
      }
    } catch (error) {
      console.log({ error })
    }
  }

  return {
    props: {
      missingEnvVars: false,
      providerData: {
        repoOwner: Config('admin.cms_repository_owner') || session?.user?.login || '',
        repoSlug: Config('admin.cms_repository_slug') || process.env.VERCEL_GIT_REPO_SLUG,
        repoBranch: Config('admin.cms_repository_branch'),
        contentPath: Config('admin.cms_content_path') || '_content',
        monorepoPath: Config('admin.cms_monorepo_path'),
        session: session || null,
        initialApolloState: apolloClient?.cache.extract() || null,
        collections,
        pages: [...Object.keys(defaultPages), ...collections]
      }
    }
  }
}
