type Props = {
    title: string;
    description: string;
    section?: string;
};

/**
 * 
 * @returns 
 */
export function DocumentationHeading({
    title,
    description,
    section = ""
}: Props){
    return(
    <div className="relative z-20">
        <div>
            {section && (
                <p className="mb-2 text-sm leading-6 font-semibold text-primary-500 dark:text-primary-400">
                    {section}
                </p>
            )}
            <div className="flex items-center">
                <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
                    {title}
                </h1>
            </div>
        </div>
        {description && (
            <p className="mt-2 text-lg text-slate-700 dark:text-slate-400">
                {description}
            </p>
        )}
    </div>
    );
}