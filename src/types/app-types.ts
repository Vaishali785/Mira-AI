import { CSSProperties } from "react";

export type DashboardTab = "Overview" | "Skills" | "Analytics" | "Posts" | "Settings";

export type KpiIcon = "book" | "check" | "clock" | "post";

export type Kpi = {
    label: string;
    value: string;
    sub: string;
    icon: KpiIcon;
};

export type SkillLesson = {
    label: string;
    done: boolean;
};

export type SkillCard = {
    name: string;
    status: "Active" | "Done" | "Paused";
    progress: number;
    gradient: string;
    lessons: SkillLesson[];
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
