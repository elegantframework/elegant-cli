'use client'
import { TrashIcon } from '@brandonowens/elegant-ui';
import { useState } from 'react';
import DeleteModal from './DeleteModal';
import { deletePost } from '@/utils/Db/Actions/Post';
import { useRouter } from 'next/navigation';

export default function DeleteDocumentButton({
    id,
    collection,
    className
}:{
    id: string;
    collection: string;
    className?: string;
}) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    return(
        <>
            <button
                onClick={() => setShowDeleteModal(true)}
                type="button"
                disabled={deleting}
                className={`z-10 inline-block text-gray-500 hover:bg-stone-100 hover:text-indigo-500 dark:hover:bg-stone-700 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5 ${className}`}
                title="Delete document"
            >
                <span className="sr-only">Delete document</span>
                <TrashIcon />
            </button>
            {showDeleteModal && (
                <DeleteModal 
                    title='Delete Document'
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    message='Are you sure you want to delete this document? This action cannot be undone.'
                    children={
                        <>
                            <button
                                type="button"
                                disabled={deleting}
                                onClick={() => {
                                    setDeleting(true);
                                    deleteDocument(id, collection).then(() => {
                                        setDeleting(false);
                                        router.push(`/admin/${collection}`);
                                    })
                                }}
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
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
                                data-autofocus
                                onClick={() => setShowDeleteModal(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>
                        </>
                    }
                />
            )}
        </>
    );
}

export async function deleteDocument(id: string, collection: string) {
    return await deletePost(id, collection);
}