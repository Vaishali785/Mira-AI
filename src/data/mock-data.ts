import { aiTopics, machineLearningTopics, nextJsTopics, typeScriptTopics } from "@/data/skill-detail-data";
import { DashboardTab, Entry, EntrySkill, FocusSlice, Kpi, Skill } from "@/types/app-types";

export const dashboardTabs: DashboardTab[] = ["Overview", "Skills", "Analytics", "Posts", "Settings"];

export const dashboardKpis: Kpi[] = [
    { label: "Skills Active", value: "7", sub: "+2 this week", icon: "book" },
    { label: "Completed", value: "12", sub: "3 this month", icon: "check" },
    { label: "Weekly Hours", value: "18h", sub: "+4.2h vs last week", icon: "clock" },
    { label: "Posts Made", value: "34", sub: "All time", icon: "post" }
];

export const skills: Skill[] = [
    {
        skillId: 1,
        createdOn: "Nov 12, 2024",
        name: "Machine Learning",
        status: "Active",
        progress: 65,
        // gradient: "linear-gradient(90deg,var(--rose),#FF7BAA)",
        topics: machineLearningTopics
    },
    {
        skillId: 2,
        createdOn: "Oct 8, 2024",
        name: "TypeScript",
        status: "Active",
        progress: 80,
        // gradient: "linear-gradient(90deg,var(--rose),#FF7BAA)",
        topics: typeScriptTopics
    },
    {
        skillId: 3,
        createdOn: "Sep 1, 2024",
        name: "Next.js",
        status: "Done",
        progress: 92,
        // gradient: "linear-gradient(90deg,var(--rose),#FFB3CC)",
        topics: nextJsTopics
    },
    {
        skillId: 4,
        createdOn: "Dec 3, 2024",
        name: "AI",
        status: "Active",
        progress: 50,
        // gradient: "linear-gradient(90deg,var(--rose),#FFB3CC)",
        topics: aiTopics
    }
];

export const entries: Entry[] = [
    {
        title: "Gradient descent & backpropagation",
        meta: "Today · 9:42 PM",
        tag: "ML",
        dot: "var(--rose)",
        tagStyle: { background: "var(--rose-dim)", color: "var(--rose)" }
    },
    {
        title: "TypeScript generics deep dive",
        meta: "Yesterday · 3:15 PM",
        tag: "TS",
        dot: "#FF7BAA",
        tagStyle: { background: "rgba(255,123,170,0.15)", color: "#FF7BAA" }
    },
    {
        title: "CAP theorem and consensus",
        meta: "Dec 12 · 11:00 AM",
        tag: "SYS",
        dot: "#FFB3CC",
        tagStyle: { background: "rgba(255,179,204,0.15)", color: "#FFB3CC" }
    },
    {
        title: "Feature engineering pipeline",
        meta: "Dec 11 · 7:30 PM",
        tag: "ML",
        dot: "#FFCFDE",
        tagStyle: { background: "rgba(255,207,222,0.15)", color: "#FFB3CC" }
    }
];

export const entrySkills: EntrySkill[] = skills.map((skill) => ({
	id: String(skill.skillId),
	label: skill.name,
	topics: skill.topics.map((topic) => ({
		id: String(topic.id),
		label: topic.name,
	})),
}))


export const focusSlices: FocusSlice[] = [
    { label: "AI & ML", value: "40%", percent: 40, color: "#FF1F5A" },
    { label: "Frontend", value: "25%", percent: 25, color: "#FF7BAA" },
    { label: "Systems", value: "20%", percent: 20, color: "#FFB3CC" },
    { label: "Other", value: "15%", percent: 15, color: "#FFCFDE" }
];

export const heatmapLegend = [
    "var(--card2)",
    "rgba(255,31,90,0.22)",
    "rgba(255,31,90,0.50)",
    "rgba(255,31,90,0.80)",
    "#FF1F5A"
];

export const streakStats = [
    { label: "Longest streak", value: "14 days" },
    { label: "Total sessions", value: "182" },
    { label: "Active days", value: "78%" }
];
