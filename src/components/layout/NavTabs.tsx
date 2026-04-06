import { dashboardTabs } from "@/data/mock-data"
import { DashboardTab } from "@/types/app-types"

type NavTabsProps = {
	activeTab: DashboardTab
	onTabChange: (tab: DashboardTab) => void
}

export function NavTabs({ activeTab, onTabChange }: NavTabsProps) {
	return (
		<div className="flex w-full justify-center overflow-x-auto py-1 no-scrollbar">
			<div className="flex min-w-max items-center justify-center gap-5 sm:gap-6 max-sm:justify-between max-sm:w-full">
				{dashboardTabs.map((tab) => (
					<button
						key={tab}
						type="button"
						onClick={() => onTabChange(tab)}
						className={`relative cursor-pointer px-[2px] py-[8px] text-[12px] font-medium transition-colors duration-200 ${
							activeTab === tab
								? "text-(--tx)"
								: "text-(--tx3) hover:text-(--tx2)"
						}`}
					>
						{tab}
						{activeTab === tab ? (
							<span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-[2px] bg-(--rose)" />
						) : null}
					</button>
				))}
			</div>
		</div>
	)
}
