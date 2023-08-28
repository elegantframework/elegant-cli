import clsx from "clsx";

type Props = {
    /**
     * Html that can be passed directly to the card component.
     */
    children: React.ReactNode;
    /**
     * Custom css classes that can be applied directly to the card.
     */
    className?: string;
    /**
     * Custom padding css classes that can be applied to the card.
     */
    padding?: string;
};

/**
 * A Card element.
 * @returns A pre-styled html card element.
 */
const Card = ({
    children,
    className,
    padding = "p-8 px-4 md:p-8"
}: Props) => {
    return(
        <div
            className={clsx(
                "text-center mb-20 flex max-w-2xl flex-col items-center text-black bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-0 shadow-md dark:shadow-[inset_0_0_0_1px_#ffffff1a]",
                className,
                padding
            )}
        >
            {children}
        </div>
    );
};

export default Card;