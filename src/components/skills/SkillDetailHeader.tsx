type SkillDetailHeaderProps = {
    completedCount: number;
    progressPct: number;
};

export function SkillDetailHeader({ completedCount, progressPct }: SkillDetailHeaderProps) {
    return (
        <div className="mx-auto w-full max-w-[1480px] px-3 sm:px-5">
            <section className="mb-5 border-b border-(--bdr) pb-5 pt-3 sm:pt-4">
                <div className="mb-2 flex items-center gap-1.5 text-[10px] text-(--tx3)">
                    <a href="#" className="text-(--tx3) no-underline transition-colors hover:text-(--tx2)">Skills</a>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-40" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                    <span className="text-(--tx2)">Machine Learning</span>
                </div>

                <div className="flex items-end justify-between gap-4">
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                            <h1 className="text-[22px] font-extrabold leading-[1.1] tracking-[-0.03em] text-(--tx) sm:text-[24px]">Machine Learning</h1>
                            <span className="rounded-full bg-(--rose-dim) px-[9px] py-[3px] text-[10px] font-bold text-(--rose)">Active</span>
                        </div>

                        <span className="mt-2 block text-[11px] text-(--tx3)">
                            <span className="font-semibold text-(--tx2)">{completedCount}</span> of 12 topics complete
                        </span>
                    </div>

                    <div className="w-[150px] shrink-0 self-end">
                        <div className="flex w-full items-center gap-2">
                            <div className="h-1 flex-1 overflow-hidden rounded-full border border-(--bdr) bg-[color-mix(in_srgb,var(--card2),var(--tx)_8%)]">
                                <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--rose),#FF7BAA)] transition-[width] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]" style={{ width: `${progressPct}%` }} />
                            </div>
                            <span className="font-mono text-[11px] font-bold text-(--rose)">{progressPct}%</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
