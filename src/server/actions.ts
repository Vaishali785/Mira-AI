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
	console.log("[createSkillAction]", { skillName, topics })

	revalidatePath("/dashboard")
	revalidatePath("/skills")

	return
}
