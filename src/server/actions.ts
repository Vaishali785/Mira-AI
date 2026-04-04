"use server"

import { revalidatePath } from "next/cache"

export async function createSkillAction(formData: FormData) {
	const skillName = String(formData.get("skillName") ?? "").trim()
	const topicsRaw = String(formData.get("topics") ?? "").trim()

	const topics = topicsRaw
		.split("\n")
		.map((topic) => topic.trim())
		.filter(Boolean)

	if (!skillName) {
		return
	}

	// TODO: persist in DB/store when backend is connected.

	revalidatePath("/dashboard")
	revalidatePath("/skills")

	return
}

export async function createEntryAction(formData: FormData) {
	const skillLabel = String(formData.get("skillLabel") ?? "").trim()
	const topicLabel = String(formData.get("topicLabel") ?? "").trim()
	const userEntry = String(formData.get("userEntry") ?? "").trim()
	const tone = String(formData.get("tone") ?? "").trim()
	const postStyle = String(formData.get("postStyle") ?? "").trim()

	if (!skillLabel || !topicLabel) {
		return
	}

	// TODO: persist in DB/store when backend is connected.

	revalidatePath("/dashboard")
	revalidatePath("/skills")

	return
}
