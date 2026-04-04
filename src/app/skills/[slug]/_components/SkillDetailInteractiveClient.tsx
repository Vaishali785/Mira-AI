"use client"

import { AddEntryDialog } from "@/components/popups/AddEntryDialog"
import { useAddEntryDialog } from "@/features/entries/use-add-entry-dialog"
import { useDialogOverlay } from "@/hooks/use-dialog-overlay"
import { useSkills } from "@/store/skillsStore"
import { useState } from "react"
import { SkillDetailHeader } from "./SkillDetailHeader"
import { SkillPostDialog } from "./SkillPostDialog"
import { SkillTopicsTable } from "./SkillTopicsTable"

type Props = {
	skillId: string
}
export function SkillDetailInteractiveClient({ skillId }: Props) {
	const skills = useSkills()
	const addEntryDialog = useAddEntryDialog() // to open add entry popup
	const postDialog = useDialogOverlay({ onClose: () => setSelectedTopicId(null) }) //to view post
	const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null)

	const pageSkill = skills.find((skill) => skill.skillId === Number(skillId))
	const topics = pageSkill?.topics ?? []

	const completedCount = topics.filter((topic) => topic.done).length
	const progressPct = Math.round((completedCount / topics.length) * 100)
	const selectedTopic = topics.find((topic) => topic.id === selectedTopicId) ?? null

	const openTopicPost = (topicId: number) => {
		setSelectedTopicId(topicId)
		postDialog.open()
	}

	return (
		<>
			<SkillDetailHeader completedCount={completedCount} progressPct={progressPct} />
			<div className="px-0 pb-16 sm:px-5">
				<SkillTopicsTable
					topics={topics}
					skillId={Number(skillId)}
					onOpenPost={openTopicPost}
					onOpenAddEntryWithContext={addEntryDialog.openWithLockedContext}
				/>
			</div>
			<AddEntryDialog dialog={addEntryDialog} />
			<SkillPostDialog topic={postDialog.isOpen ? selectedTopic : null} onClose={postDialog.close} />
		</>
	)
}
