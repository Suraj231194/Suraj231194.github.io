import React, { useEffect, useRef, useState } from 'react';
import { Check, Copy, Mail, MessageSquare, User } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { SOCIAL_LINKS } from '../constants';
import SectionHeading from './SectionHeading';
import Assemble from './motion/Assemble';
import Container from './ui/Container';
import { buttonClasses } from './ui/buttonStyles';

const FIELD =
    'h-12 w-full rounded-md border border-rule bg-paper px-4 text-ink transition-colors placeholder:text-pencil/70 hover:border-ink/35 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 focus-visible:outline-none';

const WHATSAPP_URL = `https://wa.me/${SOCIAL_LINKS.whatsapp}`;

const CHANNELS = [
    { label: 'WhatsApp', value: '+91 88063 05038', href: WHATSAPP_URL },
    { label: 'LinkedIn', value: 'linkedin.com/in/surajpawar2311', href: SOCIAL_LINKS.linkedin },
    { label: 'GitHub', value: 'github.com/Suraj231194', href: SOCIAL_LINKS.github },
];

/** The form's fields as a ready-to-send WhatsApp message (*text* is bold in WhatsApp). */
const whatsappMessage = ({ name, email, subject, message }) =>
    [
        'Hello Suraj,',
        '',
        `I'm ${name} and I came across your portfolio.`,
        '',
        `*Subject:* ${subject}`,
        '',
        message,
        '',
        `*Email:* ${email}`,
        '_Sent from suraj231194.github.io_',
    ].join('\n');

const Contact = () => {
    const [copyState, setCopyState] = useState('idle');
    const [sent, setSent] = useState(false);
    const resetTimer = useRef(null);

    // The browser checks the required fields first; then WhatsApp opens in a new tab (the app on
    // phones) with the message filled in, ready to send. A blocked pop-up falls back to this tab.
    const sendOnWhatsApp = (event) => {
        event.preventDefault();
        const fields = Object.fromEntries(
            [...new FormData(event.currentTarget)].map(([key, value]) => [key, String(value).trim()])
        );
        const url = `${WHATSAPP_URL}?text=${encodeURIComponent(whatsappMessage(fields))}`;
        const opened = window.open(url, '_blank');
        if (opened) opened.opener = null;
        else window.location.href = url;
        setSent(true);
    };

    useEffect(() => () => window.clearTimeout(resetTimer.current), []);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(SOCIAL_LINKS.email);
            setCopyState('copied');
        } catch {
            setCopyState('failed');
        }
        window.clearTimeout(resetTimer.current);
        resetTimer.current = window.setTimeout(() => setCopyState('idle'), 2500);
    };

    return (
        <section id="contact" aria-labelledby="contact-title" className="screen night band-night py-16 sm:py-20 lg:py-24">
            <Container>
                <SectionHeading
                    id="contact-title"
                    title="Let's work together"
                    lead="I am available for full-time roles and selected freelance work. Send a message and I will get back to you as soon as possible."
                />

                <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
                    <Assemble from="left" className="lg:col-span-5">
                        <p className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                            Available for opportunities
                        </p>

                        <dl className="mt-6 border-t border-rule">
                            <div className="border-b border-rule py-4">
                                <dt className="text-sm text-pencil">Email</dt>
                                <dd className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                                    <a
                                        href={`mailto:${SOCIAL_LINKS.email}`}
                                        className="min-w-0 break-all font-medium text-ink underline decoration-rule decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
                                    >
                                        {SOCIAL_LINKS.email}
                                    </a>
                                    <button type="button" onClick={copyEmail} className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
                                        {copyState === 'copied' ? <Check className="text-emerald-600" aria-hidden="true" /> : <Copy aria-hidden="true" />}
                                        {copyState === 'copied' ? 'Copied' : 'Copy email'}
                                    </button>
                                </dd>
                            </div>
                            {CHANNELS.map((channel) => (
                                <div key={channel.label} className="border-b border-rule py-4">
                                    <dt className="text-sm text-pencil">{channel.label}</dt>
                                    <dd>
                                        <a
                                            href={channel.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${channel.label}: ${channel.value} (opens in a new tab)`}
                                            className="font-medium text-ink underline decoration-rule decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
                                        >
                                            {channel.value}
                                        </a>
                                    </dd>
                                </div>
                            ))}
                            <div className="border-b border-rule py-4">
                                <dt className="text-sm text-pencil">Based in</dt>
                                <dd className="font-medium text-ink">Pune, Maharashtra, India</dd>
                            </div>
                        </dl>
                        <p className="sr-only" role="status" aria-live="polite">
                            {copyState === 'copied' && 'Email address copied.'}
                            {copyState === 'failed' && `Copying did not work. The address is ${SOCIAL_LINKS.email}.`}
                        </p>
                        {copyState === 'failed' && (
                            <p className="mt-3 text-sm text-pencil" aria-hidden="true">
                                Copying did not work here. Select the address above instead.
                            </p>
                        )}
                    </Assemble>

                    <Assemble from="right" className="lg:col-span-7">
                        <form onSubmit={sendOnWhatsApp} className="spotlight rounded-lg border border-rule bg-sheet p-5 sm:p-8">
                            <h3 className="font-display text-2xl font-semibold text-ink">Send a message</h3>
                            <p className="mt-1.5 text-sm text-pencil">Your message opens in WhatsApp, ready to send.</p>

                            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-ink">Name</label>
                                    <div className="relative">
                                        <User className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-pencil" aria-hidden="true" />
                                        <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Your name" required className={`${FIELD} pl-10`} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-ink">Email</label>
                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-pencil" aria-hidden="true" />
                                        <input id="contact-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" required className={`${FIELD} pl-10`} />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5">
                                <label htmlFor="contact-subject" className="mb-2 block text-sm font-medium text-ink">Subject</label>
                                <input id="contact-subject" name="subject" type="text" placeholder="How can I help?" required className={FIELD} />
                            </div>

                            <div className="mt-5">
                                <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-ink">Message</label>
                                <div className="relative">
                                    <MessageSquare className="pointer-events-none absolute left-4 top-4 text-sm text-pencil" aria-hidden="true" />
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        rows="6"
                                        placeholder="Tell me about your project or opportunity..."
                                        required
                                        className={`${FIELD} h-auto resize-y py-3 pl-10`}
                                    />
                                </div>
                            </div>

                            <button type="submit" className={buttonClasses({ size: 'lg', className: 'mt-7 w-full sm:w-auto' })}>
                                <FaWhatsapp className="text-lg" aria-hidden="true" />
                                Send message
                            </button>
                            <p className="mt-3 min-h-5 text-sm text-pencil" role="status" aria-live="polite">
                                {sent && 'WhatsApp is open with your message. Press send there to deliver it.'}
                            </p>
                        </form>
                    </Assemble>
                </div>
            </Container>
        </section>
    );
};

export default Contact;
