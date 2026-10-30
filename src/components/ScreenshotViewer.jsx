import React, { useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { EASE } from '../constants/motion';
import useModal from '../hooks/useModal';

/**
 * Full-size screenshot viewer. Arrow keys and the side buttons step through the set, Escape or
 * the close button returns focus to the screenshot that opened it.
 */
const ScreenshotViewer = ({ title, screenshots, index, onChange, onClose }) => {
    const reduceMotion = useReducedMotion();
    const dialogRef = useRef(null);
    const closeRef = useRef(null);
    const open = index !== null;
    const count = screenshots.length;
    const step = (direction) => onChange((current) => (current + direction + count) % count);

    useModal({
        open,
        onClose,
        containerRef: dialogRef,
        initialFocusRef: closeRef,
        onKeyDown: (event) => {
            if (event.key === 'ArrowRight') step(1);
            if (event.key === 'ArrowLeft') step(-1);
        },
    });

    const shot = open ? screenshots[index] : null;

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[120] flex items-center justify-center bg-[#08111c]/90 p-3 backdrop-blur-sm sm:p-8"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) onClose();
                    }}
                >
                    <motion.div
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${title} screenshots`}
                        className="relative flex w-full max-w-6xl flex-col"
                        initial={reduceMotion ? false : { scale: 0.97, y: 12 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.98, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
                    >
                        <div className="mb-3 flex items-center justify-between gap-4 text-white">
                            <p className="text-sm text-white/75" aria-live="polite">
                                {index + 1} of {count}: {shot.caption}
                            </p>
                            <button
                                ref={closeRef}
                                type="button"
                                onClick={onClose}
                                aria-label="Close screenshots"
                                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/20 text-white transition-colors hover:bg-white/10"
                            >
                                <X aria-hidden="true" />
                            </button>
                        </div>

                        <div className="relative overflow-hidden rounded-lg border border-white/15 bg-black">
                            <AnimatePresence initial={false} mode="popLayout">
                                <motion.img
                                    key={shot.full}
                                    src={shot.full}
                                    alt={shot.alt}
                                    width="1440"
                                    height="900"
                                    decoding="async"
                                    className="block aspect-[16/10] max-h-[78svh] w-full object-contain"
                                    initial={reduceMotion ? false : { opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: reduceMotion ? 0 : 0.25 }}
                                />
                            </AnimatePresence>
                        </div>

                        {count > 1 && (
                            <div className="mt-3 flex justify-center gap-2 sm:pointer-events-none sm:absolute sm:inset-x-0 sm:top-[calc(50%+1.75rem)] sm:mt-0 sm:-translate-y-1/2 sm:justify-between sm:px-3">
                                <button
                                    type="button"
                                    onClick={() => step(-1)}
                                    aria-label="Previous screenshot"
                                    className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-md bg-black/60 text-white transition-colors hover:bg-black/80"
                                >
                                    <ChevronLeft aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => step(1)}
                                    aria-label="Next screenshot"
                                    className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-md bg-black/60 text-white transition-colors hover:bg-black/80"
                                >
                                    <ChevronRight aria-hidden="true" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScreenshotViewer;
