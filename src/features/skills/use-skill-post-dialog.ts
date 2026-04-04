"use client"

import { useDialogOverlay } from "@/hooks/use-dialog-overlay"
import { SkillTopic } from "@/types/app-types"
import { useState } from "react"

export function useSkillPostDialog(topics: SkillTopic[]) {
	const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null)
	const dialog = useDialogOverlay({
		onClose: () => setSelectedTopicId(null),
	})

	const openTopicPost = (topicId: number) => {
		setSelectedTopicId(topicId)
		dialog.open()
	}

	const topic = dialog.isOpen ? topics.find((item) => item.id === selectedTopicId) ?? null : null

	return {
		isOpen: dialog.isOpen,
		topic,
		openTopicPost,
		close: dialog.close,
	}
}
