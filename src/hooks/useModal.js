import { useEffect, useLayoutEffect, useRef } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Dialog behaviour shared by the mobile menu, the project details and the screenshot viewer.
 * While `open`: the page behind does not scroll, focus moves inside `containerRef`
 * (to `initialFocusRef` when given), Tab and Shift+Tab stay inside it, and Escape calls `onClose`.
 * Other keys go to `onKeyDown` (the screenshot viewer uses the arrow keys).
 */
const useModal = ({ open, onClose, containerRef, initialFocusRef, onKeyDown }) => {
    // The latest callbacks, so the effect does not re-run (and move focus) on every render.
    const handlers = useRef({ onClose, onKeyDown });
    useLayoutEffect(() => {
        handlers.current = { onClose, onKeyDown };
    });

    useEffect(() => {
        if (!open) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const focusTimer = window.setTimeout(() => {
            const target = initialFocusRef?.current ?? containerRef.current?.querySelector(FOCUSABLE);
            target?.focus();
        }, 0);

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                handlers.current.onClose?.();
                return;
            }

            if (event.key === 'Tab') {
                const container = containerRef.current;
                const items = container
                    ? [...container.querySelectorAll(FOCUSABLE)].filter((element) => element.getClientRects().length > 0)
                    : [];
                if (items.length === 0) return;

                const first = items[0];
                const last = items[items.length - 1];
                const outside = !container.contains(document.activeElement);

                if (event.shiftKey && (document.activeElement === first || outside)) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && (document.activeElement === last || outside)) {
                    event.preventDefault();
                    first.focus();
                }
                return;
            }

            handlers.current.onKeyDown?.(event);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.clearTimeout(focusTimer);
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, containerRef, initialFocusRef]);
};

export default useModal;
