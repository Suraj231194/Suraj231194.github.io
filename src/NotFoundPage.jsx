import React from 'react';
import { ArrowRight, House } from 'lucide-react';
import SiteShell from './components/SiteShell';
import Container from './components/ui/Container';
import { buttonClasses } from './components/ui/buttonStyles';
import { PROJECTS, PROJECTS_PAGE } from './constants';

// The page GitHub Pages shows for an address that does not exist (404.html): the same navigation
// and footer as the rest of the site, and the two ways back in.
function NotFoundPage() {
    return (
        <SiteShell page="not-found">
            <section aria-labelledby="not-found-title" className="wash flex min-h-[75svh] items-center pb-16 pt-28 sm:pt-32">
                <Container>
                    <p className="font-display text-[clamp(4.5rem,3rem+8vw,9rem)] font-bold leading-none tracking-[-0.04em] text-gradient">404</p>
                    <h1 id="not-found-title" className="mt-4 font-display text-[clamp(2rem,1.5rem+2vw,3rem)] font-semibold leading-tight text-ink">
                        This page does not exist
                    </h1>
                    <p className="mt-4 max-w-[34rem] text-lg leading-relaxed text-pencil">
                        The link may be out of date, or the address mistyped. The home page and all {PROJECTS.length} projects are one
                        click away.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <a href="/" className={buttonClasses({ size: 'lg' })}>
                            <House aria-hidden="true" />
                            Go to the home page
                        </a>
                        <a href={PROJECTS_PAGE} className={buttonClasses({ variant: 'secondary', size: 'lg', className: 'group' })}>
                            See all projects
                            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                        </a>
                    </div>
                </Container>
            </section>
        </SiteShell>
    );
}

export default NotFoundPage;
