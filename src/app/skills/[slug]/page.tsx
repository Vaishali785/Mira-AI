import { PageShell } from "@/components/layout/PageShell"
import { SkillDetailInteractiveClient } from "./_components/SkillDetailInteractiveClient"

export default function SkillDetailPage() {
	return (
		<PageShell initialTab="Skills">
			<SkillDetailInteractiveClient />
		</PageShell>
	)
}
