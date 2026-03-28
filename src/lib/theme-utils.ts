import { CSSProperties } from "react";

export const getDashboardTheme = (isLight: boolean): CSSProperties =>
    ({
        "--bg": isLight ? "#E6E2DE" : "#0D0C0C",
        "--card": isLight ? "#F2EEEA" : "#161414",
        "--card2": isLight ? "#E4DED8" : "#1E1B1B",
        "--bdr": isLight ? "rgba(36,19,22,0.08)" : "rgba(255,255,255,0.09)",
        "--bdr2": isLight ? "rgba(36,19,22,0.14)" : "rgba(255,255,255,0.19)",
        "--tx": isLight ? "#1A1614" : "#F2EEE8",
        "--tx2": isLight ? "#66605B" : "#B1AAA4",
        "--tx3": isLight ? "#8B847F" : "#8A827D",
        "--rose": isLight ? "#D63058" : "#FF1F5A",
        "--rose-dim": isLight ? "rgba(214,48,88,0.07)" : "rgba(255,31,90,0.10)",
        "--rose-glow": isLight ? "rgba(214,48,88,0.12)" : "rgba(255,31,90,0.16)",
        "--icon-chip": isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.07)",
        "--topics-table-glow": isLight ? "rgba(248,244,240,0.3)" : "rgba(255,255,255,0.03)",
        "--topics-table-row-hover": isLight ? "rgba(0,0,0,0.025)" : "rgba(255,255,255,0.025)",
        "--heat-0": isLight ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.06)",
        "--heat-1": "rgba(255,31,90,0.22)",
        "--heat-2": "rgba(255,31,90,0.46)",
        "--heat-3": "rgba(255,31,90,0.74)",
        "--heat-4": "rgba(255,31,90,1)"
    }) as CSSProperties;

const seededRandom = (seed: number) => {
    const value = Math.sin(seed + 1) * 10000;
    return value - Math.floor(value);
};

const heatColor = (level: number) => `var(--heat-${level})`;

export const createHeatmapCells = () =>
    Array.from({ length: 5 * 30 }, (_, index) => {
        const row = Math.floor(index / 30);
        const col = index % 30;
        const random = seededRandom(col * 5 + row);
        const level = random > 0.62 ? 0 : random > 0.42 ? 1 : random > 0.22 ? 2 : random > 0.09 ? 3 : 4;

        return {
            id: `${row}-${col}`,
            title: level === 0 ? "No sessions" : `${level * 2} sessions`,
            background: heatColor(level)
        };
    });
