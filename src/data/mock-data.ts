import { DashboardTab, Entry, FocusSlice, Kpi, SkillCard } from "@/types/app-types";

export const dashboardTabs: DashboardTab[] = ["Overview", "Skills", "Analytics", "Posts", "Settings"];

export const dashboardKpis: Kpi[] = [
    { label: "Skills Active", value: "7", sub: "+2 this week", icon: "book" },
    { label: "Completed", value: "12", sub: "3 this month", icon: "check" },
    { label: "Weekly Hours", value: "18h", sub: "+4.2h vs last week", icon: "clock" },
    { label: "Posts Made", value: "34", sub: "All time", icon: "post" }
];

export const skillCards: SkillCard[] = [
    {
        name: "Machine Learning",
        status: "Active",
        progress: 65,
        gradient: "linear-gradient(90deg,var(--rose),var(--rose))",
        lessons: [
            { label: "Linear Regression", done: true },
            { label: "Feature Engineering", done: true },
            { label: "Model Evaluation", done: false },
            { label: "Deployment", done: false }
        ]
    },
    {
        name: "TypeScript",
        status: "Active",
        progress: 80,
        gradient: "linear-gradient(90deg,var(--rose),#FF7BAA)",
        lessons: [
            { label: "Type System", done: true },
            { label: "Generics", done: true },
            { label: "Utility Types", done: true },
            { label: "Advanced Patterns", done: false }
        ]
    },
    {
        name: "Next.js",
        status: "Done",
        progress: 92,
        gradient: "linear-gradient(90deg,var(--rose),#FFB3CC)",
        lessons: [
            { label: "App Router", done: true },
            { label: "Server Components", done: true },
            { label: "API Routes", done: true },
            { label: "Deployment", done: true }
        ]
    },
    {
        name: "AI",
        status: "Active",
        progress: 50,
        gradient: "linear-gradient(90deg,var(--rose),#FFB3CC)",
        lessons: [
            { label: "LLM / Transformer", done: true },
            { label: "Embeddings", done: true },
            { label: "RAG", done: false },
            { label: "Deployment", done: false }
        ]
    }
];

export const journalEntries: Entry[] = [
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
