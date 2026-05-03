/**
 * Payment confirmation via your backend (not Paystack directly).
 *
 * Set `BACKEND_PAYSTACK_CALLBACK_URL` to the full URL of your exposed handler,
 * e.g. `https://api.yourdomain.com/paystack/callback`
 *
 * The Next.js page `/payment/callback` calls it with GET `?reference=...`
 * (same `reference` / `trxref` Paystack appends when redirecting users here).
 */

import { PAYSTACK_CALLBACK_PATH } from "./payment-constants";

/** JSON shape your backend returns after verifying Paystack / applying access. */
export type PaymentActivationPayload = {
	ok: boolean;
	reference?: string;
	tier?: string;
	activation?: string;
	message?: string;
};

export type PaymentActivationResult =
	| {
			ok: true;
			reference: string;
			tier: string;
			activation: string;
			message: string;
	  }
	| {
			ok: false;
			code:
				| "missing_backend_url"
				| "missing_reference"
				| "http_error"
				| "invalid_json"
				| "backend_declined";
			reference?: string;
			tier?: string;
			activation?: string;
			message?: string;
	  };

function parseBackendJson(
	raw: unknown,
	fallbackReference: string,
): PaymentActivationResult {
	if (!raw || typeof raw !== "object") {
		return { ok: false, code: "invalid_json" };
	}

	const o = raw as Record<string, unknown>;
	const ok = o.ok === true;
	const reference =
		typeof o.reference === "string" && o.reference.trim()
			? o.reference.trim()
			: fallbackReference;
	const tier = typeof o.tier === "string" ? o.tier : "";
	const activation = typeof o.activation === "string" ? o.activation : "";
	const message =
		typeof o.message === "string" && o.message.trim()
			? o.message.trim()
			: ok
				? "Payment confirmed."
				: "Payment could not be confirmed.";

	if (ok) {
		return {
			ok: true,
			reference,
			tier,
			activation,
			message,
		};
	}

	return {
		ok: false,
		code: "backend_declined",
		reference: reference || undefined,
		tier: tier || undefined,
		activation: activation || undefined,
		message,
	};
}

/**
 * Calls your backend to confirm the payment and apply subscription / access.
 * Expects GET `BACKEND_PAYSTACK_CALLBACK_URL?reference=...` to return JSON
 * like `{ ok, reference, tier, activation, message }`.
 */
export async function fetchPaymentActivationFromBackend(
	reference: string,
): Promise<PaymentActivationResult> {
	const base = process.env.BACKEND_PAYSTACK_CALLBACK_URL?.trim();
	if (!base) {
		return { ok: false, code: "missing_backend_url" };
	}

	const ref = reference.trim();
	if (!ref) {
		return { ok: false, code: "missing_reference" };
	}

	const url = new URL(base);
	url.searchParams.set("reference", ref);

	const res = await fetch(url.toString(), {
		method: "GET",
		headers: { Accept: "application/json" },
		cache: "no-store",
	});

	let raw: unknown;
	try {
		raw = await res.json();
	} catch {
		return {
			ok: false,
			code: "invalid_json",
			message: "Response was not valid JSON",
		};
	}

	const parsed = parseBackendJson(raw, ref);

	if (!res.ok) {
		if (parsed.ok) {
			return {
				ok: false,
				code: "http_error",
				message: `HTTP ${res.status} ${res.statusText}`,
				reference: ref,
			};
		}
		if (parsed.code === "backend_declined") {
			return parsed;
		}
		return {
			ok: false,
			code: "http_error",
			message: parsed.message ?? `HTTP ${res.status} ${res.statusText}`,
			reference: ref,
		};
	}

	return parsed;
}

/**
 * Absolute URL for Paystack’s `callback_url` (this Next app), so users land on
 * `/payment/callback` and this app then calls `BACKEND_PAYSTACK_CALLBACK_URL`.
 */
export function absolutePaystackCallbackUrl(origin: string): string {
	const base = origin.replace(/\/$/, "");
	return `${base}${PAYSTACK_CALLBACK_PATH}`;
}
