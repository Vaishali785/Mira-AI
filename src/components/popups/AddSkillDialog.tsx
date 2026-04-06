"use client"

import { AddSkillForm } from "@/components/forms/AddSkillForm"
import { useAddSkillDialog } from "@/features/skills/use-add-skill-dialog"
import { AddSkillStepper } from "../sections/AddSkillStepper"
import { DialogShell } from "./DialogShell"

type AddSkillDialogProps = {
	dialog: ReturnType<typeof useAddSkillDialog>
}

export function AddSkillDialog({ dialog }: AddSkillDialogProps) {
	return (
		<DialogShell isOpen={dialog.isOpen} title={dialog.popupTitle} subtitle={dialog.popupSubtitle} onClose={dialog.close}>
			<div className="px-[18px] pt-[18px]">
				<AddSkillStepper step={dialog.step} topicsLen={dialog.skillData.topics.length} />
			</div>
			<AddSkillForm dialog={dialog} />
		</DialogShell>
	)
}
