import React from 'react';

export const getHostname = (url) => {
    try {
        return new URL(url).hostname;
    } catch {
        return '';
    }
};

/** A plain browser window around a screenshot, with the site's address in the bar. */
const BrowserFrame = ({ url, children, className = '' }) => {
    const hostname = getHostname(url);

    return (
        <div className={`overflow-hidden rounded-lg border border-rule bg-sheet ${className}`}>
            <div className="flex h-8 items-center gap-1.5 border-b border-rule bg-paper px-3" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-rule" />
                <span className="h-2 w-2 rounded-full bg-rule" />
                <span className="h-2 w-2 rounded-full bg-rule" />
                {hostname && (
                    <span className="mx-auto min-w-0 max-w-[60%] truncate rounded-full bg-sheet px-3 text-[0.6875rem] leading-5 text-pencil">
                        {hostname}
                    </span>
                )}
                <span className="w-[1.875rem]" />
            </div>
            <div className="relative">{children}</div>
        </div>
    );
};

export default BrowserFrame;
