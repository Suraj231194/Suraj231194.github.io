import React from 'react';
import { ArrowLeft } from 'lucide-react';
import SiteShell from './components/SiteShell';
import Projects from './components/Projects';
import Container from './components/ui/Container';
import { PROJECTS } from './constants';

// The projects page (/projects/): every case study, laid out exactly as the home page used to show
// them, with the filters and with every project open from the start.
function ProjectsPage() {
    return (
        <SiteShell page="projects">
            <div className="pt-20 sm:pt-24">
                <Container wide>
                    <a href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-pencil transition-colors hover:text-ink">
                        <ArrowLeft className="size-4" aria-hidden="true" />
                        Back to home
                    </a>
                </Container>
            </div>
            <Projects initialCount={PROJECTS.length} headingLevel={1} />
        </SiteShell>
    );
}

export default ProjectsPage;
