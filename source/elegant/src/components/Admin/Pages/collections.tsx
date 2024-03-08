import Link from 'next/link';
import { useContext, useState } from 'react';
import Modal from '@/components/Modal';
import { CMSContext } from '@/utils/Context';
import { useCreateCommitMutation } from '@/graphql/generated';
import { collectionCommitInput } from '@/utils/collectionCommitInput';
import useOid from '@/utils/Hooks/useOid';
import { TrashIcon } from '@brandonowens/elegant-ui';
import AdminLayout from '@/components/Layouts/AdminLayout';

export default function Collections() {
  const {
    collections,
    session,
    repoSlug,
    repoBranch,
    repoOwner,
    contentPath,
    monorepoPath,
    removePage
  } = useContext(CMSContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [createCommit] = useCreateCommitMutation()
  const fetchOid = useOid()

  const deleteCollection = async (collection: string) => {
    try {
      const oid = await fetchOid()
      const owner = repoOwner || '';

      const commitInput = collectionCommitInput({
        owner,
        oid,
        repoSlug,
        repoBranch,
        remove: true,
        contentPath,
        monorepoPath,
        collection
      })

      await createCommit({ variables: commitInput })
      setShowDeleteModal(false)
      removePage(collection)
    } catch (error) {}
  }

  return (
    <AdminLayout title="Collections">
      {collections.length === 0 ? (
        <div className="max-w-2xl">
          <div className="relative">
            <div className="mb-8 flex h-12 items-center">
              <h1 className="mr-12 text-2xl">
                Welcome to Elegant CMS
              </h1>
            </div>
            <div className="mb-20 max-w-2xl p-8 px-4 md:p-8 text-black bg-white rounded-lg border border-gray-200 shadow-md prose prose-base">
              <p>
                To get started you will need to create a new collection.
                Collections are the main building block of your Elegant
                application.
              </p>
              <p>Create your first collection by clicking the button below.</p>

              <Link href="/admin/collections/new">
                <div className="mr-2 mb-2 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-indigo-300 dark:focus:ring-offset-indigo-900 dark:focus:ring-indigo-700 cursor-pointer">
                  New Collection
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-8 flex h-12 items-center">
            <h1 className="mr-12 text-2xl">Collections</h1>
            <Link href="/admin/collections/new">
              <div className="mr-2 mb-2 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-indigo-300 dark:focus:ring-offset-indigo-900 dark:focus:ring-indigo-700 cursor-pointer">
                New Collection
              </div>
            </Link>
          </div>
          <div className="max-w-5xl w-full grid grid-cols-3 gap-6">
            {collections.map((collection) => (
              <div
                key={collection}
                className="relative flex p-6 justify-between items-center max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-slate-100"
              >
                <Link href={`/admin/collections/${collection}`}>
                  <h5 className="text-2xl cursor-pointer font-bold tracking-tight text-gray-900 capitalize hover:text-indigo-500">
                    {collection}
                    <span className="absolute top-0 bottom-0 left-0 right-16"></span>
                  </h5>
                </Link>
                <button
                  className="z-10 inline-block text-gray-500 hover:bg-white focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(true)
                    setSelectedCollection(collection)
                  }}
                >
                  <span className="sr-only">Delete content</span>
                  <TrashIcon />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      {showDeleteModal && (
        <Modal
          title="Delete Collection"
          close={() => {
            setShowDeleteModal(false)
            setSelectedCollection('')
          }}
        >
          <div className="space-y-6 p-6 text-left">
            <p className="text-base leading-relaxed text-gray-500">
              Are you sure you want to delete this collection?
            </p>
            <p className="text-base leading-relaxed text-gray-500">
              This action cannot be undone.
            </p>
          </div>

          <div className="flex items-center space-x-2 rounded-b border-t p-6">
            <button
              type="button"
              className="flex rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none"
              onClick={() => {
                setDeleting(true)
                deleteCollection(selectedCollection)
              }}
            >
              {deleting ? (
                <>
                  <svg
                    className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Deleting
                </>
              ) : (
                'Delete'
              )}
            </button>
            <button
              type="button"
              className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 order-gray-600 bg-gray-800 text-white hover:border-gray-600 hover:bg-gray-700 focus:ring-gray-700"
              onClick={() => {
                setShowDeleteModal(false)
                setSelectedCollection('')
              }}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}
