import clsx from "clsx";
import React from "react";

interface Props {
    /**
     * CSS class names to be applied to the logo
     */
    className?: string;
};

/**
 * @returns An SVG react.js logo
 */
const ReactLogo = ({
    className = "w-auto h-8",
    ...props
}: Props) => {
    return( 
        <svg 
            viewBox="0 0 26 28" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={clsx('text-slate-400', className)}
            {...props}
        >
            <path d="M25.5 14C25.5 14.501 25.2379 15.0344 24.642 15.5763C24.046 16.1183 23.1556 16.6294 22.0129 17.0689C19.7309 17.9465 16.5445 18.5 13 18.5C9.45547 18.5 6.26908 17.9465 3.9871 17.0689C2.84444 16.6294 1.95405 16.1183 1.35799 15.5763C0.762077 15.0344 0.5 14.501 0.5 14C0.5 13.499 0.762077 12.9656 1.35799 12.4237C1.95405 11.8817 2.84444 11.3706 3.9871 10.9311C6.26908 10.0535 9.45547 9.5 13 9.5C16.5445 9.5 19.7309 10.0535 22.0129 10.9311C23.1556 11.3706 24.046 11.8817 24.642 12.4237C25.2379 12.9656 25.5 13.499 25.5 14Z" stroke="currentColor"/>
            <path d="M19.25 24.8252C18.8161 25.0757 18.2231 25.1155 17.4558 24.8703C16.6884 24.6251 15.8006 24.1096 14.8487 23.3397C12.9476 21.8023 10.8751 19.3196 9.10284 16.2499C7.33057 13.1803 6.21668 10.144 5.83579 7.72894C5.64507 6.51962 5.64246 5.49299 5.81383 4.70578C5.98516 3.91876 6.31606 3.4251 6.74995 3.17459C7.18385 2.92408 7.77682 2.88435 8.54406 3.12948C9.31149 3.37467 10.1993 3.89025 11.1512 4.66008C13.0523 6.19749 15.1248 8.68026 16.8971 11.7499C18.6693 14.8196 19.7832 17.8558 20.1641 20.2709C20.3548 21.4802 20.3574 22.5068 20.1861 23.294C20.0147 24.0811 19.6838 24.5747 19.25 24.8252Z" stroke="currentColor"/>
            <path d="M6.75007 24.8253C7.18397 25.0759 7.77695 25.1156 8.54419 24.8704C9.31162 24.6253 10.1994 24.1097 11.1513 23.3398C13.0524 21.8024 15.1249 19.3196 16.8972 16.25C18.6695 13.1803 19.7834 10.1441 20.1642 7.72896C20.355 6.51964 20.3576 5.493 20.1862 4.70579C20.0149 3.91877 19.684 3.4251 19.2501 3.17459C18.8162 2.92408 18.2232 2.88435 17.456 3.12949C16.6885 3.37468 15.8007 3.89026 14.8488 4.6601C12.9477 6.19752 10.8752 8.6803 9.10294 11.75C7.33067 14.8196 6.21679 17.8559 5.8359 20.271C5.64517 21.4803 5.64257 22.5069 5.81394 23.2941C5.98527 24.0812 6.31617 24.5748 6.75007 24.8253Z" stroke="currentColor"/>
            <path d="M14.5 14C14.5 14.8284 13.8284 15.5 13 15.5C12.1716 15.5 11.5 14.8284 11.5 14C11.5 13.1716 12.1716 12.5 13 12.5C13.8284 12.5 14.5 13.1716 14.5 14Z" stroke="currentColor"/>
        </svg>
    );
};

export default ReactLogo;