"use client";

import { PageShell } from "@/components/layout/PageShell";
import { SkillDetailHeader } from "@/components/skills/SkillDetailHeader";
import { SkillPostDialog } from "@/components/skills/SkillPostDialog";
import { SkillTopicsTable } from "@/components/skills/SkillTopicsTable";
import { machineLearningTopics } from "@/data/skill-detail-data";
import { useThemeState } from "@/hooks/use-theme-state";
import { useEffect, useState } from "react";

export default function SkillDetailPage() {
    const { activeTab, hasScrolled, isLight, setActiveTab, theme, toggleTheme } = useThemeState("Skills");
    const [topics, setTopics] = useState(machineLearningTopics);
    const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);
    const completedCount = topics.filter((topic) => topic.done).length;
    const progressPct = Math.round((completedCount / topics.length) * 100);
    const selectedTopic = topics.find((topic) => topic.id === selectedTopicId) ?? null;

    useEffect(() => {
        if (!selectedTopic) {
            document.body.style.overflow = "";
            return;
        }

        document.body.style.overflow = "hidden";

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedTopicId(null);
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [selectedTopic]);

    useEffect(() => {
        if (!copied) {
            return;
        }

        const timeout = window.setTimeout(() => setCopied(false), 1800);
        return () => window.clearTimeout(timeout);
    }, [copied]);

    const toggleTopic = (topicId: number) => {
        console.log(">>>>clicked", topicId, topics)
        setTopics((current) => current.map((topic) => (topic.id === topicId ? { ...topic, done: !topic.done } : topic)));
    };

    const handleCopy = async () => {
        if (!selectedTopic?.post) {
            return;
        }

        try {
            await navigator.clipboard.writeText(selectedTopic.post);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    };

    return (
        <PageShell
            isLight={isLight}
            theme={theme}
            hasScrolled={hasScrolled}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onToggleTheme={toggleTheme}
        >
            <SkillDetailHeader completedCount={completedCount} progressPct={progressPct} />
            <div className="px-3 pb-16 sm:px-5">
                <SkillTopicsTable isLight={isLight} topics={topics} onOpenPost={setSelectedTopicId} onToggleTopic={toggleTopic} />
            </div>
            <SkillPostDialog copied={copied} topic={selectedTopic} onClose={() => setSelectedTopicId(null)} onCopy={handleCopy} />
        </PageShell>
    );
}
