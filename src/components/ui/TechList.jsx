import React from 'react';
import { getTechIcon } from '../../constants/techIcons';

/**
 * A row of technology chips. With `limit`, the rest collapse into one "+N more" chip; the full
 * list stays available to screen readers through the list's label.
 */
const TechList = ({ items, label, limit, className = '' }) => {
    const shown = limit ? items.slice(0, limit) : items;
    const hidden = items.length - shown.length;

    return (
        <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label={label}>
            {shown.map((tech) => (
                <li
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-full border border-rule bg-sheet px-2.5 py-1 text-[0.8125rem] font-medium leading-none text-ink/80"
                >
                    {getTechIcon(tech)}
                    {tech}
                </li>
            ))}
            {hidden > 0 && (
                <li
                    className="inline-flex items-center rounded-full border border-dashed border-rule px-2.5 py-1 text-[0.8125rem] font-medium leading-none text-pencil"
                    title={items.slice(shown.length).join(', ')}
                >
                    +{hidden} more
                </li>
            )}
        </ul>
    );
};

export default TechList;
