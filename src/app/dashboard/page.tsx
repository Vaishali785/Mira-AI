"use client";

import { EntryListCard } from "@/components/cards/EntryListCard";
import { StatCard } from "@/components/cards/StatCard";
import { ActivityHeatmap } from "@/components/charts/ActivityHeatmap";
import { AreaTrendChart } from "@/components/charts/AreaTrendChart";
import { DistributionChart } from "@/components/charts/DistributionChart";
import { GreetingBanner } from "@/components/layout/GreetingBanner";
import { PageShell } from "@/components/layout/PageShell";
import { CurriculumSection } from "@/components/sections/CurriculumSection";
import { dashboardKpis } from "@/data/mock-data";
import { useThemeState } from "@/hooks/use-theme-state";

export default function DashboardPage() {
    const { activeTab, hasScrolled, heatmapCells, isLight, setActiveTab, theme, toggleTheme } = useThemeState();

    return (
        <PageShell
            isLight={isLight}
            theme={theme}
            hasScrolled={hasScrolled}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onToggleTheme={toggleTheme}
        >
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
        </PageShell>
    );
}
