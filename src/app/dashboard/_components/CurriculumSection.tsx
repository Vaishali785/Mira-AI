import { SkillCard } from "@/components/cards/SkillCard";
import { SkillCard as SkillCardType } from "@/types/app-types";

type CurriculumSectionProps = {
    skills: SkillCardType[];
    onToggleLesson?: (skillName: string, lessonIndex: number) => void;
};

export function CurriculumSection({ skills, onToggleLesson }: CurriculumSectionProps) {
    return (
        <section>
            <div className="mb-2">
                <div className="mira-eyebrow">Skills</div>
                <div className="mt-[2px] text-[15px] font-bold">Active Curriculum</div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:items-start">
                {skills.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} onToggleLesson={(lessonIndex) => onToggleLesson?.(skill.name, lessonIndex)} />
                ))}
            </div>
        </section>
    );
}
