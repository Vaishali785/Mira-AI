"use client";

import { EntryListCard } from "@/components/cards/EntryListCard";
import { StatCard } from "@/components/cards/StatCard";
import { ActivityHeatmap } from "@/components/charts/ActivityHeatmap";
import { AreaTrendChart } from "@/components/charts/AreaTrendChart";
import { DistributionChart } from "@/components/charts/DistributionChart";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import { GreetingBanner } from "@/components/layout/GreetingBanner";
import { PageShell } from "@/components/layout/PageShell";
import { CurriculumSection } from "@/components/sections/CurriculumSection";
import { dashboardKpis } from "@/data/mock-data";
import { useThemeState } from "@/hooks/use-theme-state";

export default function DashboardPage() {
    const { activeTab, hasScrolled, heatmapCells, isLight, setActiveTab, theme, toggleTheme } = useThemeState();

    return (
        <PageShell isLight={isLight} theme={theme}>
            <div
                className="sticky top-0 z-30 -mx-3 rounded-t-[14px] px-3 transition-all duration-300 sm:-mx-5 sm:px-5"
                style={
                    hasScrolled
                        ? {
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            background: isLight
                                ? "radial-gradient(ellipse 52% 90% at 10% 0%, rgba(214,48,88,0.09) 0%, transparent 54%), radial-gradient(ellipse 40% 64% at 88% 10%, rgba(255,233,226,0.42) 0%, transparent 56%), color-mix(in srgb, var(--card) 82%, transparent)"
                                : "radial-gradient(ellipse 52% 90% at 10% 0%, rgba(255,31,90,0.12) 0%, transparent 54%), radial-gradient(ellipse 40% 64% at 88% 10%, rgba(255,255,255,0.07) 0%, transparent 56%), color-mix(in srgb, var(--card) 78%, transparent)",
                            boxShadow: isLight ? "0 18px 34px rgba(214, 48, 88, 0.14)" : "0 20px 38px rgba(255, 31, 90, 0.14)"
                        }
                        : {
                            backdropFilter: "none",
                            WebkitBackdropFilter: "none",
                            background: "transparent",
                            boxShadow: "none"
                        }
                }
            >
                <AppHeader isLight={isLight} onToggleTheme={toggleTheme} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            <GreetingBanner />

            <section className="grid gap-2 px-3 py-3 [&>*]:min-w-0 sm:px-5 min-[900px]:grid-cols-4 xl:grid-cols-[1fr_1fr_1.7fr_1fr] xl:auto-rows-[minmax(100px,auto)]">
                <div className="grid gap-2 min-[480px]:grid-cols-2 min-[900px]:col-span-2 xl:contents">
                    {dashboardKpis.map((kpi, index) => (
                        <div
                            key={kpi.label}
                            className={
                                index === 0
                                    ? "xl:col-start-1 xl:row-start-1"
                                    : index === 1
                                        ? "xl:col-start-2 xl:row-start-1"
                                        : index === 2
                                            ? "xl:col-start-1 xl:row-start-2"
                                            : "xl:col-start-2 xl:row-start-2"
                            }
                        >
                            <StatCard stat={kpi} isLight={isLight} />
                        </div>
                    ))}
                </div>

                <div className="min-[900px]:col-span-2 min-[900px]:row-start-1 xl:contents">
                    <AreaTrendChart />
                </div>
                <div className="min-[900px]:col-span-1 min-[900px]:row-start-2 xl:col-start-1 xl:[grid-column:1/2] xl:[grid-row:3/4]">
                    <DistributionChart />
                </div>
                <div className="min-[900px]:col-span-3 min-[900px]:row-start-2 xl:[grid-column:2/4] xl:row-start-3">
                    <ActivityHeatmap cells={heatmapCells} />
                </div>
                <div className="min-[900px]:col-span-4 min-[900px]:row-start-3 xl:[grid-column:1/4] xl:row-start-4">
                    <CurriculumSection />
                </div>
                <div className="min-[900px]:col-span-4 min-[900px]:row-start-4 xl:contents">
                    <EntryListCard />
                </div>
            </section>
            <AppFooter />
        </PageShell>
    );
}
