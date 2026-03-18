import { dashboardTabs } from "@/data/mock-data";
import { DashboardTab } from "@/types/app-types";

type NavTabsProps = {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
};

export function NavTabs({ activeTab, onTabChange }: NavTabsProps) {
  return (
    <div className="flex h-auto flex-wrap items-stretch gap-1 border-b border-[var(--bdr)] px-5 py-2 transition-colors duration-300 sm:h-9 sm:flex-nowrap sm:py-0">
      {dashboardTabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onTabChange(tab)}
          className={`relative flex items-center px-[11px] py-2 text-[12px] transition-colors sm:py-0 ${
            activeTab === tab ? "font-semibold text-[var(--tx)]" : "text-[var(--tx3)] hover:text-[var(--tx2)]"
          }`}
        >
          {tab}
          {activeTab === tab ? <span className="absolute bottom-0 left-[11px] right-[11px] h-[2px] rounded-t-[2px] bg-[var(--rose)]" /> : null}
        </button>
      ))}

      <div className="ml-auto flex items-center">
        <button type="button" className="inline-flex items-center gap-1 rounded-[7px] bg-[var(--rose)] px-[11px] py-[5px] text-[11px] font-bold text-white transition-opacity hover:opacity-90">
          <svg width="9" height="9" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M7 2v10M2 7h10" />
          </svg>
          Add Skill
        </button>
      </div>
    </div>
  );
}
