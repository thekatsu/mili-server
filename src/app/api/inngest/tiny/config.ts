export const REQUESTS_PER_MINUTE = 30;
export const PARALLEL_REQUESTS = Math.floor(REQUESTS_PER_MINUTE * (1 / 4));
export const SCOPE = 'account';
export const CONCURRENCY_KEY = 'tiny';
export const THROTTLE_KEY = CONCURRENCY_KEY;
