import { AddEntryForm } from "@/components/forms/AddEntryForm"
import { useAddEntryDialog } from "@/features/entries/use-add-entry-dialog"
import { DialogShell } from "./DialogShell"

type AddEntryDialogProps = {
	dialog: ReturnType<typeof useAddEntryDialog>
}

export function AddEntryDialog({ dialog }: AddEntryDialogProps) {
	return (
		<DialogShell
			isOpen={dialog.isOpen}
			eyebrow="Learning Journal"
			title="Add Entry"
			subtitle="Log what you learned and generate an X post"
			onClose={dialog.close}
		>
			<AddEntryForm dialog={dialog} />
		</DialogShell>
	)
}
