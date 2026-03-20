"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import { dashboardTabs } from "@/data/mock-data";
import { createHeatmapCells, getDashboardTheme } from "@/lib/theme-utils";
import { DashboardTab } from "@/types/app-types";

export const useThemeState = () => {
  const [isLight, setIsLight] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>(dashboardTabs[0]);
  const [hasScrolled, setHasScrolled] = useState(false);

  const theme = useMemo(() => getDashboardTheme(isLight), [isLight]);
  const heatmapCells = useMemo(() => createHeatmapCells(isLight), [isLight]);

  useLayoutEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return {
    isLight,
    hasScrolled,
    activeTab,
    theme,
    heatmapCells,
    setActiveTab,
    toggleTheme: () => setIsLight((current) => !current)
  };
};
