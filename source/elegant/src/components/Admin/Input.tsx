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
            <div className="relative">
                <input
                    // {...register(id, registerOptions)}
                    {...props}
                    className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-indigo-500 ${className}`}
                    type={type}
                    name={id}
                    id={id}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    aria-describedby={id}
                    defaultValue={defaultValue}
                />
            </div>
            {/* <>
                {(errors[id]?.message || helperText) && (
                <div className="mt-1 first-letter:capitalize">
                    {helperText && (
                    <p className="text-xs text-gray-500">{helperText}</p>
                    )}
                    {errors[id]?.message && (
                    <span className="text-sm text-red-500">
                        {errors[id]?.message?.toString()}
                    </span>
                    )}
                </div>
                )}
            </> */}
        </div>
    );
}