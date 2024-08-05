'use client'
import { TrashIcon } from '@brandonowens/elegant-ui';
import { useState } from 'react';
import DeleteModal from './DeleteModal';

export default function DeleteDocumentButton({
    slug,
    disabled = false,
    onDeleted = () => {},
    className
}:{
    slug: string;
    disabled?: boolean;
    onDeleted?: () => void;
    className?: string;
}) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(true);

    return(
        <>
            <button
                onClick={() => setShowDeleteModal(true)}
                type="button"
                disabled={disabled}
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
                                onClick={() => setShowDeleteModal(false)}
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
                // <Modal title="Delete Document" close={() => setShowDeleteModal(false)}>
                //     <div className="space-y-6 p-6 text-left">
                //     <p className="text-base leading-relaxed text-gray-500">
                //         Are you sure you want to delete this document?
                //     </p>
                //     <p className="text-base leading-relaxed text-gray-500">
                //         This action cannot be undone.
                //     </p>
                //     </div>
        
                //     <div className="flex items-center space-x-2 rounded-b border-t p-6">
                //     <button
                //         type="button"
                //         className="flex rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none"
                //         onClick={() => {
                //         deleteDocument(slug)
                //         }}
                //     >
                //         {deleting ? (
                //         <>
                //             <svg
                //             className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                //             xmlns="http://www.w3.org/2000/svg"
                //             fill="none"
                //             viewBox="0 0 24 24"
                //             >
                //             <circle
                //                 className="opacity-25"
                //                 cx="12"
                //                 cy="12"
                //                 r="10"
                //                 stroke="currentColor"
                //                 strokeWidth="4"
                //             ></circle>
                //             <path
                //                 className="opacity-75"
                //                 fill="currentColor"
                //                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                //             ></path>
                //             </svg>
                //             Deleting
                //         </>
                //         ) : (
                //         'Delete'
                //         )}
                //     </button>
                //     <button
                //         type="button"
                //         className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 order-gray-600 bg-gray-800 text-white hover:border-gray-600 hover:bg-gray-700 focus:ring-gray-700"
                //         onClick={() => setShowDeleteModal(false)}
                //     >
                //         Cancel
                //     </button>
                //     </div>
                // </Modal>
            )}
        </>
    );
}