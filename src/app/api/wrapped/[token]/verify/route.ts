/**
 * Env vars (server-side only):
 *   WRAPPED_BASE_URL — base URL for the Wrapped backend.
 *     Defaults to `${NEXT_PUBLIC_API_BASE_URL}/wrapped` — the same backend
 *     the rest of the app talks to (see src/lib/api.ts), not the marketing site.
 */

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import type { VerifyResult } from "@/types/wrapped";

const WRAPPED_BASE_URL =
	process.env.WRAPPED_BASE_URL ?? `${process.env.NEXT_PUBLIC_API_BASE_URL}/wrapped`;

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ token: string }> },
) {
	const { token } = await params;
	const { phoneNumber } = (await req.json()) as { phoneNumber?: string };

	if (!phoneNumber) {
		return NextResponse.json(
			{ ok: false, reason: "MISMATCH", attemptsRemaining: 0 },
			{ status: 400 },
		);
	}

	try {
		const { data } = await axios.post<VerifyResult>(
			`${WRAPPED_BASE_URL}/${token}/verify`,
			{ phoneNumber },
		);
		return NextResponse.json(data);
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			return NextResponse.json(err.response.data, {
				status: err.response.status,
			});
		}
		console.error("[wrapped/verify] failed to reach backend:", err);
		return NextResponse.json({ ok: false, reason: "ERROR" }, { status: 502 });
	}
}
