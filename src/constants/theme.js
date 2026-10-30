// The site follows the visitor's clock: dark from 7 PM until 8 AM, light through the day.
// index.html applies the same rule before the first paint; keep the two in step.
export const DARK_FROM = 19;
export const LIGHT_FROM = 8;

export const themeForTime = (date = new Date()) => {
    const hour = date.getHours();
    return hour >= DARK_FROM || hour < LIGHT_FROM ? 'dark' : 'light';
};

// Milliseconds from `date` until the next switch, at LIGHT_FROM or DARK_FROM o'clock.
export const msUntilNextSwitch = (date = new Date()) => {
    const next = new Date(date);
    const hour = date.getHours();
    if (hour >= DARK_FROM) next.setDate(next.getDate() + 1);
    next.setHours(hour >= LIGHT_FROM && hour < DARK_FROM ? DARK_FROM : LIGHT_FROM, 0, 0, 0);
    return next - date;
};

// 19 -> "7 PM", 8 -> "8 AM".
export const formatHour = (hour) => `${hour % 12 || 12} ${hour < 12 ? 'AM' : 'PM'}`;
