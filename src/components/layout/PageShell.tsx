"use client";

import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import { useThemeState } from "@/hooks/use-theme-state";
import { DashboardTab } from "@/types/app-types";
import { PropsWithChildren } from "react";

type PageShellProps = PropsWithChildren<{
	initialTab?: DashboardTab;
	showFooter?: boolean;
}>;

export function PageShell({
	children,
	initialTab,
	showFooter = true,
}: PageShellProps) {
	const { activeTab, hasScrolled, isLight, setActiveTab, theme, toggleTheme } = useThemeState(initialTab);

	return (
		<main
			className="mira-page min-h-screen w-full px-3 pb-3 pt-0 text-[var(--tx)] transition-[background,color] duration-300 sm:px-5 sm:pb-5 sm:pt-0"
			data-light={isLight ? "true" : undefined}
			style={theme}
		>
			<div className="mx-auto min-w-0 w-full max-w-[1480px] rounded-[14px] text-[var(--tx)] transition-[background,color] duration-300">
				<div
					className="sticky top-0 z-30 -mx-3 px-9 transition-all duration-300 sm:-mx-5 max-sm:px-5"
					style={
						hasScrolled
							? {
									backdropFilter: "blur(20px)",
									WebkitBackdropFilter: "blur(20px)",
									background: isLight
										? "radial-gradient(ellipse 52% 90% at 10% 0%, rgba(214,48,88,0.09) 0%, transparent 54%), radial-gradient(ellipse 40% 64% at 88% 10%, rgba(255,233,226,0.42) 0%, transparent 56%), color-mix(in srgb, var(--card) 82%, transparent)"
										: "radial-gradient(ellipse 52% 90% at 10% 0%, rgba(255,31,90,0.12) 0%, transparent 54%), radial-gradient(ellipse 40% 64% at 88% 10%, rgba(255,255,255,0.07) 0%, transparent 56%), color-mix(in srgb, var(--card) 78%, transparent)",
									boxShadow: isLight
										? "0 10px 14px -14px rgba(214, 48, 88, 0.26)"
										: "0 12px 16px -16px rgba(255, 31, 90, 0.3)",
								}
							: {
									backdropFilter: "none",
									WebkitBackdropFilter: "none",
									background: "transparent",
									boxShadow: "none",
								}
					}
				>
					<AppHeader
						isLight={isLight}
						onToggleTheme={toggleTheme}
						activeTab={activeTab}
						onTabChange={setActiveTab}
					/>
				</div>
				{children}
				{showFooter ? <AppFooter /> : null}
			</div>
		</main>
	)
}
