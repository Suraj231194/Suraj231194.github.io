import React from 'react';
import { FOOTER_TEXT, SOCIAL_LINKS } from '../constants';
import Container from './ui/Container';

const LINKS = [
    { label: 'GitHub', href: SOCIAL_LINKS.github, external: true },
    { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, external: true },
    { label: 'Email', href: `mailto:${SOCIAL_LINKS.email}`, external: false },
    { label: 'Back to top', href: '#home', external: false },
];

const Footer = () => (
    <footer className="night relative z-[1] border-t border-rule bg-paper">
        <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p className="font-display text-lg font-semibold text-ink">Suraj Pawar</p>
                <p className="text-sm text-pencil">{FOOTER_TEXT}</p>
            </div>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                {LINKS.map((link) => (
                    <li key={link.label}>
                        <a
                            href={link.href}
                            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${link.label} (opens in a new tab)` } : {})}
                            className="inline-flex min-h-11 items-center font-medium text-pencil transition-colors hover:text-ink"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </Container>
    </footer>
);

export default Footer;
