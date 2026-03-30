"use client"

import { AddSkillForm } from "@/components/forms/AddSkillForm"
import { useAddSkillStepper } from "@/hooks/use-add-skill-stepper"
import { useAiTopicGenerator } from "@/hooks/use-ai-topic-generator"
import { useSkillData } from "@/hooks/use-skill-data"
import { useEffect } from "react"
import { AddSkillStepper } from "./AddSkillStepper"
import { DialogShell } from "./DialogShell"

type AddSkillDialogProps = {
	isOpen: boolean
	onClose: () => void
}

export function AddSkillDialog({ isOpen, onClose }: AddSkillDialogProps) {
	const stepper = useAddSkillStepper()
	const skill = useSkillData()
	const ai = useAiTopicGenerator()

	const resetDialogState = () => {
		stepper.resetStepper()
		skill.resetSkillData()
		ai.resetAiState()
	}

	const close = () => {
		onClose()
		resetDialogState()
	}

	useEffect(() => {
		if (!isOpen) resetDialogState()
	}, [isOpen])

	const handleChooseTopicMode = async (mode: "manual" | "ai") => {
		stepper.chooseTopicMode(mode)
		if (mode !== "ai" || skill.skillData.topics.length > 0) return

		const generatedTopics = await ai.generateTopics(skill.skillData.skillName)
		skill.replaceTopics(generatedTopics)
	}

	const popupTitle = stepper.step === 3 ? "Add Topics" : "Add a Skill"
	const popupSubtitle =
		stepper.step === 1
			? "Track your learning progress topic by topic"
			: stepper.step === 2
				? "Choose how you want to build the topic list"
				: "Finalize topics before saving"

	const canContinue =
		stepper.step === 1
			? skill.skillData.skillName.trim().length > 0
			: stepper.step === 2
				? stepper.topicMode !== null
				: skill.skillData.topics.length > 0

	return (
		<DialogShell isOpen={isOpen} title={popupTitle} subtitle={popupSubtitle} onClose={close}>
			<div className="px-[18px] pt-[18px]">
				<AddSkillStepper step={stepper.step} topicsLen={skill.skillData.topics.length} />
			</div>
			<AddSkillForm
				step={stepper.step}
				topicMode={stepper.topicMode}
				aiLoading={ai.aiLoading}
				canContinue={canContinue}
				skillData={skill.skillData}
				topicInput={skill.topicInput}
				onCancel={close}
				onSubmitted={close}
				onGoBack={stepper.goBack}
				onGoNext={() => stepper.goNext(canContinue)}
				onChooseTopicMode={handleChooseTopicMode}
				onSkillNameChange={skill.setSkillName}
				onTopicInputChange={skill.setTopicInput}
				onAddTopic={skill.addTopicFromInput}
				onRemoveTopic={skill.removeTopic}
			/>
		</DialogShell>
	)
}
