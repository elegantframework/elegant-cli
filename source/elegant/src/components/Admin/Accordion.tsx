import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

export interface AccordionProps {
    title: string;
    callback?: () => void;
    children: React.ReactNode;
    error?: boolean;
    expand?: boolean;
};

export default function Accordion({
    title,
    callback,
    children,
    error = false,
    expand = false
}: AccordionProps) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(expand)
    }, [expand]);

    const handleShow = () => {
        setShow(!show);

        if (callback) {
            callback();
        }
    };

    return(
        <div className="w-full border-b first:border-t">
            <h2 id="accordion-collapse-heading-1 bg-red-50 ">
                <button
                    type="button"
                    className={`flex items-center justify-between w-full text-sm font-medium text-gray-900 p-4 hover:bg-gray-50 focus:outline-none focus:outline-indigo-300 focus:outline-offset-[-1px] ${
                    error ? 'bg-red-50' : ''
                    }`}
                    onClick={handleShow}
                >
                    <span className="capitalize">{title}</span>
                    <PlusIcon className={`w-6 h-6 shrink-0 ${show ? 'rotate-45' : ''}`}/>
                </button>
            </h2>
            <div className={show ? 'block' : 'hidden'}>
                <div className="p-4 font-light border-gray-200 border-t">
                    {children}
                </div>
            </div>
        </div>
    );
}