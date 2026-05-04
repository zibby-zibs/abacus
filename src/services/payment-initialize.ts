import axios from "axios";

export type PlanId = "light" | "heavy";

export interface InitializePaymentParams {
  email: string;
  planId: PlanId;
  name: string;
  currency: string;
  timezone: string;
  income: number;
  budget: number;
  callbackUrl?: string;
}

export type InitializePaymentResult =
  | { ok: true; authorizationUrl: string; reference: string }
  | { ok: false; message: string };

export async function initializePayment(
  params: InitializePaymentParams,
): Promise<InitializePaymentResult> {
  try {
    const { data } = await axios.post<InitializePaymentResult>(
      "/api/payment/initialize",
      params,
    );
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const message =
        (err.response?.data as { message?: string })?.message ?? err.message;
      return { ok: false, message };
    }
    return { ok: false, message: "Unexpected error. Please try again." };
  }
}
