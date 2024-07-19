export interface TextAreaProps {
    label?: string;
    id: string;
    placeholder?: string;
    helperText?: string;
    readOnly?: boolean;
    wrapperClass?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
};

export default function TextArea({
    label,
    placeholder = '',
    helperText,
    id,
    readOnly = false,
    wrapperClass,
    defaultValue,
    onChange,
}: TextAreaProps) {
    return(
        <div className={wrapperClass}>
            {label && (
                <label
                    htmlFor={id}
                    className="mb-1 block text-sm font-medium text-gray-900"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <textarea
                    name={id}
                    id={id}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    aria-describedby={id}
                    rows={5}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue={defaultValue}
                    onChange={(e) => {
                        onChange ? onChange(e.target.value) : null;
                    }}
                />
            </div>
            <div className="mt-1">
                {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
                {/* {errors[id]?.message && (
                <span className="text-sm text-red-500">
                    {errors[id]?.message?.toString()}
                </span>
                )} */}
            </div>
        </div>
    );
}