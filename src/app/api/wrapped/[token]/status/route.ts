/**
 * Env vars (server-side only):
 *   WRAPPED_BASE_URL — base URL for the Wrapped backend.
 *     Defaults to `${NEXT_PUBLIC_API_BASE_URL}/wrapped` — the same backend
 *     the rest of the app talks to (see src/lib/api.ts), not the marketing site.
 */

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const WRAPPED_BASE_URL =
	process.env.WRAPPED_BASE_URL ?? `${process.env.NEXT_PUBLIC_API_BASE_URL}/wrapped`;

export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ token: string }> },
) {
	const { token } = await params;

	try {
		const { data } = await axios.get<{ valid: boolean; locked: boolean }>(
			`${WRAPPED_BASE_URL}/${token}/status`,
		);
		return NextResponse.json(data);
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			return NextResponse.json(err.response.data, {
				status: err.response.status,
			});
		}
		console.error("[wrapped/status] failed to reach backend:", err);
		return NextResponse.json(
			{ valid: false, locked: false },
			{ status: 502 },
		);
	}
}
