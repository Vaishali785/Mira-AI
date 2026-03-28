"use client";

import { AddEntryDialog } from "@/components/popups/AddEntryDialog";
import { SkillDetailHeader } from "./SkillDetailHeader";
import { SkillPostDialog } from "./SkillPostDialog";
import { SkillTopicsTable } from "./SkillTopicsTable";
import { machineLearningTopics } from "@/data/skill-detail-data";
import { useAddEntryDialog } from "@/hooks/use-add-entry-dialog";
import { useDialogOverlay } from "@/hooks/use-dialog-overlay";
import { useTopicCompletionToggle } from "@/hooks/use-topic-completion-toggle";
import { formatShortDate } from "@/lib/general-utils";
import { useState } from "react";

export function SkillDetailInteractiveClient() {
    const addEntryDialog = useAddEntryDialog();
    const [topics, setTopics] = useState(machineLearningTopics);
    const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
    const postDialog = useDialogOverlay({ onClose: () => setSelectedTopicId(null) });
    const completedCount = topics.filter((topic) => topic.done).length;
    const progressPct = Math.round((completedCount / topics.length) * 100);
    const selectedTopic = topics.find((topic) => topic.id === selectedTopicId) ?? null;

    const { toggleTopic } = useTopicCompletionToggle<number>({
        getContext: (topicId) => {
            const topic = topics.find((item) => item.id === topicId);
            return {
                exists: Boolean(topic),
                done: topic?.done ?? false,
                skillLabel: "Machine Learning",
                topicLabel: topic?.name ?? ""
            };
        },
        onMarkIncomplete: (topicId) => {
            setTopics((current) =>
                current.map((item) => (item.id === topicId ? { ...item, done: false, date: null } : item))
            );
        },
        onMarkComplete: (topicId) => {
            setTopics((current) =>
                current.map((item) =>
                    item.id === topicId ? { ...item, done: true, date: item.date ?? formatShortDate() } : item
                )
            );
        },
        openWithLockedContext: addEntryDialog.openWithLockedContext
    });

    const openTopicPost = (topicId: number) => {
        setSelectedTopicId(topicId);
        postDialog.open();
    };

    return (
        <>
            <SkillDetailHeader completedCount={completedCount} progressPct={progressPct} />
            <div className="px-0 pb-16 sm:px-5">
                <SkillTopicsTable topics={topics} onOpenPost={openTopicPost} onToggleTopic={toggleTopic} />
            </div>
            <AddEntryDialog dialog={addEntryDialog} />
            <SkillPostDialog topic={postDialog.isOpen ? selectedTopic : null} onClose={postDialog.close} />
        </>
    );
}
