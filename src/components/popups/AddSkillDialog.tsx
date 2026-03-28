import { useAddSkillDialog } from "@/hooks/use-add-skill-dialog"
import { ArrowLeft, ArrowRight, BookOpen, Check, Layers, List, Plus, X } from "lucide-react"

type AddSkillDialogProps = {
	dialog: ReturnType<typeof useAddSkillDialog>
}

function Stepper({ step, topicsLen }: { step: number; topicsLen?: number }) {
	const steps = ["Skill Name", "Choose Method", "Add Topics"]

	return (
		<div className="mb-5 mx-auto w-fit max-w-full">
			<div className="flex items-center">
				{steps.map((label, index) => {
					const stepIndex = index + 1
					const done = stepIndex < step || (step == steps.length && topicsLen && topicsLen > 0) //done last step if one input is added
					const active = stepIndex === step && stepIndex != steps.length //bg change for last step
					const hasNext = index < steps.length - 1
					const nextDone = stepIndex < step

					return (
						<div key={label} className="contents">
							<div
								className={`grid h-[18px] w-[18px] place-items-center rounded-full border-[1.5px] transition-all duration-200 ${active ? "border-(--rose) bg-(--rose-dim) shadow-[0_0_0_3px_var(--rose-dim)]" : done ? "border-(--rose) bg-(--rose)" : "border-(--bdr2) bg-(--card2)"}`}
							>
								{done ? <Check size={10} strokeWidth={2.75} className="text-white" /> : null}
							</div>
							{hasNext ? <div className={`h-[2px] w-28 rounded-full transition-colors ${nextDone ? "bg-(--rose)" : "bg-(--bdr2)"}`} /> : null}
						</div>
					)
				})}
			</div>
			<div className="mt-2 flex items-start">
				{steps.map((label, index) => {
					const hasNext = index < steps.length - 1

					return (
						<div key={`${label}-label`} className="contents">
							<div className="relative h-[14px] w-[18px]">
								<span className="absolute left-1/2 top-0 w-[96px] -translate-x-1/2 text-center text-[9px] font-medium text-(--tx3)">{label}</span>
							</div>
							{hasNext ? <div className="w-28" /> : null}
						</div>
					)
				})}
			</div>
		</div>
	)
}

function SkillNameTag({ value }: { value: string }) {
	return (
		<div className="mb-3 inline-flex items-center gap-1.5 rounded-[7px] border border-[rgba(255,31,90,0.2)] bg-(--rose-dim) px-[10px] py-[5px] text-[12px] font-semibold text-(--rose)">
			<BookOpen size={11} strokeWidth={2} />
			<span>{value || "—"}</span>
		</div>
	)
}

export function AddSkillDialog({ dialog }: AddSkillDialogProps) {
	const {
		isOpen,
		step,
		skillName,
		path,
		manualTopics,
		manualTopicInput,
		aiTopics,
		aiSelected,
		aiTopicInput,
		aiLoading,
		canContinue,
		close,
		back,
		next,
		setSkillName,
		setManualTopicInput,
		setAiTopicInput,
		choosePath,
		addManualTopic,
		removeManualTopic,
		toggleAiTopic,
		addAiCustomTopic,
		removeAiTopic,
	} = dialog

	const popupTitle = step === 3 ? "Add Topics" : "Add a Skill"
	const popupSubtitle =
		step === 1
			? "Track your learning progress topic by topic"
			: step === 2
				? "Choose how you want to build the topic list"
				: "Finalize topics before saving"

	const isManualStep = step === 3 && path === "manual"
	const isAiStep = step === 3 && path === "ai"
	const nextLabel = step === 3 ? "Save Skill" : "Continue"

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
						<div className="mb-1 text-[9px] font-bold uppercase tracking-[0.09em] text-(--tx3)">New Skill</div>
						<h2 className="text-[16px] font-extrabold tracking-[-0.02em] text-(--tx)">{popupTitle}</h2>
						<p className="mt-[3px] text-[11px] text-(--tx3)">{popupSubtitle}</p>
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
					{step === 1 ? (
						<div>
							<Stepper step={1} />
							<label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-(--tx3)">Skill Name</label>
							<input
								value={skillName}
								onChange={(event) => setSkillName(event.target.value)}
								onKeyDown={(event) => {
									if (event.key === "Enter" && canContinue) {
										next()
									}
								}}
								placeholder="e.g. Machine Learning, React, SQL..."
								className="w-full rounded-[8px] border border-(--bdr2) bg-(--card2) px-3 py-[9px] text-[13px] text-(--tx) outline-none transition-[border-color,box-shadow] placeholder:text-(--tx3) focus:border-(--rose) focus:shadow-[0_0_0_3px_var(--rose-dim)]"
							/>
						</div>
					) : null}

					{step === 2 ? (
						<div>
							<Stepper step={2} />
							<SkillNameTag value={skillName} />

							<div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
								<button
									type="button"
									onClick={() => choosePath("manual")}
									className={`group cursor-pointer rounded-[10px] border-[1.5px] p-[14px] text-left transition-all duration-150 ${path === "manual" ? "border-(--rose) bg-(--rose-dim)" : "border-(--bdr2) bg-(--card2) hover:border-(--rose) hover:bg-(--rose-dim)"}`}
								>
									<div
										className={`mb-2 grid h-7 w-7 place-items-center rounded-[7px] border transition-all duration-150 ${path === "manual" ? "border-[color-mix(in_srgb,var(--rose),transparent_70%)] bg-[color-mix(in_srgb,var(--rose-dim),var(--card3)_35%)] text-(--rose) shadow-[0_0_0_2px_var(--rose-dim)]" : "border-(--bdr2) bg-(--card3) text-(--tx2) group-hover:border-[color-mix(in_srgb,var(--rose),transparent_72%)] group-hover:bg-[color-mix(in_srgb,var(--rose-dim),var(--card3)_32%)] group-hover:text-(--rose)"}`}
									>
										<List size={14} strokeWidth={2} />
									</div>
									<div className="text-[12px] font-bold text-(--tx)">Add Topics Manually</div>
									<p className="mt-1 text-[10px] leading-[1.5] text-(--tx3)">Type each topic yourself and build your own curriculum.</p>
								</button>

								<button
									type="button"
									onClick={() => choosePath("ai")}
									className={`group cursor-pointer rounded-[10px] border-[1.5px] p-[14px] text-left transition-all duration-150 ${path === "ai" ? "border-(--rose) bg-(--rose-dim)" : "border-(--bdr2) bg-(--card2) hover:border-(--rose) hover:bg-(--rose-dim)"}`}
								>
									<div
										className={`mb-2 grid h-7 w-7 place-items-center rounded-[7px] border transition-all duration-150 ${path === "ai" ? "border-[color-mix(in_srgb,var(--rose),transparent_70%)] bg-[color-mix(in_srgb,var(--rose-dim),var(--card3)_35%)] text-(--rose) shadow-[0_0_0_2px_var(--rose-dim)]" : "border-(--bdr2) bg-(--card3) text-(--tx2) group-hover:border-[color-mix(in_srgb,var(--rose),transparent_72%)] group-hover:bg-[color-mix(in_srgb,var(--rose-dim),var(--card3)_32%)] group-hover:text-(--rose)"}`}
									>
										<Layers size={14} strokeWidth={2} />
									</div>
									<div className="text-[12px] font-bold text-(--tx)">Generate with AI</div>
									<p className="mt-1 text-[10px] leading-[1.5] text-(--tx3)">Let AI suggest a structured topic list. You can edit before saving.</p>
								</button>
							</div>
						</div>
					) : null}

					{isManualStep ? (
						<div>
							<Stepper step={3} topicsLen={manualTopics.length} />
							<SkillNameTag value={skillName} />

							<div className="mb-3 max-h-[220px] space-y-[5px] overflow-y-auto">
								{manualTopics.map((topic, index) => (
									<div key={`${topic}-${index}`} className="flex items-center gap-2 rounded-[7px] border border-(--bdr) bg-(--card2) px-[10px] py-2">
										<span className="flex-1 text-[12px] text-(--tx)">{topic}</span>
										<button
											type="button"
											onClick={() => removeManualTopic(index)}
											className="grid h-5 w-5 cursor-pointer place-items-center rounded-[4px] text-(--tx3) transition-colors hover:bg-[rgba(255,31,90,0.12)] hover:text-(--rose)"
										>
											<X size={12} />
										</button>
									</div>
								))}
							</div>

							<div className="flex gap-[7px]">
								<input
									value={manualTopicInput}
									onChange={(event) => setManualTopicInput(event.target.value)}
									onKeyDown={(event) => {
										if (event.key === "Enter") {
											addManualTopic()
										}
									}}
									placeholder="Topic name..."
									className="w-full rounded-[8px] border border-(--bdr2) bg-(--card2) px-3 py-[9px] text-[13px] text-(--tx) outline-none transition-[border-color,box-shadow] placeholder:text-(--tx3) focus:border-(--rose) focus:shadow-[0_0_0_3px_var(--rose-dim)]"
								/>
								<button
									type="button"
									onClick={addManualTopic}
									className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-[6px] border border-(--bdr2) bg-(--card2) px-[11px] py-[5px] text-[11px] font-semibold text-(--tx2) transition-colors hover:border-(--rose) hover:bg-(--rose-dim) hover:text-(--rose)"
								>
									<Plus size={11} />
									Add
								</button>
							</div>
						</div>
					) : null}

					{isAiStep ? (
						<div>
							<Stepper step={3} topicsLen={manualTopics.length} />
							<SkillNameTag value={skillName} />

							{aiLoading ? (
								<div className="flex flex-col items-center justify-center gap-3 py-8">
									<div className="h-8 w-8 animate-spin rounded-full border-[2.5px] border-(--bdr2) border-t-(--rose)" />
									<div className="text-[11px] text-(--tx3)">Generating topics...</div>
								</div>
							) : (
								<div>
									<p className="mb-2 text-[10px] text-(--tx3)">Select the topics you want - all selected by default. You can also add your own.</p>
									<div className="mb-2 max-h-[190px] space-y-[5px] overflow-y-auto">
										{aiTopics.map((topic, index) => {
											const selected = aiSelected.includes(index)

											return (
												<button
													key={`${topic}-${index}`}
													type="button"
													onClick={() => toggleAiTopic(index)}
													className={`flex w-full cursor-pointer items-center gap-2 rounded-[7px] border px-[10px] py-2 text-left transition-colors ${selected ? "border-(--rose) bg-(--rose-dim)" : "border-(--bdr) bg-(--card2) hover:border-(--rose) hover:bg-(--rose-dim)"}`}
												>
													<div
														className={`grid h-[14px] w-[14px] place-items-center rounded-[3px] border-[1.5px] ${selected ? "border-(--rose) bg-(--rose-dim)" : "border-(--bdr2)"}`}
													>
														{selected ? <Check size={8} strokeWidth={3} className="text-(--rose)" /> : null}
													</div>
													<span className="flex-1 text-[12px] text-(--tx)">{topic}</span>
													<button
														type="button"
														onClick={(event) => {
															event.stopPropagation()
															removeAiTopic(index)
														}}
														className="grid h-5 w-5 cursor-pointer place-items-center rounded-[4px] text-(--tx3) transition-colors hover:bg-[rgba(255,31,90,0.12)] hover:text-(--rose)"
														aria-label="Remove topic"
													>
														<X size={12} />
													</button>
												</button>
											)
										})}
									</div>

									<div className="mt-2 flex gap-[7px]">
										<input
											value={aiTopicInput}
											onChange={(event) => setAiTopicInput(event.target.value)}
											onKeyDown={(event) => {
												if (event.key === "Enter") {
													addAiCustomTopic()
												}
											}}
											placeholder="Add your own topic..."
											className="w-full rounded-[8px] border border-(--bdr2) bg-(--card2) px-3 py-[9px] text-[13px] text-(--tx) outline-none transition-[border-color,box-shadow] placeholder:text-(--tx3) focus:border-(--rose) focus:shadow-[0_0_0_3px_var(--rose-dim)]"
										/>
										<button
											type="button"
											onClick={addAiCustomTopic}
											className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-[6px] border border-(--bdr2) bg-(--card2) px-[11px] py-[5px] text-[11px] font-semibold text-(--tx2) transition-colors hover:border-(--rose) hover:bg-(--rose-dim) hover:text-(--rose)"
										>
											<Plus size={11} />
											Add
										</button>
									</div>
								</div>
							)}
						</div>
					) : null}
				</div>

				<div className="flex items-center justify-between gap-2 border-t border-(--bdr) px-[18px] py-[14px]">
					<button
						type="button"
						onClick={back}
						className={`inline-flex cursor-pointer items-center gap-1 rounded-[6px] border border-(--bdr2) bg-transparent px-[11px] py-[5px] text-[11px] font-semibold text-(--tx2) transition-colors hover:bg-(--card2) hover:text-(--tx) ${step === 1 ? "invisible" : ""}`}
					>
						<ArrowLeft size={11} />
						<span>Back</span>
					</button>

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
							onClick={next}
							disabled={!canContinue || aiLoading}
							className="inline-flex cursor-pointer items-center gap-1 rounded-[6px] border border-[color-mix(in_srgb,var(--rose),black_8%)] bg-(--rose) px-[11px] py-[5px] text-[11px] font-semibold text-white transition-all duration-150 enabled:hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
						>
							<span>{nextLabel}</span>
							<ArrowRight size={11} />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
