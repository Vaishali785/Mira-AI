"use client"

import { EntryListCard } from "@/components/cards/EntryListCard"
import { AddEntryDialog } from "@/components/popups/AddEntryDialog"
import { skills as skillCards } from "@/data/mock-data"
import { useAddEntryDialog } from "@/hooks/use-add-entry-dialog"
import { useTopicCompletionToggle } from "@/hooks/use-topic-completion-toggle"
import { useState } from "react"
import { CurriculumSection } from "./CurriculumSection"

export function DashboardLearningClient() {
	const addEntryDialog = useAddEntryDialog()
	const [skills, setSkills] = useState(skillCards)

	const { toggleTopic: toggleTopic } = useTopicCompletionToggle<{ skillName: string; topicIndex: number }>({
		getContext: ({ skillName, topicIndex }) => {
			const selectedSkill = skills.find((skill) => skill.name === skillName)
			const selectedTopic = selectedSkill?.topics[topicIndex]

			return {
				exists: Boolean(selectedSkill && selectedTopic),
				done: selectedTopic?.done ?? false,
				skillLabel: skillName,
				topicLabel: selectedTopic?.name ?? "",
			}
		},
		onMarkIncomplete: ({ skillName, topicIndex }) => {
			setSkills((current) =>
				current.map((skill) =>
					skill.name === skillName
						? {
								...skill,
								topics: skill.topics.map((topic, index) => (index === topicIndex ? { ...topic, done: false } : topic)),
							}
						: skill,
				),
			)
		},
		onMarkComplete: ({ skillName, topicIndex }) => {
			setSkills((current) =>
				current.map((skill) =>
					skill.name === skillName
						? {
								...skill,
								topics: skill.topics.map((topic, index) => (index === topicIndex ? { ...topic, done: true } : topic)),
							}
						: skill,
				),
			)
		},
		openWithLockedContext: addEntryDialog.openWithLockedContext,
	})

	return (
		<>
			<div className="min-[900px]:col-span-4 min-[900px]:row-start-3 xl:[grid-column:1/4] xl:row-start-4">
				<CurriculumSection skills={skills} onToggleTopic={(skillName, topicIndex) => toggleTopic({ skillName, topicIndex })} />
			</div>
			<div className="min-[900px]:col-span-4 min-[900px]:row-start-4 xl:contents">
				<EntryListCard onAddEntry={addEntryDialog.open} />
			</div>
			<AddEntryDialog dialog={addEntryDialog} />
		</>
	)
}
