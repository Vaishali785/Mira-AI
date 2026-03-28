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
