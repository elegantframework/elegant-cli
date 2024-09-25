'use client'

import { useState } from "react";
import Input from "./Input";

export default function SettingsCard({
    heading,
    message,
    defaultValue,
    helperText,
    saving,
    onSave,
    error = ""
}:{
    heading: string;
    message: string;
    defaultValue: string;
    helperText: string;
    saving: boolean,
    onSave: (
        value: string
    ) => void;
    error?: string;
}) {
    const [value, setValue] = useState('');
    
    return(
        <div className="bg-white max-w-5xl shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg">
            <form>
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                        {heading}
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                        <p>
                            {message}
                        </p>
                    </div>
                    <div className="mt-5 sm:flex sm:items-center">
                        <div className="w-full sm:max-w-xs">
                            <Input 
                                label={heading}
                                id="name"
                                defaultValue={defaultValue}
                                onChange={(value) => {
                                    setValue(value);
                                }}
                                error={error}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10 md:pr-6">
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                        {helperText}
                    </p>
                    <button
                        type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                onSave(
                                    value
                                );
                        }}
                        className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
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
            </form>           
        </div> 
    );
}