"use client"

import { useState } from "react"

export type AddSkillStep = 1 | 2 | 3
export type TopicMode = "manual" | "ai" | null

export function useAddSkillStepper() {
	const [step, setStep] = useState<AddSkillStep>(1)
	const [topicMode, setTopicMode] = useState<TopicMode>(null)

	const resetStepper = () => {
		setStep(1)
		setTopicMode(null)
	}

	const goNext = (canProceed: boolean) => {
		if (!canProceed) return
		if (step === 1) {
			setStep(2)
			return
		}
		if (step === 2) {
			setStep(3)
		}
	}

	const goBack = () => {
		if (step === 1) return
		if (step === 3) {
			setStep(2)
			return
		}
		setStep(1)
	}

	const chooseTopicMode = (mode: Exclude<TopicMode, null>) => {
		setTopicMode(mode)
		setStep(3)
	}

	return {
		step,
		topicMode,
		resetStepper,
		goNext,
		goBack,
		chooseTopicMode,
	}
}
