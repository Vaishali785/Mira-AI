import { PageShell } from "@/components/layout/PageShell"
import { SkillDetailInteractiveClient } from "./_components/SkillDetailInteractiveClient"
type Props = {
	params: Promise<{
		slug: string
	}>
}

export default async function SkillDetailPage({ params }: Props) {
	const { slug: skillId } = await params
	return (
		<PageShell initialTab="Skills">
			<SkillDetailInteractiveClient skillId={skillId} />
		</PageShell>
	)
}
