import { SkillCard as SkillCardType } from "@/types/app-types";

function StatusTag({ status }: { status: SkillCardType["status"] }) {
  const className = status === "Done" ? "mira-skill-tag done" : status === "Paused" ? "mira-skill-tag paused" : "mira-skill-tag active";
  return <span className={className}>{status}</span>;
}

function CheckIcon({ done }: { done: boolean }) {
  return (
    <div className={`mira-check ${done ? "is-done" : ""}`}>
      {done ? (
        <svg width="7" height="7" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M2 5l2.5 2.5L8 3" stroke="var(--rose)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </div>
  );
}

export function ProgressCard({ skill }: { skill: SkillCardType }) {
  return (
    <article className="mira-skill-card min-h-[228px] rounded-[12px] p-[14px]">
      <div className="mb-[10px] flex items-start justify-between gap-2 text-[14px] font-bold">
        <span className="leading-[1.35] tracking-[-0.01em]">{skill.name}</span>
        <StatusTag status={skill.status} />
      </div>

      <div className="mb-4 h-[4px] overflow-hidden rounded-full bg-[var(--card2)]">
        <div className="h-full rounded-full" style={{ width: `${skill.progress}%`, background: skill.gradient }} />
      </div>

      <div className="space-y-[8px]">
        {skill.lessons.map((lesson) => (
          <div key={lesson.label} className="flex items-center gap-[6px]">
            <CheckIcon done={lesson.done} />
            <span className={`text-[13px] leading-[1.35] ${lesson.done ? "text-[var(--tx3)] line-through" : "text-[var(--tx2)]"}`}>{lesson.label}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
