"use client"

import { useState } from "react"

function fallbackTopics(skillName: string) {
	if (skillName.toLowerCase().includes("machine")) {
		return ["Foundations", "Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Deployment"]
	}

	return ["Foundations & Core Concepts", "Tools & Setup", "Practical Use Cases", "Best Practices", "Projects & Portfolio"]
}

export function useAiTopicGenerator() {
	const [aiLoading, setAiLoading] = useState(false)

	const generateTopics = async (skillName: string) => {
		setAiLoading(true)

		await new Promise((resolve) => window.setTimeout(resolve, 700))

		const topics = fallbackTopics(skillName)
		setAiLoading(false)
		return topics
	}

	const resetAiState = () => {
		setAiLoading(false)
	}

	return {
		aiLoading,
		generateTopics,
		resetAiState,
	}
}
