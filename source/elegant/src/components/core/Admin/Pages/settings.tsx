import { useContext, useState } from 'react';
import { clsx } from 'clsx';
import { OutstaticContext } from '@/utils/core/Context';
import AdminLayout from '@/components/core/AdminLayout';
import { MetadataBuilder } from '@/components/core/MetadataBuilder';

export default function Settings() {
  const [rebuild, setRebuilding] = useState(false)
  const { repoSlug, repoBranch, contentPath } = useContext(OutstaticContext)

  return (
    <AdminLayout title="Settings">
      <div className="mb-8 flex h-12 items-center">
        <h1 className="mr-12 text-2xl">Settings</h1>
      </div>
      <div className="max-w-lg">
        <div className="mb-8 max-w-2xl p-8 px-4 md:p-8 text-black bg-white rounded-lg border border-gray-200 shadow-md prose prose-base">
          <h2>Metadata</h2>
          <div className="flex flex-row items-center">
            <button
              className={clsx(
                'mr-2 mb-2 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-primary-300 dark:focus:ring-offset-primary-900 dark:focus:ring-primary-700 cursor-pointer',
                rebuild && 'border-primary-400 bg-primary-500'
              )}
              onClick={() => setRebuilding(true)}
            >
              {rebuild ? 'Rebuilding...' : 'Rebuild Metadata'}
            </button>
            <MetadataBuilder
              className="pl-2"
              rebuild={rebuild}
              onComplete={() => setRebuilding(false)}
            />
          </div>
          <p className="text-sm">
            If you&apos;ve made changes outside of outstatic, or if you are
            seeing posts with incorrect metadata, you can rebuild your metadata
            and automatically deploy those changes to your site.
          </p>
        </div>

        <div className="mb-8 max-w-2xl p-8 px-4 md:p-8 text-black bg-white rounded-lg border border-gray-200 shadow-md prose prose-base">
          <h2>Environment</h2>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Repository
            </label>
            <input
              className="cursor-not-allowed block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm outline-none"
              value={repoSlug}
              readOnly
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Branch
            </label>
            <input
              className="cursor-not-allowed block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm outline-none"
              value={repoBranch}
              readOnly
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Content Path
            </label>
            <input
              className="cursor-not-allowed block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm outline-none"
              value={`${contentPath}`}
              readOnly
            />
          </div>
          <p className="text-sm">
            These values come from your Outstatic environment. To learn more
            about how to update these values,{' '}
            <a
              href="https://outstatic.com/docs/environment-variables"
              target="_blank"
              rel="noreferrer"
              className="underline font-semibold"
            >
              click here
            </a>
            .
          </p>
        </div>
      </div>
    </AdminLayout>
  )
}
