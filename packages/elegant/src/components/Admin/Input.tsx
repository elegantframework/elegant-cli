import {
    AlertCircleIcon
} from 'lucide-react';
import { cn } from "@/utils/utils";

export interface InputProps {
    id: string;
    label?: string;
    placeholder?: string;
    helperText?: string; 
    type?: string;
    readOnly?: boolean;
    wrapperClass?: string;
    className?: string;
    defaultValue?: any;
    onChange?: (value: string) => void;
    error?: string;
};

export default function Input({
    label,
    placeholder = '',
    helperText,
    id,
    type = 'text',
    readOnly = false,
    wrapperClass,
    className,
    defaultValue,
    onChange,
    error,
    ...props
}: InputProps) {
    return(
        <div className={wrapperClass}>
            {label && (
                <label
                    htmlFor={id}
                    className={`mb-1 block text-sm font-medium text-gray-900 first-letter:capitalize`}
                >
                    {label}
                </label>
            )}
            <div className="relative mt-2 rounded-md shadow-sm">
                <input
                    {...props}
                    className={
                        cn(
                            `block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm outline-none ${className || ""}`,
                            error 
                            ? "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500 ring-1" 
                            : "text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
                        )
                    }
                    type={type}
                    name={id}
                    id={id}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    aria-invalid={error ? true : false}
                    aria-describedby="error"
                    onChange={(e) => {
                        onChange ? onChange(e.target.value) : null;
                    }}
                />
                {error && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <AlertCircleIcon aria-hidden="true" className="h-5 w-5 fill-red-500 text-white" />
                    </div>
                )}
            </div>
            <p id="error" className="mt-2 text-sm text-red-600">
                {error}
            </p>
        </div>
    );
}