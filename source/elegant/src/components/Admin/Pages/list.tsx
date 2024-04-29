import { GraphQLError } from 'graphql';
import matter from 'gray-matter';
import Link from 'next/link';
import { singular } from 'pluralize';
import { useContext } from 'react';
import { CMSContext } from '@/utils/Context';
import { useDocumentsQuery } from '@/graphql/generated';
import { Document } from '@/types/Document';
import { CMSSignOut } from '@/utils/Auth/hooks';
import AdminLayout from '@/components/Layouts/AdminLayout';
import DocumentsTable from '@/components/DocumentsTable';

type GQLErrorExtended = GraphQLError & { type: string }

type ListProps = {
  collection: string
}

export default function List({ collection }: ListProps) {
  const {
    repoOwner,
    repoSlug,
    repoBranch,
    contentPath,
    monorepoPath,
    session
  } = useContext(CMSContext);
  const { data, error, loading } = useDocumentsQuery({
    variables: {
      owner: repoOwner || session?.user?.login || '',
      name: repoSlug || '',
      contentPath:
        `${repoBranch}:${
          monorepoPath
        }${contentPath}/${collection}` || ''
    },
    fetchPolicy: 'network-only',
    onError: ({ graphQLErrors }) => {
      if (
        graphQLErrors &&
        (graphQLErrors?.[0] as GQLErrorExtended)?.type === 'NOT_FOUND'
      ) {
        CMSSignOut()
        return null
      }
      return null
    }
  })

  let documents: Document[] = []

  const entries =
    data?.repository?.object?.__typename === 'Tree' &&
    data?.repository?.object?.entries

  if (entries) {
    entries.forEach((document) => {
      if (document.name.slice(-4) === '.mdx') {
        const {
          data: { title, publishedAt, status, author }
        } = matter(
          document?.object?.__typename === 'Blob' && document?.object?.text
            ? document?.object?.text
            : ''
        )
        documents.push({
          title,
          status,
          publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
          slug: document.name.replace('.mdx', ''),
          author,
          content: '',
          tags: []
        })
      }
    })

    documents.sort((a, b) => Number(b.publishedAt) - Number(a.publishedAt))
  }

  return (
    <AdminLayout
      error={error}
      title={collection[0].toUpperCase() + collection.slice(1)}
    >
      <div className="mb-8 flex h-12 items-center">
        <h1 className="mr-12 text-2xl capitalize">{collection}</h1>
        <Link href={`/admin/${collection}/new`}>
          <div className="mr-2 mb-2 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-indigo-300 dark:focus:ring-offset-indigo-900 dark:focus:ring-indigo-700 cursor-pointer">
            New {singular(collection)}
          </div>
        </Link>
      </div>
      {documents.length > 0 && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <DocumentsTable documents={documents} collection={collection} />
        </div>
      )}
      {documents.length === 0 && !loading && (
        <div className="max-w-2xl">
          <div className="relative">
            <div className="mb-20 max-w-2xl p-8 px-4 md:p-8 text-black bg-white rounded-lg border border-gray-200 shadow-md prose prose-base">
              <p>This collection has no documents yet.</p>
              <p>
                Create your first{' '}
                <span className="capitalize">{singular(collection)}</span> by
                clicking the button below.
              </p>

              <Link href={`/admin/${collection}/new`}>
                <div className="inline-block mr-2 mb-2 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-indigo-300 dark:focus:ring-offset-indigo-900 dark:focus:ring-indigo-700 cursor-pointer">
                  New {singular(collection)}
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
