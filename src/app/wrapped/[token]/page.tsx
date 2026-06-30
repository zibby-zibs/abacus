import type { Metadata } from "next";
import { WrappedGate } from "@/components/wrapped/WrappedGate";

export const metadata: Metadata = {
	title: "Abakus Wrapped",
	description: "Your month, wrapped.",
	robots: { index: false, follow: false },
};

export default async function Page({
	params,
}: {
	params: Promise<{ token: string }>;
}) {
	const { token } = await params;
	return <WrappedGate token={token} />;
}
