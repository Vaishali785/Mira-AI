import { SkillCard } from "@/components/cards/SkillCard"
// import { skills } from "@/data/mock-data";
import { useSkills } from "@/store/skillsStore"

export function CurriculumSection() {
	const skills = useSkills()
	return (
		<section>
			<div className="mb-2">
				<div className="mira-eyebrow">Skills</div>
				<div className="mt-[2px] text-[15px] font-bold">Active Curriculum</div>
			</div>

			<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:items-start">
				{skills.map((skill) => (
					<SkillCard key={skill.name} skill={skill} />
				))}
			</div>
		</section>
	)
}
