import React from 'react';

const WIDTHS = {
    page: 'max-w-[88rem] lg:px-10',
    wide: 'max-w-[112rem] lg:px-10',
};

/**
 * The page column: one max width and one set of side gutters for every section, the first
 * screen's, wide enough for the name and the 3D scene side by side. `wide` spreads it nearly edge
 * to edge, for the projects shown two side by side.
 */
const Container = ({ as: Tag = 'div', wide = false, size, className = '', children, ...props }) => (
    <Tag className={`mx-auto w-full px-5 sm:px-8 ${WIDTHS[size ?? (wide ? 'wide' : 'page')]} ${className}`} {...props}>
        {children}
    </Tag>
);

export default Container;
