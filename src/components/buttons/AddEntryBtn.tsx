type AddEntryBtnProps = {
	compact?: boolean
	onClick?: () => void
}

export function AddEntryBtn({ onClick }: AddEntryBtnProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`
                mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-[6px] rounded-[8px] border border-dashed border-(--bdr2) bg-(--card2) px-3 py-[7px] text-[11px] text-(--tx3) transition-all duration-200 hover:border-(--rose) hover:bg-[color-mix(in_srgb,var(--card2),var(--tx)_4%)] hover:text-(--tx2)
			`}
		>
			<svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
				<path d="M7 2v10M2 7h10" />
			</svg>
			Add Entry
		</button>
	)
}
