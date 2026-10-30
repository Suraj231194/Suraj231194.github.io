// One set of button styles for links and buttons alike, so every call to action looks and
// behaves the same. The gradient (primary) is reserved for the main action in a group: aqua, cyan
// into teal with navy text, a soft glow, and a band of light that sweeps across on hover. Secondary is
// quiet glass that reads on light sections and on the midnight bands alike.

const BASE =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:translate-y-0 active:scale-[0.98]';

const SIZES = {
    sm: 'min-h-10 px-3.5 py-2 text-sm',
    md: 'min-h-11 px-5 py-2.5 text-[0.95rem]',
    lg: 'min-h-12 px-6 py-3 text-base',
};

const VARIANTS = {
    primary:
        'sheen relative overflow-hidden bg-[linear-gradient(100deg,rgb(var(--cta-from)),rgb(var(--cta-to)))] text-on-cta shadow-[inset_0_1px_0_rgb(255_255_255/0.4),0_10px_28px_-10px_rgb(var(--cta-from)/0.7)] hover:-translate-y-px hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_16px_36px_-10px_rgb(var(--cta-to)/0.8)]',
    secondary:
        'border border-ink/15 bg-sheet/60 text-ink backdrop-blur-sm hover:-translate-y-px hover:border-accent/60 hover:bg-sheet/90 hover:shadow-[0_10px_26px_-14px_rgb(var(--accent)/0.6)]',
    ghost: 'text-ink hover:bg-ink/5',
};

export const buttonClasses = ({ variant = 'primary', size = 'md', className = '' } = {}) =>
    `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
