import Image from "next/image";

export default function Logo() {
    return(
        <>
            <Image
                className="dark:invert"
                src="/logo_dark.svg"
                alt="Next.js logo"
                width={148}
                height={28}
                priority
            />
        </>
    );
}