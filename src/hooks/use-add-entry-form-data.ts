"use client"

import { entrySkills } from "@/data/mock-data"
import { useMemo, useState } from "react"

const tones = ["Educational", "Casual", "Professional", "Storytelling", "Reflective"] as const
const format = ["Single Tweet", "Thread", "Quick Insight", "Weekly Summary"] as const

export type AddEntrySubmitPayload = {
	skillLabel: string
	topicLabel: string
	userEntry: string
	tone: (typeof tones)[number]
	postStyle: (typeof format)[number]
}

type LockedEntryContext = {
	skillLabel: string
	topicLabel: string
}

type EntryData = {
	skillId: string
	topicId: string
	userEntry: string
	tone: (typeof tones)[number]
	postStyle: (typeof format)[number]
}

export function useAddEntryFormData() {
	const [entryData, setEntryData] = useState<EntryData>({
		skillId: entrySkills[0].id,
		topicId: entrySkills[0].topics[0].id,
		userEntry: "",
		tone: "Educational",
		postStyle: "Single Tweet",
	})
	const [isSkillTopicLocked, setIsSkillTopicLocked] = useState(false)
	const [lockedSkillLabel, setLockedSkillLabel] = useState("")
	const [lockedTopicLabel, setLockedTopicLabel] = useState("")

	const selectedSkill = useMemo(() => entrySkills.find((skill) => skill.id === entryData.skillId) ?? entrySkills[0], [entryData.skillId])
	const topicOptions = selectedSkill.topics

	const resetForOpen = () => {
		setEntryData({
			skillId: entrySkills[0].id,
			topicId: entrySkills[0].topics[0].id,
			userEntry: "",
			tone: "Educational",
			postStyle: "Single Tweet",
		})
		setIsSkillTopicLocked(false)
		setLockedSkillLabel("")
		setLockedTopicLabel("")
	}

	const lockSkillTopic = (params: LockedEntryContext) => {
		setIsSkillTopicLocked(true)
		setLockedSkillLabel(params.skillLabel)
		setLockedTopicLabel(params.topicLabel)
	}

	const onSkillChange = (nextSkillId: string) => {
		const nextSkill = entrySkills.find((skill) => skill.id === nextSkillId)
		setEntryData((current) => ({
			...current,
			skillId: nextSkillId,
			topicId: nextSkill?.topics[0]?.id ?? "",
		}))
	}

	const setTopicId = (topicId: string) => {
		setEntryData((current) => ({ ...current, topicId }))
	}

	const setUserEntry = (userEntry: string) => {
		setEntryData((current) => ({ ...current, userEntry }))
	}

	const setTone = (tone: (typeof tones)[number]) => {
		setEntryData((current) => ({ ...current, tone }))
	}

	const setPostStyle = (postStyle: (typeof format)[number]) => {
		setEntryData((current) => ({ ...current, postStyle }))
	}

	const getSubmitPayload = (): AddEntrySubmitPayload => {
		const selectedTopic = topicOptions.find((topic) => topic.id === entryData.topicId)
		const skillLabel = isSkillTopicLocked ? lockedSkillLabel : selectedSkill.label
		const topicLabel = isSkillTopicLocked ? lockedTopicLabel : (selectedTopic?.label ?? "")

		return {
			skillLabel,
			topicLabel,
			userEntry: entryData.userEntry.trim(),
			tone: entryData.tone,
			postStyle: entryData.postStyle,
		}
	}

	return {
		entryData,
		isSkillTopicLocked,
		lockedSkillLabel,
		lockedTopicLabel,
		// skills: entrySkills,
		topicOptions,
		tones,
		format,
		onSkillChange,
		setTopicId,
		setUserEntry,
		setTone,
		setPostStyle,
		resetForOpen,
		lockSkillTopic,
		getSubmitPayload,
	}
}
