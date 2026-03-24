import { CSSProperties, PropsWithChildren } from "react";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import { DashboardTab } from "@/types/app-types";

type PageShellProps = PropsWithChildren<{
    isLight: boolean;
    theme: CSSProperties;
    hasScrolled?: boolean;
    activeTab: DashboardTab;
    onTabChange: (tab: DashboardTab) => void;
    onToggleTheme: () => void;
    showFooter?: boolean;
}>;

export function PageShell({
    children,
    isLight,
    theme,
    hasScrolled = false,
    activeTab,
    onTabChange,
    onToggleTheme,
    showFooter = true
}: PageShellProps) {
    return (
        <main className="mira-page min-h-screen w-full px-3 py-3 text-[var(--tx)] transition-[background,color] duration-300 sm:px-5 sm:py-5" data-light={isLight ? "true" : undefined} style={theme}>
            <div className="mx-auto min-w-0 w-full max-w-[1480px] rounded-[14px] text-[var(--tx)] transition-[background,color] duration-300">
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
                    <AppHeader isLight={isLight} onToggleTheme={onToggleTheme} activeTab={activeTab} onTabChange={onTabChange} />
                </div>
                {children}
                {showFooter ? <AppFooter /> : null}
            </div>
        </main>
    );
}
