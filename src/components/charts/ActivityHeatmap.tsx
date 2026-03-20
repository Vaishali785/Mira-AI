import { heatmapLegend, streakStats } from "@/data/mock-data";
import { HeatmapCell } from "@/types/app-types";

export function ActivityHeatmap({ cells }: { cells: HeatmapCell[] }) {
  return (
    <article className="mira-card min-h-[170px] p-[13px]">
      <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mira-eyebrow">Activity</div>
          <div className="mt-[2px] text-[14px] font-bold">Learning Streak</div>
        </div>
        <div className="flex flex-wrap items-center gap-[3px] text-[10px] text-[var(--tx3)]">
          Less
          {heatmapLegend.map((color) => (
            <div key={color} className="h-[9px] w-[9px] rounded-[2px]" style={{ background: color }} />
          ))}
          More
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <div className="grid min-w-0 grid-cols-[repeat(30,minmax(0,1fr))] gap-[2px]">
          {cells.map((cell) => (
            <div key={cell.id} title={cell.title} className="aspect-square rounded-[2px] transition-transform duration-150 hover:scale-[1.4]" style={{ background: cell.background }} />
          ))}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-4 border-t border-[var(--bdr)] pt-2">
        {streakStats.map((stat) => (
          <div key={stat.label}>
            <div className="text-[10px] text-[var(--tx3)]">{stat.label}</div>
            <div className="mt-px font-[ui-monospace,SFMono-Regular,Menlo,monospace] text-[12px] font-bold">{stat.value}</div>
          </div>
        ))}
      </div>
    </article>
  );
}
