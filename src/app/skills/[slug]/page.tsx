"use client";

import { useEffect, useMemo, useState } from "react";
import { SkillDetailHeader } from "@/components/skills/SkillDetailHeader";
import { SkillPostDialog } from "@/components/skills/SkillPostDialog";
import { SkillTopicsTable } from "@/components/skills/SkillTopicsTable";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import { PageShell } from "@/components/layout/PageShell";
import { dashboardTabs } from "@/data/mock-data";
import { machineLearningTopics } from "@/data/skill-detail-data";
import { getDashboardTheme } from "@/lib/theme-utils";
import { DashboardTab } from "@/types/app-types";

export default function SkillDetailPage() {
  const [isLight, setIsLight] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>(dashboardTabs[1]);
  const [topics, setTopics] = useState(machineLearningTopics);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const theme = useMemo(() => getDashboardTheme(isLight), [isLight]);
  const completedCount = topics.filter((topic) => topic.done).length;
  const progressPct = Math.round((completedCount / topics.length) * 100);
  const selectedTopic = topics.find((topic) => topic.id === selectedTopicId) ?? null;

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <AppHeader isLight={isLight} onToggleTheme={() => setIsLight((current) => !current)} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <SkillDetailHeader completedCount={completedCount} progressPct={progressPct} />
      <div className="px-3 pb-16 sm:px-5">
        <SkillTopicsTable isLight={isLight} topics={topics} onOpenPost={setSelectedTopicId} onToggleTopic={toggleTopic} />
      </div>
      <AppFooter />
      <SkillPostDialog copied={copied} topic={selectedTopic} onClose={() => setSelectedTopicId(null)} onCopy={handleCopy} />
    </PageShell>
  );
}
