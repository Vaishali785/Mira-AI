import { focusSlices } from "@/data/mock-data";

export function DistributionChart() {
  return (
    <article className="mira-card flex h-full min-h-[170px] flex-col p-[13px]">
      <div className="mira-eyebrow">Distribution</div>
      <div className="mb-[10px] mt-[2px] text-[14px] font-bold">Skill Focus</div>
      <div className="flex flex-1 items-center gap-2">
        <svg width="90" height="90" viewBox="0 0 90 90" className="shrink-0">
          <circle cx="45" cy="45" r="32" fill="none" stroke="currentColor" strokeOpacity="0.07" strokeWidth="11" />
          <circle cx="45" cy="45" r="32" fill="none" stroke="#FF1F5A" strokeWidth="11" strokeDasharray="80 121" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 45 45)" />
          <circle cx="45" cy="45" r="32" fill="none" stroke="#FF7BAA" strokeWidth="11" strokeDasharray="50 151" strokeDashoffset="-80" strokeLinecap="round" transform="rotate(-90 45 45)" />
          <circle cx="45" cy="45" r="32" fill="none" stroke="#FFB3CC" strokeWidth="11" strokeDasharray="40 161" strokeDashoffset="-130" strokeLinecap="round" transform="rotate(-90 45 45)" />
          <circle cx="45" cy="45" r="32" fill="none" stroke="#FFCFDE" strokeWidth="11" strokeDasharray="31 170" strokeDashoffset="-170" strokeLinecap="round" transform="rotate(-90 45 45)" />
          <text x="45" y="42" textAnchor="middle" fontSize="16" fontWeight="800" fill="currentColor" fontFamily="monospace">7</text>
          <text x="45" y="52" textAnchor="middle" fontSize="7" fill="currentColor" fillOpacity="0.4" fontFamily="monospace" letterSpacing="1">SKILLS</text>
        </svg>

        <div className="flex-1">
          {focusSlices.map((slice) => (
            <div key={slice.label} className="mb-[5px] flex items-center gap-[5px] text-[10px]">
              <span className="h-[6px] w-[6px] shrink-0 rounded-full" style={{ background: slice.color }} />
              <span className="flex-1 text-[var(--tx2)]">{slice.label}</span>
              <span className="font-[ui-monospace,SFMono-Regular,Menlo,monospace] text-[11px] font-bold">{slice.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto flex h-1 gap-px overflow-hidden rounded-full pt-2">
        {focusSlices.map((slice) => (
          <div key={slice.label} className="rounded-full" style={{ width: `${slice.percent}%`, background: slice.color }} />
        ))}
      </div>
    </article>
  );
}
