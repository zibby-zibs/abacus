import React from "react";

const ConversationalCard = () => {
	return (
		<div>
			<div className="flex flex-wrap gap-4 items-start">
				<div className="max-w-[300px] bg-[#0d1a12] rounded-lg overflow-hidden border border-white/0.05 shadow-[0_8px_40px_rgba(0,0,0,0.4)] transition-[transform_0.3s_cubic-bezier(0.22,1,0.36,1),box-shadow_0.3s_ease] cursor-default hover:translate-y-[-4px] hover:shadow-[0_20px_56px_rgba(0,0,0,0.5)]">
					<div className="bg-[#1a3a2e] p-3 flex items-center gap-2.5 border-b border-white/0.04">
						<div className="size-7 rounded-full bg-[linear-gradient(135deg,#f5c842,#c9a02e)] flex items-center justify-center text-[13px] text-[#0d1e17] font-serif">
							A
						</div>
						<div>
							<div className="text-[12px] font-semibold text-white">Abacus</div>
							<div className="text-[10px] text-white/40">● online</div>
						</div>
					</div>
					<div className="p-3 flex flex-col gap-1.5 bg-[#101a12]">
						<div className="max-w-[82%] p-2.5 rounded-lg text-[12.5px] leading-1.45 bg-[#1a3a2e] text-white/85 self-end">
							spent 4,500 at chicken republic
							<div className="text-[9px] text-white/25 text-right mt-1.5">
								10:41 ✓✓
							</div>
						</div>
						<div className="max-w-[82%] p-2.5 rounded-lg text-[12.5px] leading-1.45 bg-[#162b1f] text-white/80 border border-white/0.04 self-start">
							Got it — <span className="n">₦4,500</span> for Food.{" "}
							<span className="n">₦21,800</span> left in budget.
							<div className="t">10:41</div>
						</div>
						<div className="max-w-[82%] p-2.5 rounded-lg text-[12.5px] leading-1.45 bg-[#1a3a2e] text-white/85 self-end">
							emeka owes me 15k
							<div className="text-[9px] text-white/25 text-right mt-1.5">
								10:43 ✓✓
							</div>
						</div>
						<div className="max-w-[82%] p-2.5 rounded-lg text-[12.5px] leading-1.45 bg-[#162b1f] text-white/80 border border-white/0.04 self-start">
							Logged — Emeka owes you <span className="n">₦15,000</span>.
							<div className="text-[9px] text-white/25 text-right mt-1.5">
								10:43
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConversationalCard;
