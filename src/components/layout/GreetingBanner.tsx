export function GreetingBanner() {
	return (
		<section className="border-b border-(--bdr) px-5 pb-3 pt-[14px] transition-colors duration-300">
			<div className="mira-eyebrow">Overview · Dec 2024</div>
			<h1 className="mt-1 text-[20px] font-extrabold leading-[1.15] tracking-[-0.03em]">
				Good evening, <span className="text-(--rose)">Vaishali</span> <span aria-hidden="true">👋</span>
			</h1>
			{/* <p className="mt-[3px] text-[11px] text-(--tx2)">65% through your ML curriculum — 3 sessions logged this week.</p> */}
		</section>
	)
}
