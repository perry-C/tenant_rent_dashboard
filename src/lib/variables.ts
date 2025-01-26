export const ENV = process.env.NODE_ENV;

export const CHROMIUM_EXECUTABLE_PATH =
    'https://github.com/Sparticuz/chromium/releases/download/v122.0.0/chromium-v122.0.0-pack.tar';

export const TAILWIND_CDN =
    'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';

export const GENERATE_PDF_API = '/api/invoice/generate';

/**
 * Form date options
 */
export const FULL_DATE: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

export const YEAR_MONTH: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
};
