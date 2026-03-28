import { Kpi } from "@/types/app-types";

const iconMap = {
  book: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--rose)" strokeWidth="2" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z" />
    </svg>
  ),
  check: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--rose)" strokeWidth="2" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  clock: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--rose)" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  post: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--rose)" strokeWidth="2" aria-hidden="true">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
};

type StatCardProps = {
  stat: Kpi;
};

export function StatCard({ stat }: StatCardProps) {
  return (
    <article className="mira-card h-full min-h-[100px] cursor-default p-[13px] hover:-translate-y-[1px]">
      <div className="mb-[6px] flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.09em] text-[var(--tx3)]">
        <span>{stat.label}</span>
        <div className="grid h-[22px] w-[22px] place-items-center rounded-[6px] bg-[var(--icon-chip)]">
          {iconMap[stat.icon]}
        </div>
      </div>
      <div className="font-[ui-monospace,SFMono-Regular,Menlo,monospace] text-[26px] font-extrabold leading-none tracking-[-0.04em] text-[var(--rose)]">{stat.value}</div>
      <div className="mt-1 text-[10px] text-[var(--tx3)]">{stat.sub}</div>
      <div className="mt-[10px] h-[2px] rounded-full bg-[linear-gradient(90deg,var(--rose),transparent)] opacity-[0.35]" />
    </article>
  );
}
