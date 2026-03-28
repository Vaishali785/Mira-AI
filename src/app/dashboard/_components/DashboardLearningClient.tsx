"use client";

import { EntryListCard } from "@/components/cards/EntryListCard";
import { AddEntryDialog } from "@/components/popups/AddEntryDialog";
import { CurriculumSection } from "./CurriculumSection";
import { skillCards } from "@/data/mock-data";
import { useAddEntryDialog } from "@/hooks/use-add-entry-dialog";
import { useTopicCompletionToggle } from "@/hooks/use-topic-completion-toggle";
import { useState } from "react";

export function DashboardLearningClient() {
    const addEntryDialog = useAddEntryDialog();
    const [skills, setSkills] = useState(skillCards);

    const { toggleTopic: toggleLesson } = useTopicCompletionToggle<{ skillName: string; lessonIndex: number }>({
        getContext: ({ skillName, lessonIndex }) => {
            const selectedSkill = skills.find((skill) => skill.name === skillName);
            const selectedLesson = selectedSkill?.lessons[lessonIndex];

            return {
                exists: Boolean(selectedSkill && selectedLesson),
                done: selectedLesson?.done ?? false,
                skillLabel: skillName,
                topicLabel: selectedLesson?.label ?? ""
            };
        },
        onMarkIncomplete: ({ skillName, lessonIndex }) => {
            setSkills((current) =>
                current.map((skill) =>
                    skill.name === skillName
                        ? {
                              ...skill,
                              lessons: skill.lessons.map((lesson, index) =>
                                  index === lessonIndex ? { ...lesson, done: false } : lesson
                              )
                          }
                        : skill
                )
            );
        },
        onMarkComplete: ({ skillName, lessonIndex }) => {
            setSkills((current) =>
                current.map((skill) =>
                    skill.name === skillName
                        ? {
                              ...skill,
                              lessons: skill.lessons.map((lesson, index) =>
                                  index === lessonIndex ? { ...lesson, done: true } : lesson
                              )
                          }
                        : skill
                )
            );
        },
        openWithLockedContext: addEntryDialog.openWithLockedContext
    });

    return (
        <>
            <div className="min-[900px]:col-span-4 min-[900px]:row-start-3 xl:[grid-column:1/4] xl:row-start-4">
                <CurriculumSection
                    skills={skills}
                    onToggleLesson={(skillName, lessonIndex) => toggleLesson({ skillName, lessonIndex })}
                />
            </div>
            <div className="min-[900px]:col-span-4 min-[900px]:row-start-4 xl:contents">
                <EntryListCard onAddEntry={addEntryDialog.open} />
            </div>
            <AddEntryDialog dialog={addEntryDialog} />
        </>
    );
}
