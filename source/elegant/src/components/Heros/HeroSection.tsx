interface Props {
    /**
     * The heading text of the hero.
     */
    heading: string;
    /**
     * Child html to be displayed inside the hero section.
     */
    children: React.ReactNode;
};

/**
 * A reusable hero section component that is pre styled, and perfect for splash and landing pages. 
 * @returns A hero section html element to be used on landing pages.
 */
export default function HeroSection({
    heading,
    children
}: Props) {
    return(
        <section className="relative mt-20 mb-20 sm:mt-32 md:mt-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h2 className="text-primary-500 dark:text-primary-400 text-xl tracking-tight font-bold sm:text-xl mb-10">
                    {heading}
                </h2>
                {children}
            </div>
        </section>
    );
};