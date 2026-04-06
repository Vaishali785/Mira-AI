import { useSkills } from "@/store/skillsStore"

type LockedContextParams = {
	skillLabel: string
	topicLabel: string
}

type TopicToggleTarget = {
	skillId: number
	topicId: number
}

type UseTopicCompletionToggleParams = {
	openWithLockedContext: (params: LockedContextParams) => void
}

export function useTopicCompletionToggle({ openWithLockedContext }: UseTopicCompletionToggleParams) {
	const skills = useSkills()

	const getContext = (target: TopicToggleTarget) => {
		const selectedSkill = skills.find((skill) => skill.skillId === target.skillId)
		const selectedTopic = selectedSkill?.topics.find((topic) => topic.id === target.topicId)

		return {
			exists: Boolean(selectedSkill && selectedTopic),
			skillLabel: selectedSkill?.name ?? "",
			topicLabel: selectedTopic?.name ?? "",
		}
	}

	const toggleTopic = (target: TopicToggleTarget) => {
		const context = getContext(target)
		if (!context.exists) return

		openWithLockedContext({
			skillLabel: context.skillLabel,
			topicLabel: context.topicLabel,
		})
	}

	return { toggleTopic }
}
