import React from 'react';

/** A list with small square markers. `marker` is the marker's colour class (orange marks my own work). */
const BulletList = ({ items, marker = 'bg-pencil', className = 'mt-4 space-y-3' }) => (
    <ul className={className}>
        {items.map((item) => (
            <li key={item} className="relative pl-5 text-[0.95rem] leading-relaxed text-ink/85 sm:text-base">
                <span className={`absolute left-0 top-[0.62em] h-1.5 w-1.5 ${marker}`} aria-hidden="true" />
                {item}
            </li>
        ))}
    </ul>
);

export default BulletList;
