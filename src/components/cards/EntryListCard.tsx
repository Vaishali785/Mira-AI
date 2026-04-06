"use client"

import { useEntries } from "@/store/skillsStore"
import { AddEntryBtn } from "../buttons/AddEntryBtn"

type EntryListCardProps = {
	onAddEntry?: () => void
}

export function EntryListCard({ onAddEntry }: EntryListCardProps) {
	const entries = useEntries()

	return (
		<section className="xl:col-start-4 xl:row-[1/5]">
			<div className="mira-entry-card min-h-[240px] rounded-[12px] p-[13px]">
				<div className="mb-2">
					<div className="mira-eyebrow">Entries</div>
					<div className="mt-[2px] text-[14px] font-bold">Recent Entries</div>
				</div>

				{entries.map((entry) => (
					<div
						key={entry.title}
						className="flex gap-[7px] border-b border-(--bdr) py-[7px] transition-colors duration-200 last:border-b-0 hover:border-(--bdr2)"
					>
						<div className="mt-1 h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: entry.dot }} />
						<div>
							<div className="text-[11px] leading-[1.4] text-(--tx)">{entry.title}</div>
							<div className="mt-[2px] flex items-center gap-1 font-[ui-monospace,SFMono-Regular,Menlo,monospace] text-[10px] text-(--tx3)">
								{entry.meta}
								<span className="rounded-[3px] px-1 py-px text-[8px] font-bold" style={entry.tagStyle}>
									{entry.tag}
								</span>
							</div>
						</div>
					</div>
				))}

				<AddEntryBtn onClick={onAddEntry} />
			</div>
		</section>
	)
}
