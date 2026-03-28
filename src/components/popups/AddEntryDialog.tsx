import { useAddEntryDialog } from "@/hooks/use-add-entry-dialog"
import { ArrowRight, Layers, X } from "lucide-react"

type AddEntryDialogProps = {
	dialog: ReturnType<typeof useAddEntryDialog>
}

type PillGroupProps<T extends string> = {
	values: readonly T[]
	selected: T
	onSelect: (value: T) => void
}

function PillGroup<T extends string>({ values, selected, onSelect }: PillGroupProps<T>) {
	return (
		<div className="flex flex-wrap gap-[6px]">
			{values.map((value) => (
				<button
					key={value}
					type="button"
					onClick={() => onSelect(value)}
					className={`cursor-pointer rounded-full border-[1.5px] px-3 py-[5px] text-[11px] transition-colors ${selected === value ? "border-(--rose) bg-(--rose-dim) font-bold text-(--rose)" : "border-(--bdr2) bg-(--card2) text-(--tx2) hover:border-(--rose) hover:text-(--rose)"}`}
				>
					{value}
				</button>
			))}
		</div>
	)
}

export function AddEntryDialog({ dialog }: AddEntryDialogProps) {
	const {
		isOpen,
		close,
		submit,
		isSkillTopicLocked,
		lockedSkillLabel,
		lockedTopicLabel,
		skillId,
		topicId,
		learned,
		// why,
		tone,
		postStyle,
		skills,
		topicOptions,
		tones,
		styles,
		onSkillChange,
		setTopicId,
		setLearned,
		// setWhy,
		setTone,
		setPostStyle,
	} = dialog

	return (
		<div
			className={`fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(8,8,8,0.42)] p-5 backdrop-blur-[6px] transition-opacity duration-200 ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
			onClick={(event) => {
				if (event.target === event.currentTarget) {
					close()
				}
			}}
		>
			<div
				className={`max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-[14px] border border-(--bdr2) shadow-[0_14px_30px_rgba(0,0,0,0.24),0_0_18px_color-mix(in_srgb,var(--rose),transparent_82%)] backdrop-blur-[2px] transition-transform duration-200 ${isOpen ? "translate-y-0 scale-100" : "translate-y-[14px] scale-[0.97]"}`}
				style={{
					background:
						"radial-gradient(ellipse 80% 80% at 5% 95%, var(--rose-dim) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 95% 8%, rgba(255,255,255,0.03) 0%, transparent 50%), var(--card)",
				}}
			>
				<div className="flex items-start justify-between gap-3 border-b border-(--bdr) px-[18px] pb-[14px] pt-[18px]">
					<div>
						<div className="mb-1 text-[9px] font-bold uppercase tracking-[0.09em] text-(--tx3)">Learning Journal</div>
						<h2 className="text-[16px] font-extrabold tracking-[-0.02em] text-(--tx)">Add Entry</h2>
						<p className="mt-[3px] text-[11px] text-(--tx3)">Log what you learned and generate an X post</p>
					</div>
					<button
						type="button"
						onClick={close}
						aria-label="Close popup"
						className="grid h-7 w-7 cursor-pointer place-items-center rounded-[8px] border border-(--bdr) bg-(--card2) text-(--tx3) transition-colors hover:bg-(--bdr2) hover:text-(--tx)"
					>
						<X size={12} strokeWidth={2.5} />
					</button>
				</div>

				<div className="px-[18px] py-[18px]">
					<div className="mb-[14px] grid gap-[10px] sm:grid-cols-2">
						<div>
							<label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-(--tx3)">Skill</label>
							{isSkillTopicLocked ? (
								<input
									value={lockedSkillLabel}
									readOnly
									className="w-full cursor-not-allowed rounded-[8px] border border-(--bdr2) bg-(--card2) px-3 py-[9px] text-[13px] text-(--tx2) outline-none"
								/>
							) : (
								<select
									value={skillId}
									onChange={(event) => onSkillChange(event.target.value)}
									className="w-full cursor-pointer rounded-[8px] border border-(--bdr2) bg-(--card2) px-3 py-[9px] text-[13px] text-(--tx) outline-none transition-[border-color,box-shadow] focus:border-(--rose) focus:shadow-[0_0_0_3px_var(--rose-dim)]"
								>
									{skills.map((skill) => (
										<option key={skill.id} value={skill.id}>
											{skill.label}
										</option>
									))}
								</select>
							)}
						</div>

						<div>
							<label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-(--tx3)">Topic</label>
							{isSkillTopicLocked ? (
								<input
									value={lockedTopicLabel}
									readOnly
									className="w-full cursor-not-allowed rounded-[8px] border border-(--bdr2) bg-(--card2) px-3 py-[9px] text-[13px] text-(--tx2) outline-none"
								/>
							) : (
								<select
									value={topicId}
									onChange={(event) => setTopicId(event.target.value)}
									className="w-full cursor-pointer rounded-[8px] border border-(--bdr2) bg-(--card2) px-3 py-[9px] text-[13px] text-(--tx) outline-none transition-[border-color,box-shadow] focus:border-(--rose) focus:shadow-[0_0_0_3px_var(--rose-dim)]"
								>
									{topicOptions.map((topic) => (
										<option key={topic.id} value={topic.id}>
											{topic.label}
										</option>
									))}
								</select>
							)}
						</div>
					</div>

					<div className="mb-[14px]">
						<label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-(--tx3)">What did you learn today?</label>
						<textarea
							value={learned}
							onChange={(event) => setLearned(event.target.value)}
							placeholder="Explain in your own words what you covered. The more detail, the better the post..."
							className="min-h-[90px] w-full resize-y rounded-[8px] border border-(--bdr2) bg-(--card2) px-3 py-[9px] text-[13px] leading-[1.6] text-(--tx) outline-none transition-[border-color,box-shadow] placeholder:text-(--tx3) focus:border-(--rose) focus:shadow-[0_0_0_3px_var(--rose-dim)]"
						/>
					</div>
					{/* <div className="mb-[14px]">
						<label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-(--tx3)">Why does it matter?</label>
						<textarea
							value={why}
							onChange={(event) => setWhy(event.target.value)}
							placeholder="Why is this concept important? Real-world use case, aha moment, or analogy..."
							className="min-h-[70px] w-full resize-y rounded-[8px] border border-(--bdr2) bg-(--card2) px-3 py-[9px] text-[13px] leading-[1.6] text-(--tx) outline-none transition-[border-color,box-shadow] placeholder:text-(--tx3) focus:border-(--rose) focus:shadow-[0_0_0_3px_var(--rose-dim)]"
						/>
					</div> */}

					<div className="mb-[14px]">
						<label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-(--tx3)">Tone</label>
						<PillGroup values={tones} selected={tone} onSelect={setTone} />
					</div>

					<div>
						<label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-(--tx3)">Post Style</label>
						<PillGroup values={styles} selected={postStyle} onSelect={setPostStyle} />
					</div>
				</div>

				<div className="flex items-center justify-between gap-2 border-t border-(--bdr) px-[18px] py-[14px]">
					<span className="text-[10px] text-(--tx3)">Generates an X post based on your notes</span>
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={close}
							className="cursor-pointer rounded-[6px] border border-(--bdr2) bg-transparent px-[11px] py-[5px] text-[11px] font-semibold text-(--tx2) transition-colors hover:bg-(--card2) hover:text-(--tx)"
						>
							Cancel
						</button>
						<button
							type="button"
							onClick={submit}
							className="inline-flex cursor-pointer items-center gap-1 rounded-[6px] border border-[color-mix(in_srgb,var(--rose),black_8%)] bg-(--rose) px-[11px] py-[5px] text-[11px] font-semibold text-white transition-all duration-150 hover:brightness-95"
						>
							<Layers size={11} />
							<span>Generate Post</span>
							<ArrowRight size={11} />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
