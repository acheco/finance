const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

/**
 * Shares the browser's IANA timezone with the backend via a cookie, so
 * "current month" calculations (e.g. budgets) reflect the user's local
 * date instead of the server's.
 */
export function initializeTimezone(): void {
    if (typeof Intl === 'undefined') {
        return;
    }

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (timezone) {
        setCookie('timezone', timezone);
    }
}
