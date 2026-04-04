"use client"

import { AddEntrySubmitPayload, useAddEntryFormData } from "@/hooks/use-add-entry-form-data"
import { useDialogOverlay } from "@/hooks/use-dialog-overlay"
import { buildLearningPost, formatShortDate } from "@/lib/general-utils"
import { useAddEntry, useAddPost, usePosts, useSkills, useUpdateSkillTopic } from "@/store/skillsStore"

type LockedContextParams = {
	skillLabel: string
	topicLabel: string
}

export function useAddEntryDialog() {
	const form = useAddEntryFormData()
	const skills = useSkills()
	const posts = usePosts()
	const addPost = useAddPost()
	const addEntry = useAddEntry()
	const updateTopicStatus = useUpdateSkillTopic()

	const dialog = useDialogOverlay({
		onOpen: form.resetForOpen,
		onClose: form.resetForOpen,
		onOpenWithContext: (params: LockedContextParams) => {
			form.resetForOpen()
			form.lockSkillTopic({
				skillLabel: params.skillLabel,
				topicLabel: params.topicLabel,
			})
		},
	})

	const submit = () => {
		const payload = form.getSubmitPayload()
		if (!payload.userEntry.trim()) return

		const selectedSkill = form.isSkillTopicLocked
			? skills.find((skill) => skill.name === payload.skillLabel)
			: skills.find((skill) => skill.skillId === Number(form.entryData.skillId))
		const selectedTopic = selectedSkill
			? form.isSkillTopicLocked
				? selectedSkill.topics.find((topic) => topic.name === payload.topicLabel)
				: selectedSkill.topics.find((topic) => topic.id === Number(form.entryData.topicId))
			: undefined

		const createdOn = formatShortDate()
		const nextPostId = posts.length ? Math.max(...posts.map((post) => post.id)) + 1 : 1
		const resolvedSkillName = selectedSkill?.name ?? payload.skillLabel
		const resolvedTopicName = selectedTopic?.name ?? payload.topicLabel
		const resolvedSkillId = selectedSkill?.skillId ?? (Number(form.entryData.skillId) || 0)
		const resolvedTopicId = selectedTopic?.id ?? (Number(form.entryData.topicId) || 0)

		addPost({
			id: nextPostId,
			skillName: resolvedSkillName,
			skillId: resolvedSkillId,
			topicName: resolvedTopicName,
			topicId: resolvedTopicId,
			createdOn,
			tone: payload.tone,
			format: payload.postStyle,
			post: buildLearningPost(resolvedTopicName, payload.userEntry, payload.tone, payload.postStyle, resolvedSkillName),
			userEntry: payload.userEntry,
		})

		addEntry({
			title: payload.userEntry || `Completed: ${resolvedTopicName}`,
			meta: `${createdOn} · ${resolvedTopicName}`,
			tag: resolvedSkillName.slice(0, 2).toUpperCase(),
			dot: "var(--rose)",
			tagStyle: { background: "var(--rose-dim)", color: "var(--rose)" },
		})

		if (selectedSkill && selectedTopic) {
			updateTopicStatus({
				skillId: selectedSkill.skillId,
				topicId: selectedTopic.id,
				done: true,
				finishedOn: createdOn,
				postId: nextPostId,
				userEntry: payload.userEntry,
			})
		}

		dialog.close()
	}

	return {
		isOpen: dialog.isOpen,
		open: dialog.open,
		close: dialog.close,
		openWithLockedContext: dialog.openWithContext,
		submit,
		...form,
	}
}

export type { AddEntrySubmitPayload }
