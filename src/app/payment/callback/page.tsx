import { WHATSAPP_URL } from "@/components/landing/constants";
import { fetchPaymentActivationFromBackend } from "@/lib/paystack";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Payment — Abakus",
	robots: { index: false, follow: false },
};

export default async function PaystackCallbackPage({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
	const params = await searchParams;
	const rawRef = params.reference ?? params.trxref;
	const reference = (
		typeof rawRef === "string" ? rawRef : Array.isArray(rawRef) ? rawRef[0] : ""
	).trim();

	const result = await fetchPaymentActivationFromBackend(reference);

	const isSuccess = result.ok === true;
	const isMissingRef = !reference;
	const missingBackend =
		result.ok === false && result.code === "missing_backend_url";

	return (
		<div className="flex min-h-dvh flex-col items-center justify-center bg-offwhite px-6 py-16 text-ink dark:bg-background dark:text-foreground">
			<main className="w-full max-w-md rounded-2xl border border-neutral-300/90 bg-white p-8 shadow-lg dark:border-white/10 dark:bg-card">
				{isSuccess ? (
					<>
						<p className="mb-2 text-[11px] font-semibold tracking-widest text-gold-700 uppercase dark:text-gold-500/90">
							Payment successful
						</p>
						<h1 className="font-[family-name:var(--font-dm-serif-display),ui-serif,Georgia,serif] text-2xl leading-tight font-normal tracking-tight text-forest-900 dark:text-offwhite">
							{result.tier ? `${result.tier} is active` : "You're all set"}
						</h1>
						<p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-foreground-muted/85">
							{result.message}
						</p>
						<dl className="mt-4 space-y-2 border-t border-neutral-200/90 pt-4 text-xs dark:border-white/10">
							{result.tier ? (
								<div className="flex justify-between gap-4">
									<dt className="text-neutral-500 uppercase dark:text-foreground-muted/80">
										Tier
									</dt>
									<dd className="font-medium text-forest-900 dark:text-offwhite">
										{result.tier}
									</dd>
								</div>
							) : null}
							{result.activation ? (
								<div className="flex justify-between gap-4">
									<dt className="text-neutral-500 uppercase dark:text-foreground-muted/80">
										Activation
									</dt>
									<dd className="font-medium text-forest-900 dark:text-offwhite">
										{result.activation}
									</dd>
								</div>
							) : null}
							<div className="flex justify-between gap-4">
								<dt className="text-neutral-500 uppercase dark:text-foreground-muted/80">
									Reference
								</dt>
								<dd className="break-all font-mono text-[11px] text-neutral-700 dark:text-offwhite/85">
									{result.reference}
								</dd>
							</div>
						</dl>
					</>
				) : (
					<>
						<p className="mb-2 text-[11px] font-semibold tracking-widest text-red-700/90 uppercase dark:text-red-400/90">
							Payment didn&apos;t go through
						</p>
						<h1 className="font-[family-name:var(--font-dm-serif-display),ui-serif,Georgia,serif] text-2xl leading-tight font-normal tracking-tight text-forest-900 dark:text-offwhite">
							{isMissingRef
								? "Nothing to verify"
								: "We couldn&apos;t confirm this payment"}
						</h1>
						<p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-foreground-muted/85">
							{missingBackend
								? "This app is missing BACKEND_PAYSTACK_CALLBACK_URL. Set it to your backend URL (including /paystack/callback), then try again."
								: isMissingRef
									? "Paystack usually redirects with ?reference= or ?trxref=. Open the payment link from checkout again, or contact support."
									: (result.message ??
										"Something went wrong. You can try again or reach out on WhatsApp.")}
						</p>
						{reference && !missingBackend ? (
							<dl className="mt-4 space-y-2 border-t border-neutral-200/90 pt-4 text-xs dark:border-white/10">
								{result.tier ? (
									<div className="flex justify-between gap-4">
										<dt className="text-neutral-500 uppercase dark:text-foreground-muted/80">
											Tier
										</dt>
										<dd className="font-medium text-forest-900 dark:text-offwhite">
											{result.tier}
										</dd>
									</div>
								) : null}
								{result.activation ? (
									<div className="flex justify-between gap-4">
										<dt className="text-neutral-500 uppercase dark:text-foreground-muted/80">
											Activation
										</dt>
										<dd className="font-medium text-forest-900 dark:text-offwhite">
											{result.activation}
										</dd>
									</div>
								) : null}
								<div className="flex justify-between gap-4">
									<dt className="text-neutral-500 uppercase dark:text-foreground-muted/80">
										Reference
									</dt>
									<dd className="break-all font-mono text-[11px] text-neutral-700 dark:text-offwhite/85">
										{reference}
									</dd>
								</div>
							</dl>
						) : null}
					</>
				)}

				<div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
					<Link
						href="/"
						className="inline-flex flex-1 items-center justify-center rounded-xl border border-neutral-300/90 bg-forest-50 px-4 py-2.5 text-center text-sm font-semibold text-forest-900 transition-colors hover:bg-forest-100 dark:border-white/15 dark:bg-forest-900/40 dark:text-offwhite dark:hover:bg-forest-900/70"
					>
						Back home
					</Link>
					<a
						href={WHATSAPP_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex flex-1 items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
					>
						Help on WhatsApp
					</a>
				</div>
			</main>
		</div>
	);
}
