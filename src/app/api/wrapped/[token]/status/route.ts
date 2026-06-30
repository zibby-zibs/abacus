/**
 * Required env vars (server-side only):
 *   WRAPPED_BASE_URL — base URL for the Wrapped backend (defaults to https://www.useabakus.com/wrapped)
 */

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const WRAPPED_BASE_URL =
	process.env.WRAPPED_BASE_URL ?? "https://www.useabakus.com/wrapped";

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
		return NextResponse.json(
			{ valid: false, locked: false },
			{ status: 502 },
		);
	}
}
