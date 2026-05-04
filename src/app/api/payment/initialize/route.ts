/**
 * Required env vars (server-side only):
 *   BACKEND_PAYMENT_INIT_URL  — full URL to your backend initializeTransaction endpoint
 *   LIGHT_PLAN_CODE           — Paystack plan code for the Light tier (e.g. PLN_xxxx)
 *   HEAVY_PLAN_CODE           — Paystack plan code for the Heavy tier
 */

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, planId, name, currency, timezone, income, budget, callbackUrl } = body as {
    email: string;
    planId: "light" | "heavy";
    name?: string;
    currency?: string;
    timezone?: string;
    income?: number;
    budget?: number;
    callbackUrl?: string;
  };

  if (!email || !planId) {
    return NextResponse.json(
      { ok: false, message: "email and planId are required" },
      { status: 400 },
    );
  }

  const planCode =
    planId === "light"
      ? process.env.LIGHT_PLAN_CODE
      : planId === "heavy"
        ? process.env.HEAVY_PLAN_CODE
        : null;

  if (!planCode) {
    return NextResponse.json(
      { ok: false, message: "Invalid plan or plan code not configured" },
      { status: 400 },
    );
  }

  const backendUrl = process.env.BACKEND_PAYMENT_INIT_URL?.trim();
  if (!backendUrl) {
    return NextResponse.json(
      { ok: false, message: "Payment service not configured" },
      { status: 500 },
    );
  }

  const reference = crypto.randomUUID().replace(/-/g, "");

  try {
    const { data } = await axios.post<{
      ok: boolean;
      authorizationUrl?: string;
      reference?: string;
      message?: string;
    }>(backendUrl, {
      email,
      planCode,
      reference,
      metadata: {
        name: name ?? "",
        currency: currency ?? "",
        timezone: timezone ?? "",
        income: income?.toString() ?? "",
        budget: budget?.toString() ?? "",
        source: "landing_page",
        planId,
      },
      callbackUrl,
    });

    if (data?.ok && data?.authorizationUrl) {
      return NextResponse.json({
        ok: true,
        authorizationUrl: data.authorizationUrl,
        reference: data.reference ?? reference,
      });
    }

    return NextResponse.json({
      ok: false,
      message: data?.message ?? "Payment initialization failed",
    });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status ?? 500;
      const message =
        (err.response?.data as { message?: string })?.message ?? err.message;
      return NextResponse.json({ ok: false, message }, { status });
    }
    return NextResponse.json({ ok: false, message: "Unexpected error" }, { status: 500 });
  }
}
