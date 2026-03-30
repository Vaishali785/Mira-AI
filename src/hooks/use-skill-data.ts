"use client"

import { useState } from "react"

export type SkillData = {
	skillName: string
	topics: string[]
}

const emptySkillData: SkillData = {
	skillName: "",
	topics: [],
}

export function useSkillData() {
	const [skillData, setSkillData] = useState<SkillData>(emptySkillData)
	const [topicInput, setTopicInput] = useState("")

	const resetSkillData = () => {
		setSkillData(emptySkillData)
		setTopicInput("")
	}

	const setSkillName = (value: string) => {
		setSkillData((current) => ({ ...current, skillName: value }))
	}

	const addTopic = (rawTopic: string) => {
		const topic = rawTopic.trim()
		if (!topic) return
		setSkillData((current) => ({ ...current, topics: [...current.topics, topic] }))
	}

	const addTopicFromInput = () => {
		addTopic(topicInput)
		setTopicInput("")
	}

	const removeTopic = (topicIndex: number) => {
		setSkillData((current) => ({
			...current,
			topics: current.topics.filter((_, index) => index !== topicIndex),
		}))
	}

	const replaceTopics = (topics: string[]) => {
		const cleanedTopics = topics.map((topic) => topic.trim()).filter(Boolean)
		setSkillData((current) => ({ ...current, topics: cleanedTopics }))
	}

	return {
		skillData,
		topicInput,
		setTopicInput,
		setSkillName,
		addTopic,
		addTopicFromInput,
		removeTopic,
		replaceTopics,
		resetSkillData,
	}
}
