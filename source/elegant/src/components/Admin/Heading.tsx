import { PlusIcon } from "lucide-react";
import Link from "next/link";

export interface HeadingProps {
    title: string;
    children?: React.ReactNode;
};

export default function Heading({
    title,
    children
}: HeadingProps) {
    return(
        <div className="mt-8 flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
            <div className="flex items-center gap-x-6">
                <h2 className="text-lg capitalize font-semibold leading-7 text-gray-900">
                    {title}
                </h2>
            </div>
            {children}
        </div>
    );
}