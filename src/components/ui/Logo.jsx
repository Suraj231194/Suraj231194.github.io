import React, { useId } from 'react';

/**
 * The SP monogram: a geometric S (two true arcs) and a P drawn at the same stroke weight, in white
 * on a blue-to-cyan tile, closed by a cyan full stop that fills the corner under the P's bowl.
 * public/favicon.svg is the same drawing.
 */
const Logo = ({ className = '' }) => {
    const id = useId();

    return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
            <defs>
                <linearGradient id={`${id}-tile`} x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#1D4ED8" />
                    <stop offset="0.55" stopColor="#2563EB" />
                    <stop offset="1" stopColor="#06B6D4" />
                </linearGradient>
                <linearGradient id={`${id}-sheen`} x1="20" y1="0" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.22" />
                    <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
            </defs>
            <rect width="40" height="40" rx="11" fill={`url(#${id}-tile)`} />
            <rect x="0.5" y="0.5" width="39" height="39" rx="10.5" fill={`url(#${id}-sheen)`} stroke="#FFFFFF" strokeOpacity="0.18" />
            <g transform="translate(-1 0)" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.77 12.76A4.6 4.6 0 1 0 14 20A4.6 4.6 0 1 1 10.23 27.24" />
                <path d="M25 29.2V10.8H28.2A4.6 4.6 0 0 1 28.2 20H25" />
            </g>
            <circle cx="30.9" cy="27.2" r="2" fill="#A5F3FC" />
        </svg>
    );
};

export default Logo;
