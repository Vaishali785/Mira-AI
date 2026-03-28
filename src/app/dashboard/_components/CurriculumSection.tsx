import { SkillCard } from "@/components/cards/SkillCard"
import { Skill as SkillCardType } from "@/types/app-types"

type CurriculumSectionProps = {
	skills: SkillCardType[]
	onToggleTopic?: (skillName: string, topicIndex: number) => void
}

export function CurriculumSection({ skills, onToggleTopic }: CurriculumSectionProps) {
	return (
		<section>
			<div className="mb-2">
				<div className="mira-eyebrow">Skills</div>
				<div className="mt-[2px] text-[15px] font-bold">Active Curriculum</div>
			</div>

			<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:items-start">
				{skills.map((skill) => (
					<SkillCard key={skill.name} skill={skill} onToggleTopic={(topicIndex: number) => onToggleTopic?.(skill.name, topicIndex)} />
				))}
			</div>
		</section>
	)
}
