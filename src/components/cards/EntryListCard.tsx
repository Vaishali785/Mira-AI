import { journalEntries } from "@/data/mock-data";

export function EntryListCard() {
  return (
    <section className="xl:col-start-4 xl:[grid-row:1/5]">
      <div className="mira-entry-card min-h-[240px] rounded-[12px] p-[13px]">
        <div className="mb-2">
          <div className="mira-eyebrow">Journal</div>
          <div className="mt-[2px] text-[14px] font-bold">Recent Entries</div>
        </div>

        {journalEntries.map((entry) => (
          <div key={entry.title} className="flex gap-[7px] border-b border-[var(--bdr)] py-[7px] last:border-b-0">
            <div className="mt-1 h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: entry.dot }} />
            <div>
              <div className="text-[11px] leading-[1.4] text-[var(--tx)]">{entry.title}</div>
              <div className="mt-[2px] flex items-center gap-1 font-[ui-monospace,SFMono-Regular,Menlo,monospace] text-[10px] text-[var(--tx3)]">
                {entry.meta}
                <span className="rounded-[3px] px-1 py-px text-[8px] font-bold" style={entry.tagStyle}>
                  {entry.tag}
                </span>
              </div>
            </div>
          </div>
        ))}

        <button type="button" className="mt-2 w-full rounded-[8px] border border-dashed border-[var(--bdr2)] bg-[var(--card2)] px-3 py-[7px] text-[11px] text-[var(--tx3)] transition-colors hover:bg-[color-mix(in_srgb,var(--card2),var(--tx)_4%)]">
          + Add entry
        </button>
      </div>
    </section>
  );
}
