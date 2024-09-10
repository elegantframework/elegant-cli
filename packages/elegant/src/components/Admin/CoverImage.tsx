'use client'

import { ChangeEvent, useEffect, useState } from "react"
import Input from "./Input";
import SaveFile from "@/utils/CloudFlare/R2";

export default function CoverImage({
    image,
    onSave
}:{
    image: string;
    onSave: (result: string) => void;
}){
    const [showImage, setShowImage] = useState(false);
    const [showImageOptions, setShowImageOptions] = useState(true);
    const [showLink, setShowLink] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageUrlError, setImageUrlError] = useState('');
    const [previewLoading, setPreviewLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(false);
    const [saving, setSaving ] = useState(false);

    useEffect(() => {
        if(image.length > 0) {
            setShowImage(true);
            setShowImageOptions(false);
            setShowLink(false);
        }
    }, [image]);
    return(
        <>
            {loadingError && (
                <div
                    className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                    role="alert"
                >
                    The image failed to load, please try submitting again.
                </div>
            )}
            {showImageOptions && (
                <>
                    <span className="mb-1 block text-sm font-medium text-gray-900">
                        Add an image
                    </span>
                    <div className="w-full flex justify-end h-16 shrink-0 items-center gap-x-10 sm:gap-x-2 mt-2">
                        <button
                            type="button"
                            className="w-full sm:w-auto rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={() => {
                                setShowLink(true);
                                setShowImageOptions(false);
                            }}
                        >
                            Set URL
                        </button>
                        <label
                            htmlFor={`cover-image-upload`}
                            className="w-full sm:w-auto justify-center sm:justify-between inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-indigo-300 dark:focus:ring-offset-indigo-900 dark:focus:ring-indigo-700 cursor-pointer"
                        >
                            {saving ? (
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
                                    Uploading
                                </>
                            ) : (
                                'Upload Image'
                            )}
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            id={`cover-image-upload`}
                            onChange={async (e) => {
                                setSaving(true);
                                await saveCoverImage(e).then(
                                    (result) => {
                                        setSaving(false);
                                        onSave(result || "");
                                    }
                                );
                            }}
                            className="hidden"
                        />
                    </div>
                </>
            )}
            {showImage && (
                <>
                    <div className="mb-1 block text-sm font-medium text-gray-900">
                        Cover Image
                    </div>
                    <div
                        className={`w-full relative bg-slate-100 
                            ${previewLoading ? 'h-48' : ''}
                        `}
                    >
                        {previewLoading && (
                        <div
                            className={`animate-pulse w-full h-48 bg-slate-200 absolute`}
                        ></div>
                        )}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={image}
                            className="w-full max-h-48 object-contain"
                            onLoad={() => {
                                setShowLink(false);
                                setPreviewLoading(false);
                                setLoadingError(false);
                            }}
                            onError={() => {
                                setPreviewLoading(false);
                                setLoadingError(true);
                                setShowLink(false);
                            }}
                            alt={"Cover Image"}
                        />
                    </div>
                    <div className="w-full flex justify-end mt-2">
                        <button
                            onClick={() => {
                                onSave('');
                                setShowImageOptions(true);
                                setShowImage(false);
                                setShowLink(false);
                            }}
                            className="rounded-lg border border-red-700 bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none"
                        >
                            Remove
                        </button>
                    </div>
                </>
            )}
            {showLink && (
                <>
                    <Input
                        label="Set URL"
                        id="cover-image-input"
                        wrapperClass="mb-4"
                        onChange={(value) => {
                            setImageUrlError('');
                            setImageUrl(value);
                        }}
                        error={imageUrlError}
                    />
                    <div className="w-full flex justify-end shrink-0 items-center gap-x-6 mt-2">
                        <button
                            onClick={() => {
                                setImageUrl('');
                                setShowLink(false);
                                setShowImageOptions(true);
                            }}
                            type="button"
                            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full sm:w-auto justify-center sm:justify-between inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-indigo-300 dark:focus:ring-offset-indigo-900 dark:focus:ring-indigo-700 cursor-pointer"
                            onClick={() => {
                                if(imageUrl.length === 0) {
                                    setImageUrlError('Please enter a valid url.');
                                }
                                else {
                                    onSave(imageUrl);
                                    setShowImageOptions(false);
                                    setShowLink(false);
                                }
                            }}
                        >
                            {saving ? (
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
                                    Saving
                                </>
                            ) : (
                                'Save'
                            )}
                        </button>
                    </div>
                </>
            )}
        </>
    );
}

async function saveCoverImage({
    currentTarget
}:ChangeEvent<HTMLInputElement>){
    if (currentTarget.files?.length && currentTarget.files?.[0] !== null) {
        const file = currentTarget.files[0];
        const blob = await SaveFile(file); 

        return blob;
    }
}