import { entrySkills } from "@/data/mock-data"
import { useAddEntryDialog } from "@/features/entries/use-add-entry-dialog"
import { createEntryAction } from "@/server/actions"
import { ArrowRight, Layers } from "lucide-react"

type AddEntryFormProps = {
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
					className={`cursor-pointer rounded-full border-[1.5px] px-3 py-[5px] text-[11px] transition-colors ${
						selected === value
							? "border-(--rose) bg-(--rose-dim) font-bold text-(--rose)"
							: "border-(--bdr2) bg-(--card2) text-(--tx2) hover:border-(--rose) hover:text-(--rose)"
					}`}
				>
					{value}
				</button>
			))}
		</div>
	)
}

export function AddEntryForm({ dialog }: AddEntryFormProps) {
	const {
		close,
		submit,
		isSkillTopicLocked,
		lockedSkillLabel,
		lockedTopicLabel,
		entryData,
		// skills,
		topicOptions,
		tones,
		format,
		onSkillChange,
		setTopicId,
		setUserEntry,
		setTone,
		setPostStyle,
	} = dialog

	const selectedSkillLabel = isSkillTopicLocked ? lockedSkillLabel : (entrySkills.find((skill) => skill.id === entryData.skillId)?.label ?? "")
	const selectedTopicLabel = isSkillTopicLocked ? lockedTopicLabel : (topicOptions.find((topic) => topic.id === entryData.topicId)?.label ?? "")

	return (
		<form action={createEntryAction} onSubmit={submit}>
			<input type="hidden" name="skillLabel" value={selectedSkillLabel} />
			<input type="hidden" name="topicLabel" value={selectedTopicLabel} />
			<input type="hidden" name="userEntry" value={entryData.userEntry} />
			<input type="hidden" name="tone" value={entryData.tone} />
			<input type="hidden" name="postStyle" value={entryData.postStyle} />

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
								value={entryData.skillId}
								onChange={(event) => onSkillChange(event.target.value)}
								className="w-full cursor-pointer rounded-[8px] border border-(--bdr2) bg-(--card2) px-3 py-[9px] text-[13px] text-(--tx) outline-none transition-[border-color,box-shadow] focus:border-(--rose) focus:shadow-[0_0_0_3px_var(--rose-dim)]"
							>
								{entrySkills.map((skill) => (
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
								value={entryData.topicId}
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
						value={entryData.userEntry}
						onChange={(event) => setUserEntry(event.target.value)}
						placeholder="Explain in your own words what you covered. The more detail, the better the post..."
						className="min-h-[90px] w-full resize-y rounded-[8px] border border-(--bdr2) bg-(--card2) px-3 py-[9px] text-[13px] leading-[1.6] text-(--tx) outline-none transition-[border-color,box-shadow] placeholder:text-(--tx3) focus:border-(--rose) focus:shadow-[0_0_0_3px_var(--rose-dim)]"
					/>
				</div>

				<div className="mb-[14px]">
					<label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-(--tx3)">Tone</label>
					<PillGroup values={tones} selected={entryData.tone} onSelect={setTone} />
				</div>

				<div>
					<label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-(--tx3)">Post Style</label>
					<PillGroup values={format} selected={entryData.postStyle} onSelect={setPostStyle} />
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
						type="submit"
						className="inline-flex cursor-pointer items-center gap-1 rounded-[6px] border border-[color-mix(in_srgb,var(--rose),black_8%)] bg-(--rose) px-[11px] py-[5px] text-[11px] font-semibold text-white transition-all duration-150 hover:brightness-95"
					>
						<Layers size={11} />
						<span>Generate Post</span>
						<ArrowRight size={11} />
					</button>
				</div>
			</div>
		</form>
	)
}
