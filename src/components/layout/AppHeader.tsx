import Link from "next/link";
import { DashboardTab } from "@/types/app-types";
import AddSkillBtn from "../buttons/AddSkillBtn";
import { NavTabs } from "./NavTabs";

type AppHeaderProps = {
    isLight: boolean;
    onToggleTheme: () => void;
    activeTab: DashboardTab;
    onTabChange: (tab: DashboardTab) => void;
};

export function AppHeader({ isLight, onToggleTheme, activeTab, onTabChange }: AppHeaderProps) {
    return (
        <header className="flex flex-wrap items-center gap-x-3 gap-y-3 px-0 py-[12px] transition-all duration-300 sm:py-[14px]">
            <Link href="/" className="flex items-center gap-3 cursor-pointer">
                <div className="relative grid h-[35px] w-[35px] place-items-center rounded-[12px] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--rose),white_10%),var(--rose))] text-[13px] font-black text-white shadow-[0_10px_24px_rgba(255,31,90,0.22)]">
                    <span className="absolute inset-[1px] rounded-[11px] border border-[rgba(255,255,255,0.16)]" />
                    <span className="relative">M</span>
                </div>
                <span className="text-[16px] font-bold tracking-[-0.04em] text-[var(--tx)]">MiraAI</span>
            </Link>
            <div className="order-3 basis-full sm:order-2 sm:flex sm:flex-1 sm:basis-auto sm:justify-center">
                <NavTabs activeTab={activeTab} onTabChange={onTabChange} />
            </div>
            <div className="ml-auto flex items-center gap-2 sm:order-3">
                <div className="hidden lg:block">
                    <AddSkillBtn />
                </div>
                <div className="lg:hidden">
                    <AddSkillBtn compact />
                </div>
                <button
                    type="button"
                    aria-label="Toggle theme"
                    onClick={onToggleTheme}
                    className="grid h-[29px] w-[29px] cursor-pointer place-items-center rounded-[9px] border border-[var(--bdr)] bg-[var(--card2)] text-[12px] text-[var(--tx3)] transition-all duration-300 hover:border-[var(--bdr2)] hover:text-[var(--tx2)] hover:shadow-[0_8px_18px_rgba(0,0,0,0.08)]"
                >
                    {isLight ? "●" : "○"}
                </button>
                <button
                    type="button"
                    aria-label="Profile"
                    className="grid h-[29px] min-w-[29px] cursor-pointer place-items-center rounded-full bg-[var(--rose)] px-2 text-[9px] font-black text-white transition-transform duration-200 hover:scale-[1.04] hover:shadow-[0_10px_20px_rgba(255,31,90,0.18)]"
                >
                    AX
                </button>
            </div>
        </header>
    );
}
