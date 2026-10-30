import React, { useId } from 'react';

/**
 * The SP monogram: the two letters drawn as one weight of rounded stroke, like a circuit trace,
 * with the S ending in a cyan node, on an electric-blue tile. public/favicon.svg is the
 * same drawing.
 */
const Logo = ({ className = '' }) => {
    const id = useId();

    return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
            <defs>
                <linearGradient id={`${id}-tile`} x1="3" y1="2" x2="37" y2="38" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#3B8BFF" />
                    <stop offset="0.62" stopColor="#1E5BEA" />
                    <stop offset="1" stopColor="#1640C4" />
                </linearGradient>
                <linearGradient id={`${id}-light`} x1="20" y1="0" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.32" />
                    <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
            </defs>
            <rect width="40" height="40" rx="11" fill={`url(#${id}-tile)`} />
            <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="10.25" fill={`url(#${id}-light)`} stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="1.5" />
            <g transform="translate(-0.75 0)" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18.5 12.5h-5a3.75 3.75 0 0 0 0 7.5h2a3.75 3.75 0 0 1 0 7.5h-5" />
                <path d="M23 27.5v-15h4.5a4.25 4.25 0 0 1 0 8.5H23" />
            </g>
            <circle cx="9.75" cy="27.5" r="2.4" fill="#22D3EE" />
        </svg>
    );
};

export default Logo;
