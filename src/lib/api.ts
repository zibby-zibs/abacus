import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

if (!API_BASE_URL && typeof window !== "undefined") {
	// eslint-disable-next-line no-console
	console.warn(
		"[api] NEXT_PUBLIC_API_BASE_URL is not set. Requests will hit the current origin.",
	);
}

export const AUTH_TOKEN_STORAGE_KEY = "abakus-auth-token";

export function getAuthToken(): string | null {
	if (typeof window === "undefined") return null;
	try {
		return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
	} catch {
		return null;
	}
}

export function setAuthToken(token: string | null) {
	if (typeof window === "undefined") return;
	try {
		if (token) window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
		else window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
	} catch {
		/* ignore */
	}
}

export const api = axios.create({
	baseURL: API_BASE_URL,
	headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
	const token = getAuthToken();
	if (token) {
		config.headers = config.headers ?? {};
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
