type Props = {
    children: React.ReactNode;
};

/**
 * A Card element.
 * @returns A pre-styled html card element.
 */
const Card = ({children}: Props) => {
    return(
        <div 
            className="text-center mb-20 flex max-w-2xl flex-col items-center p-8 px-4 md:p-8 text-black bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-0 shadow-md dark:shadow-[inset_0_0_0_1px_#ffffff1a]">
            {children}
        </div>
    );
};

export default Card;