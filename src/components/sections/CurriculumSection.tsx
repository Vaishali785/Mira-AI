import { SkillCard } from "@/components/cards/SkillCard";
import { skillCards } from "@/data/mock-data";

export function CurriculumSection() {
    return (
        <section>
            <div className="mb-2">
                <div className="mira-eyebrow">Skills</div>
                <div className="mt-[2px] text-[15px] font-bold">Active Curriculum</div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:items-start">
                {skillCards.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                ))}
            </div>
        </section>
    );
}
