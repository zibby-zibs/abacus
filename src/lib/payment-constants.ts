/**
 * Public payment routes — safe to import from client or server.
 *
 * - Paystack `callback_url` → `absolutePaystackCallbackUrl(origin)` from
 *   `@/lib/paystack` (browser lands on this path).
 * - Server-side confirmation → `BACKEND_PAYSTACK_CALLBACK_URL` in env (full URL
 *   to your API, e.g. `https://api.example.com/paystack/callback`).
 */
export const PAYSTACK_CALLBACK_PATH = "/payment/callback" as const;
