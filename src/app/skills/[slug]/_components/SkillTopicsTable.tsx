import { SkillTopic } from "@/types/app-types";

type SkillTopicsTableProps = {
    topics: SkillTopic[];
    onOpenPost: (topicId: number) => void;
    onToggleTopic: (topicId: number) => void;
};

export function SkillTopicsTable({ topics, onOpenPost, onToggleTopic }: SkillTopicsTableProps) {
    return (
        <section
            className="overflow-hidden rounded-[12px] border border-(--bdr2) transition-colors duration-300"
            style={{
                background:
                    "radial-gradient(ellipse 80% 80% at 5% 95%, var(--rose-dim) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 95% 5%, var(--topics-table-glow) 0%, transparent 50%), var(--card)"
            }}
        >
            <div className="w-full overflow-x-auto">
                <table className="min-w-[760px] w-full border-collapse">
                    <thead>
                        <tr className="border-b border-(--bdr)">
                            <th className="w-11 px-[14px] py-[10px] text-center text-[9px] font-bold uppercase tracking-[0.09em] text-(--tx3)">Done</th>
                            <th className="px-[14px] py-[10px] text-left text-[9px] font-bold uppercase tracking-[0.09em] text-(--tx3)">Topic</th>
                            <th className="w-[130px] px-[14px] py-[10px] text-left text-[9px] font-bold uppercase tracking-[0.09em] text-(--tx3)">Finished On</th>
                            <th className="w-[120px] px-[14px] py-[10px] text-left text-[9px] font-bold uppercase tracking-[0.09em] text-(--tx3)">Asset</th>
                            <th className="w-20 px-[14px] py-[10px] text-center text-[9px] font-bold uppercase tracking-[0.09em] text-(--tx3)">Post</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topics.map((topic) => (
                            <tr key={topic.id} className="border-b border-(--bdr) transition-colors last:border-b-0 hover:bg-[var(--topics-table-row-hover)]">
                                <td className="px-[14px] py-3 align-middle">
                                    <div className="flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => onToggleTopic(topic.id)}
                                            className={`flex h-4 w-4 items-center justify-center rounded-[4px] border-[1.5px] transition-colors ${topic.done ? "border-(--rose) bg-(--rose-dim)" : "border-(--bdr2) bg-transparent"}`}
                                            aria-label={topic.done ? "Mark incomplete" : "Mark complete"}
                                            title={topic.done ? "Mark incomplete" : "Mark complete"}
                                        >
                                            <svg width="8" height="8" viewBox="0 0 10 10" fill="none" className={topic.done ? "opacity-100" : "opacity-0"} aria-hidden="true">
                                                <path d="M2 5l2.5 2.5L8 3" stroke="var(--rose)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td className="px-[14px] py-3 align-middle">
                                    <span className={`whitespace-nowrap text-[13px] font-medium ${topic.done ? "text-(--tx3) line-through" : "text-(--tx)"}`}>{topic.name}</span>
                                </td>
                                <td className="px-[14px] py-3 align-middle">
                                    <span className={`font-mono text-[11px] whitespace-nowrap ${topic.done ? "text-(--tx2)" : "text-(--tx3)"}`}>{topic.finishedOn ?? "—"}</span>
                                </td>
                                <td className="px-[14px] py-3 align-middle">
                                    {topic.done && topic.asset ? (
                                        <a href={topic.asset.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-[6px] border border-(--rose-dim) bg-(--rose-dim) px-2 py-[3px] text-[11px] text-(--rose) no-underline transition-colors hover:border-[color-mix(in_srgb,var(--rose),transparent_70%)] hover:bg-(--rose-glow)">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                <polyline points="15 3 21 3 21 9" />
                                                <line x1="10" y1="14" x2="21" y2="3" />
                                            </svg>
                                            {topic.asset.label}
                                        </a>
                                    ) : (
                                        <span className="text-[11px] text-(--tx3)">—</span>
                                    )}
                                </td>
                                <td className="px-[14px] py-3 text-center align-middle">
                                    {topic.done && topic.postIds.length > 0 ? (
                                        <button type="button" onClick={() => onOpenPost(topic.id)} className="inline-flex items-center gap-1 rounded-[6px] border border-(--rose-dim) bg-(--rose-dim) px-[10px] py-1 text-[11px] font-semibold text-(--rose) transition-colors hover:border-[color-mix(in_srgb,var(--rose),transparent_70%)] hover:bg-(--rose-glow)">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                            </svg>
                                            View
                                        </button>
                                    ) : (
                                        <span className="text-[11px] text-(--tx3)">—</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
