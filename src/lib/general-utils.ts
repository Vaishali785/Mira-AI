export const formatShortDate = (date: Date = new Date()) =>
	new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(date)

export const copyTextToClipboard = async (text: string): Promise<boolean> => {
	const value = text.trim()

	if (!value) {
		return false
	}

	try {
		await navigator.clipboard.writeText(value)
		return true
	} catch {
		return false
	}
}

export const buildLearningPost = (topicName: string, userEntry: string, tone: string, postStyle: string, skillName: string) => {
	const base = userEntry.trim()
	if (!base) return ""

	return [`Learning update on ${topicName}:`, "", base, "", `Tone: ${tone} · Format: ${postStyle}`, `#${skillName.replace(/\s+/g, "")}`].join("\n")
}
