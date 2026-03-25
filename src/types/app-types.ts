import { CSSProperties } from "react";

export type DashboardTab = "Overview" | "Skills" | "Analytics" | "Posts" | "Settings";

export type KpiIcon = "book" | "check" | "clock" | "post";

export type Kpi = {
    label: string;
    value: string;
    sub: string;
    icon: KpiIcon;
};

export type SkillTopicAsset = {
    label: string;
    url: string;
};

export type SkillTopicPreview = {
    id: number;
    name: string;
    done: boolean;
};

export type PostTone = "Educational" | "Reflective" | "Bold";

export type PostFormat = "X Post" | "X Thread" | "LinkedIn Post";

export type Post = {
    id: number;
    skillName: string;
    skillId: number;
    topicName: string;
    topicId: number;
    createdOn: string;
    tone: PostTone;
    format: PostFormat;
    userEntry?: string;
};

export type SkillTopic = {
    id: number;
    skillId: number;
    done: boolean;
    name: string;
    finishedOn: string | null;
    asset: SkillTopicAsset | null;
    postIds: number[];
    userEntry?: string;
};

export type Skill = {
    skillId: number;
    createdOn: string;
    name: string;
    status: "Active" | "Done" | "Paused";
    progress: number;
    gradient: string;
    topics: SkillTopicPreview[];
};

export type Entry = {
    title: string;
    meta: string;
    tag: string;
    dot: string;
    tagStyle: CSSProperties;
};

export type FocusSlice = {
    label: string;
    value: string;
    percent: number;
    color: string;
};

export type HeatmapCell = {
    id: string;
    title: string;
    background: string;
};
