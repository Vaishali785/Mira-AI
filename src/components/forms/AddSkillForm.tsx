import { AddSkillStep, TopicMode } from "@/hooks/use-add-skill-stepper"
import { SkillData } from "@/hooks/use-skill-data"
import { createSkillAction } from "@/server/actions"
import { ArrowLeft, ArrowRight, BookOpen, Layers, List, Plus, X } from "lucide-react"

type AddSkillFormProps = {
	step: AddSkillStep
	topicMode: TopicMode
	aiLoading: boolean
	canContinue: boolean
	skillData: SkillData
	topicInput: string
	onCancel: () => void
	onSubmitted: () => void
	onGoBack: () => void
	onGoNext: () => void
	onChooseTopicMode: (mode: "manual" | "ai") => void
	onSkillNameChange: (value: string) => void
	onTopicInputChange: (value: string) => void
	onAddTopic: () => void
	onRemoveTopic: (topicIndex: number) => void
}

function SkillNameTag({ value }: { value: string }) {
	return (
		<div className="mb-3 inline-flex items-center gap-1.5 rounded-[7px] border border-[rgba(255,31,90,0.2)] bg-(--rose-dim) px-[10px] py-[5px] text-[12px] font-semibold text-(--rose)">
			<BookOpen size={11} strokeWidth={2} />
			<span>{value || "—"}</span>
		</div>
	)
}

export function AddSkillForm({
	step,
	topicMode,
	aiLoading,
	canContinue,
	skillData,
	topicInput,
	onCancel,
	onSubmitted,
	onGoBack,
	onGoNext,
	onChooseTopicMode,
	onSkillNameChange,
	onTopicInputChange,
	onAddTopic,
	onRemoveTopic,
}: AddSkillFormProps) {
	const isManualStep = step === 3 && topicMode === "manual"
	const isAiStep = step === 3 && topicMode === "ai"
	const nextLabel = step === 3 ? "Save Skill" : "Continue"

	return (
		<form
			action={createSkillAction}
			onSubmit={() => {
				if (step === 3 && canContinue) onSubmitted()
			}}
		>
			<input type="hidden" name="skillName" value={skillData.skillName} />
			<input type="hidden" name="topics" value={skillData.topics.join("\n")} />

			<div className="px-[18px] pb-[18px] pt-0">
				{step === 1 ? (
					<div>
						<label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-(--tx3)">Skill Name</label>
						<input
							value={skillData.skillName}
							onChange={(event) => onSkillNameChange(event.target.value)}
							onKeyDown={(event) => {
								if (event.key === "Enter" && canContinue) onGoNext()
							}}
							placeholder="e.g. Machine Learning, React, SQL..."
							className="w-full rounded-[8px] border border-(--bdr2) bg-(--card2) px-3 py-[9px] text-[13px] text-(--tx) outline-none transition-[border-color,box-shadow] placeholder:text-(--tx3) focus:border-(--rose) focus:shadow-[0_0_0_3px_var(--rose-dim)]"
						/>
					</div>
				) : null}

				{step === 2 ? (
					<div>
						<SkillNameTag value={skillData.skillName} />
						<div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
							<button
								type="button"
								onClick={() => onChooseTopicMode("manual")}
								className={`group cursor-pointer rounded-[10px] border-[1.5px] p-[14px] text-left transition-all duration-150 ${
									topicMode === "manual"
										? "border-(--rose) bg-(--rose-dim)"
										: "border-(--bdr2) bg-(--card2) hover:border-(--rose) hover:bg-(--rose-dim)"
								}`}
							>
								<div
									className={`mb-2 grid h-7 w-7 place-items-center rounded-[7px] border transition-all duration-150 ${
										topicMode === "manual"
											? "border-[color-mix(in_srgb,var(--rose),transparent_70%)] bg-[color-mix(in_srgb,var(--rose-dim),var(--card3)_35%)] text-(--rose) shadow-[0_0_0_2px_var(--rose-dim)]"
											: "border-(--bdr2) bg-(--card3) text-(--tx2) group-hover:border-[color-mix(in_srgb,var(--rose),transparent_72%)] group-hover:bg-[color-mix(in_srgb,var(--rose-dim),var(--card3)_32%)] group-hover:text-(--rose)"
									}`}
								>
									<List size={14} strokeWidth={2} />
								</div>
								<div className="text-[12px] font-bold text-(--tx)">Add Topics Manually</div>
								<p className="mt-1 text-[10px] leading-[1.5] text-(--tx3)">Type each topic yourself and build your own curriculum.</p>
							</button>
							<button
								type="button"
								onClick={() => onChooseTopicMode("ai")}
								className={`group cursor-pointer rounded-[10px] border-[1.5px] p-[14px] text-left transition-all duration-150 ${
									topicMode === "ai" ? "border-(--rose) bg-(--rose-dim)" : "border-(--bdr2) bg-(--card2) hover:border-(--rose) hover:bg-(--rose-dim)"
								}`}
							>
								<div
									className={`mb-2 grid h-7 w-7 place-items-center rounded-[7px] border transition-all duration-150 ${
										topicMode === "ai"
											? "border-[color-mix(in_srgb,var(--rose),transparent_70%)] bg-[color-mix(in_srgb,var(--rose-dim),var(--card3)_35%)] text-(--rose) shadow-[0_0_0_2px_var(--rose-dim)]"
											: "border-(--bdr2) bg-(--card3) text-(--tx2) group-hover:border-[color-mix(in_srgb,var(--rose),transparent_72%)] group-hover:bg-[color-mix(in_srgb,var(--rose-dim),var(--card3)_32%)] group-hover:text-(--rose)"
									}`}
								>
									<Layers size={14} strokeWidth={2} />
								</div>
								<div className="text-[12px] font-bold text-(--tx)">Generate with AI</div>
								<p className="mt-1 text-[10px] leading-[1.5] text-(--tx3)">Let AI suggest a structured topic list. You can edit before saving.</p>
							</button>
						</div>
					</div>
				) : null}

				{isManualStep || isAiStep ? (
					<div>
						<SkillNameTag value={skillData.skillName} />
						{isAiStep && aiLoading ? (
							<div className="flex flex-col items-center justify-center gap-3 py-8">
								<div className="h-8 w-8 animate-spin rounded-full border-[2.5px] border-(--bdr2) border-t-(--rose)" />
								<div className="text-[11px] text-(--tx3)">Generating topics...</div>
							</div>
						) : (
							<>
								{isAiStep ? (
									<p className="mb-2 text-[10px] text-(--tx3)">AI generated topics. You can remove or add your own topics before saving.</p>
								) : null}
								<div className="mb-3 max-h-[220px] space-y-[5px] overflow-y-auto">
									{skillData.topics.map((topic, index) => (
										<div
											key={`${topic}-${index}`}
											className="flex items-center gap-2 rounded-[7px] border border-(--bdr) bg-(--card2) px-[10px] py-2"
										>
											<span className="flex-1 text-[12px] text-(--tx)">{topic}</span>
											<button
												type="button"
												onClick={() => onRemoveTopic(index)}
												className="grid h-5 w-5 cursor-pointer place-items-center rounded-[4px] text-(--tx3) transition-colors hover:bg-[rgba(255,31,90,0.12)] hover:text-(--rose)"
											>
												<X size={12} />
											</button>
										</div>
									))}
								</div>
								<div className="flex gap-[7px]">
									<input
										value={topicInput}
										onChange={(event) => onTopicInputChange(event.target.value)}
										onKeyDown={(event) => {
											if (event.key === "Enter") {
												event.preventDefault()
												onAddTopic()
											}
										}}
										placeholder={isAiStep ? "Add your own topic..." : "Topic name..."}
										className="w-full rounded-[8px] border border-(--bdr2) bg-(--card2) px-3 py-[9px] text-[13px] text-(--tx) outline-none transition-[border-color,box-shadow] placeholder:text-(--tx3) focus:border-(--rose) focus:shadow-[0_0_0_3px_var(--rose-dim)]"
									/>
									<button
										type="button"
										onClick={onAddTopic}
										className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-[6px] border border-(--bdr2) bg-(--card2) px-[11px] py-[5px] text-[11px] font-semibold text-(--tx2) transition-colors hover:border-(--rose) hover:bg-(--rose-dim) hover:text-(--rose)"
									>
										<Plus size={11} />
										Add
									</button>
								</div>
							</>
						)}
					</div>
				) : null}
			</div>

			<div className="flex items-center justify-between gap-2 border-t border-(--bdr) px-[18px] py-[14px]">
				<button
					type="button"
					onClick={onGoBack}
					className={`inline-flex cursor-pointer items-center gap-1 rounded-[6px] border border-(--bdr2) bg-transparent px-[11px] py-[5px] text-[11px] font-semibold text-(--tx2) transition-colors hover:bg-(--card2) hover:text-(--tx) ${
						step === 1 ? "invisible" : ""
					}`}
				>
					<ArrowLeft size={11} />
					<span>Back</span>
				</button>
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={onCancel}
						className="cursor-pointer rounded-[6px] border border-(--bdr2) bg-transparent px-[11px] py-[5px] text-[11px] font-semibold text-(--tx2) transition-colors hover:bg-(--card2) hover:text-(--tx)"
					>
						Cancel
					</button>
					{step === 3 ? (
						<button
							type="submit"
							disabled={!canContinue || aiLoading}
							className="inline-flex cursor-pointer items-center gap-1 rounded-[6px] border border-[color-mix(in_srgb,var(--rose),black_8%)] bg-(--rose) px-[11px] py-[5px] text-[11px] font-semibold text-white transition-all duration-150 enabled:hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
						>
							<span>{nextLabel}</span>
							<ArrowRight size={11} />
						</button>
					) : (
						<button
							type="button"
							onClick={onGoNext}
							disabled={!canContinue || aiLoading}
							className="inline-flex cursor-pointer items-center gap-1 rounded-[6px] border border-[color-mix(in_srgb,var(--rose),black_8%)] bg-(--rose) px-[11px] py-[5px] text-[11px] font-semibold text-white transition-all duration-150 enabled:hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
						>
							<span>{nextLabel}</span>
							<ArrowRight size={11} />
						</button>
					)}
				</div>
			</div>
		</form>
	)
}
