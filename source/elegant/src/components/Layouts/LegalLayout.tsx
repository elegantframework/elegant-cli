interface Props {
    /**
     * HTML child elements that can be passed to the component.
     */
    children: React.ReactNode;
};
/**
 * The layout component to be used for legal pages.
 * @returns An outer parent html component to be used for legal pages.
 */
const LegalLayout = ({
    children
}: Props) => {
    return (
        <main className="max-w-3xl mx-auto relative z-20 pt-10 pb-20 sm:pb-10 px-6 sm:px-8 md:px-10">
          {children}
        </main>
    );
};

export default LegalLayout;