"use client"

import { EntryListCard } from "@/components/cards/EntryListCard"
import { AddEntryDialog } from "@/components/popups/AddEntryDialog"
import { useAddEntryDialog } from "@/features/entries/use-add-entry-dialog-adapter"
import { useTopicCompletionToggle } from "@/hooks/use-topic-completion-toggle"
import { useSkills } from "@/store/skillsStore"
import { CurriculumSection } from "./CurriculumSection"

export function DashboardLearningClient() {
	const addEntryDialog = useAddEntryDialog()
	const skills = useSkills()

	const { toggleTopic } = useTopicCompletionToggle({
		openWithLockedContext: addEntryDialog.openWithLockedContext,
	})

	return (
		<>
			<div className="min-[900px]:col-span-4 min-[900px]:row-start-3 xl:col-[1/4] xl:row-start-4">
				<CurriculumSection skills={skills} onToggleTopic={(skillId, topicId) => toggleTopic({ skillId, topicId })} />
			</div>
			<div className="min-[900px]:col-span-4 min-[900px]:row-start-4 xl:contents">
				<EntryListCard onAddEntry={addEntryDialog.open} />
			</div>
			<AddEntryDialog dialog={addEntryDialog} />
		</>
	)
}
