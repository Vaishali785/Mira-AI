"use client"

import { useAiTopicGenerator } from "@/hooks/use-ai-topic-generator"
import { TopicMode, useAddSkillStepper } from "@/hooks/use-add-skill-stepper"
import { useDialogOverlay } from "@/hooks/use-dialog-overlay"
import { useSkillData } from "@/hooks/use-skill-data"

export function useAddSkillDialog() {
	const stepper = useAddSkillStepper()
	const skill = useSkillData()
	const ai = useAiTopicGenerator()

	const resetDialogState = () => {
		stepper.resetStepper()
		skill.resetSkillData()
		ai.resetAiState()
	}

	const dialog = useDialogOverlay({
		onOpen: resetDialogState,
		onClose: resetDialogState,
	})

	const handleChooseTopicMode = async (mode: Exclude<TopicMode, null>) => {
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

	return {
		isOpen: dialog.isOpen,
		open: dialog.open,
		close: dialog.close,
		step: stepper.step,
		topicMode: stepper.topicMode,
		aiLoading: ai.aiLoading,
		canContinue,
		popupTitle,
		popupSubtitle,
		skillData: skill.skillData,
		topicInput: skill.topicInput,
		onGoBack: stepper.goBack,
		onGoNext: () => stepper.goNext(canContinue),
		onChooseTopicMode: handleChooseTopicMode,
		onSkillNameChange: skill.setSkillName,
		onTopicInputChange: skill.setTopicInput,
		onAddTopic: skill.addTopicFromInput,
		onRemoveTopic: skill.removeTopic,
		onSubmitted: dialog.close,
	}
}
