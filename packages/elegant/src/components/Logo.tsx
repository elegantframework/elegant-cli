import Image from "next/image";

interface Props {
    /**
     * CSS class names to be applied to the logo
     */
    className?: string;
    /**
     * The title of the logo to add to the alt tag.
     */
    title?: string;
};

export default function Logo({
    className="w-auto h-8",
    title="Elegant logo"
}: Props) {
    return(
        <>
            <Image
                className={className}
                src="/logo_dark.svg"
                alt={title}
                width={148}
                height={28}
                priority
            />
        </>
    );
}