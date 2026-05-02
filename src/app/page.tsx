import { LandingPage } from "@/components/landing/LandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Abacus — Know your money.",
  description:
    "Your expenses, budgets, and debts — tracked entirely inside WhatsApp. No app. No dashboard. Just talk.",
};

export default function Home() {
  return <LandingPage />;
}
