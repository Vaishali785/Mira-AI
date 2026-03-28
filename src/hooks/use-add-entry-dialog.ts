"use client";

import { useMemo, useState } from "react";
import { useDialogOverlay } from "@/hooks/use-dialog-overlay";

type EntrySkill = {
    id: string;
    label: string;
    topics: Array<{ id: string; label: string }>;
};

const entrySkills: EntrySkill[] = [
    {
        id: "ml",
        label: "Machine Learning",
        topics: [
            { id: "gradient", label: "Gradient Descent" },
            { id: "backprop", label: "Backpropagation" },
            { id: "eval", label: "Model Evaluation" },
            { id: "deploy", label: "Deployment" }
        ]
    },
    {
        id: "ts",
        label: "TypeScript",
        topics: [
            { id: "types", label: "Type System" },
            { id: "generics", label: "Generics" },
            { id: "utility", label: "Utility Types" },
            { id: "patterns", label: "Advanced Patterns" }
        ]
    },
    {
        id: "nextjs",
        label: "Next.js",
        topics: [
            { id: "router", label: "App Router" },
            { id: "server-components", label: "Server Components" },
            { id: "api", label: "API Routes" },
            { id: "deployment", label: "Deployment" }
        ]
    },
    {
        id: "sysdesign",
        label: "System Design",
        topics: [
            { id: "cap", label: "CAP Theorem" },
            { id: "caching", label: "Caching" },
            { id: "queues", label: "Queues & Streams" },
            { id: "consistency", label: "Consistency Models" }
        ]
    }
];

const tones = ["Educational", "Casual", "Professional", "Storytelling"] as const;
const styles = ["Single Tweet", "Thread", "Quick Insight", "Weekly Summary"] as const;

export const useAddEntryDialog = () => {
    const { isOpen, open: openOverlay, close } = useDialogOverlay();
    const [skillId, setSkillId] = useState(entrySkills[0].id);
    const [topicId, setTopicId] = useState(entrySkills[0].topics[0].id);
    const [learned, setLearned] = useState("");
    const [why, setWhy] = useState("");
    const [tone, setTone] = useState<(typeof tones)[number]>("Educational");
    const [postStyle, setPostStyle] = useState<(typeof styles)[number]>("Single Tweet");
    const [isSkillTopicLocked, setIsSkillTopicLocked] = useState(false);
    const [lockedSkillLabel, setLockedSkillLabel] = useState("");
    const [lockedTopicLabel, setLockedTopicLabel] = useState("");
    const [onSubmitAction, setOnSubmitAction] = useState<null | (() => void)>(null);

    const selectedSkill = useMemo(() => entrySkills.find((skill) => skill.id === skillId) ?? entrySkills[0], [skillId]);
    const topicOptions = selectedSkill.topics;

    const open = () => {
        setSkillId(entrySkills[0].id);
        setTopicId(entrySkills[0].topics[0].id);
        setLearned("");
        setWhy("");
        setTone("Educational");
        setPostStyle("Single Tweet");
        setIsSkillTopicLocked(false);
        setLockedSkillLabel("");
        setLockedTopicLabel("");
        setOnSubmitAction(null);
        openOverlay();
    };

    const openWithLockedContext = (params: { skillLabel: string; topicLabel: string; onSubmit?: () => void }) => {
        setSkillId(entrySkills[0].id);
        setTopicId(entrySkills[0].topics[0].id);
        setLearned("");
        setWhy("");
        setTone("Educational");
        setPostStyle("Single Tweet");
        setIsSkillTopicLocked(true);
        setLockedSkillLabel(params.skillLabel);
        setLockedTopicLabel(params.topicLabel);
        setOnSubmitAction(() => params.onSubmit ?? null);
        openOverlay();
    };

    const onSkillChange = (nextSkillId: string) => {
        setSkillId(nextSkillId);
        const nextSkill = entrySkills.find((skill) => skill.id === nextSkillId);
        setTopicId(nextSkill?.topics[0]?.id ?? "");
    };

    const submit = () => {
        onSubmitAction?.();
        close();
    };

    return {
        isOpen,
        close,
        open,
        openWithLockedContext,
        submit,
        isSkillTopicLocked,
        lockedSkillLabel,
        lockedTopicLabel,
        skillId,
        topicId,
        learned,
        why,
        tone,
        postStyle,
        skills: entrySkills,
        topicOptions,
        tones,
        styles,
        onSkillChange,
        setTopicId,
        setLearned,
        setWhy,
        setTone,
        setPostStyle
    };
};
