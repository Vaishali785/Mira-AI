"use client"

import { AddEntryDialog } from "@/components/popups/AddEntryDialog"
import { useAddEntryDialog } from "@/features/entries/use-add-entry-dialog"
import { useSkillPostDialog } from "@/features/skills/use-skill-post-dialog"
import { useSkills } from "@/store/skillsStore"
import { SkillDetailHeader } from "./SkillDetailHeader"
import { SkillPostDialog } from "./SkillPostDialog"
import { SkillTopicsTable } from "./SkillTopicsTable"

type Props = {
	skillId: string
}
export function SkillDetailInteractiveClient({ skillId }: Props) {
	const skills = useSkills()
	const addEntryDialog = useAddEntryDialog() // to open add entry popup

	const pageSkill = skills.find((skill) => skill.skillId === Number(skillId))
	const topics = pageSkill?.topics ?? []
	const postDialog = useSkillPostDialog(topics)

	const completedCount = topics.filter((topic) => topic.done).length
	const progressPct = Math.round((completedCount / topics.length) * 100)

	return (
		<>
			<SkillDetailHeader completedCount={completedCount} progressPct={progressPct} />
			<div className="px-0 pb-16 sm:px-5">
				<SkillTopicsTable
					topics={topics}
					skillId={Number(skillId)}
					onOpenPost={postDialog.openTopicPost}
					onOpenAddEntryWithContext={addEntryDialog.openWithLockedContext}
				/>
			</div>
			<AddEntryDialog dialog={addEntryDialog} />
			<SkillPostDialog topic={postDialog.topic} onClose={postDialog.close} />
		</>
	)
}
