/**
 * Required env vars (server-side only):
 *   WRAPPED_BASE_URL — base URL for the Wrapped backend (defaults to https://www.useabakus.com/wrapped)
 */

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import type { VerifyResult } from "@/types/wrapped";

const WRAPPED_BASE_URL =
	process.env.WRAPPED_BASE_URL ?? "https://www.useabakus.com/wrapped";

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
		return NextResponse.json({ ok: false, reason: "ERROR" }, { status: 502 });
	}
}
