"use client"

import { useMemo, useState } from "react"
import { useDialogOverlay } from "@/hooks/use-dialog-overlay"

type DialogStep = 1 | 2 | 3
type TopicPath = "manual" | "ai" | null

const fallbackAiTopics = ["Foundations & Core Concepts", "Tools & Setup", "Practical Use Cases", "Best Practices", "Projects & Portfolio"]

export const useAddSkillDialog = () => {
	const { isOpen, open: openOverlay, close } = useDialogOverlay()
	const [step, setStep] = useState<DialogStep>(1)
	const [skillName, setSkillName] = useState("")
	const [path, setPath] = useState<TopicPath>(null)
	const [manualTopics, setManualTopics] = useState<string[]>([])
	const [manualTopicInput, setManualTopicInput] = useState("")
	const [aiTopics, setAiTopics] = useState<string[]>([])
	const [aiSelected, setAiSelected] = useState<number[]>([])
	const [aiTopicInput, setAiTopicInput] = useState("")
	const [aiLoading, setAiLoading] = useState(false)

	const selectedTopics = useMemo(() => {
		if (path === "manual") {
			return manualTopics
		}

		return aiTopics.filter((_, index) => aiSelected.includes(index))
	}, [aiSelected, aiTopics, manualTopics, path])

	const resetDialog = () => {
		setStep(1)
		setSkillName("")
		setPath(null)
		setManualTopics([])
		setManualTopicInput("")
		setAiTopics([])
		setAiSelected([])
		setAiTopicInput("")
		setAiLoading(false)
	}

	const open = () => {
		resetDialog()
		openOverlay()
	}

	const goToStep2 = () => {
		if (!skillName.trim()) {
			return
		}

		setStep(2)
	}

	const loadAiSuggestions = () => {
		setAiLoading(true)

		window.setTimeout(() => {
			setAiTopics(fallbackAiTopics)
			setAiSelected(fallbackAiTopics.map((_, index) => index))
			setAiLoading(false)
		}, 800)
	}

	const choosePath = (nextPath: Exclude<TopicPath, null>) => {
		setPath(nextPath)
		setStep(3)

		if (nextPath === "ai" && aiTopics.length === 0) {
			loadAiSuggestions()
		}
	}

	const back = () => {
		if (step === 1) {
			return
		}

		if (step === 3) {
			setStep(2)
			return
		}

		setStep(1)
	}

	const addManualTopic = () => {
		const topicName = manualTopicInput.trim()

		if (!topicName) {
			return
		}

		setManualTopics((current) => [...current, topicName])
		setManualTopicInput("")
	}

	const removeManualTopic = (topicIndex: number) => {
		setManualTopics((current) => current.filter((_, index) => index !== topicIndex))
	}

	const toggleAiTopic = (topicIndex: number) => {
		setAiSelected((current) => {
			if (current.includes(topicIndex)) {
				return current.filter((index) => index !== topicIndex)
			}

			return [...current, topicIndex]
		})
	}

	const addAiCustomTopic = () => {
		const topicName = aiTopicInput.trim()

		if (!topicName) {
			return
		}

		setAiTopics((current) => {
			const nextTopics = [...current, topicName]
			setAiSelected((existing) => [...existing, nextTopics.length - 1])
			return nextTopics
		})
		setAiTopicInput("")
	}

	const removeAiTopic = (topicIndex: number) => {
		setAiTopics((current) => current.filter((_, index) => index !== topicIndex))
		setAiSelected((current) => current.filter((index) => index !== topicIndex).map((index) => (index > topicIndex ? index - 1 : index)))
	}

	const next = () => {
		if (step === 1) {
			goToStep2()
			return
		}

		if (step === 2) {
			if (!path) {
				return
			}

			setStep(3)

			return
		}

		close()
	}

	const canContinue = step === 1 ? skillName.trim().length > 0 : step === 2 ? Boolean(path) : selectedTopics.length > 0

	return {
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
		selectedTopics,
		canContinue,
		open,
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
	}
}
