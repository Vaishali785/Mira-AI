import { posts } from "@/data/skill-detail-data"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { SkillTopic } from "@/types/app-types"

type SkillPostDialogProps = {
	topic: SkillTopic | null
	onClose: () => void
}

export function SkillPostDialog({ topic, onClose }: SkillPostDialogProps) {
	const { copied, copy } = useCopyToClipboard({ resetKey: topic?.id ?? null })
	const topicPost = topic?.postIds.length ? (posts.find((post) => post.id === topic.postIds[0]) ?? null) : null

	return (
		<div
			className={`fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(0,0,0,0.65)] p-4 backdrop-blur-[4px] transition-opacity ${topic ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
			onClick={(event) => {
				if (event.target === event.currentTarget) onClose()
			}}
		>
			<div
				className={`w-full max-w-[480px] overflow-hidden rounded-[14px] border border-(--bdr2) bg-(--card) transition-transform duration-200 ${topic ? "translate-y-0 scale-100" : "translate-y-3 scale-[0.97]"}`}
				style={{ backgroundImage: "radial-gradient(ellipse 80% 80% at 5% 95%, var(--rose-dim) 0%, transparent 55%)" }}
			>
				<div className="flex items-start justify-between gap-3 px-[18px] pb-[14px] pt-[18px]">
					<div>
						<div className="mb-1 text-[9px] font-bold uppercase tracking-[0.09em] text-(--tx3)">Topic</div>
						<div className="text-[15px] font-extrabold leading-[1.2] tracking-[-0.02em] text-(--tx)">{topic?.name ?? "—"}</div>
					</div>
					<button
						type="button"
						className="grid h-7 w-7 place-items-center rounded-[8px] border border-(--bdr) bg-(--card2) text-(--tx3) transition-colors hover:bg-(--bdr2) hover:text-(--tx)"
						onClick={onClose}
						aria-label="Close popup"
					>
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
							<path d="M18 6 6 18M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div className="h-px bg-(--bdr)" />
				<div className="px-[18px] py-4">
					<div className="mb-[10px] flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.09em] text-(--tx3)">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
							<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
						</svg>
						Generated X Post
					</div>
					<div className="whitespace-pre-wrap rounded-[10px] border border-(--bdr) bg-(--card2) px-4 py-[14px] text-[13px] leading-[1.7] text-(--tx)">
						{topicPost?.userEntry ?? topic?.userEntry ?? "—"}
					</div>
					<div className="mt-[14px] flex flex-wrap items-center justify-between gap-2">
						<span className="font-mono text-[10px] text-(--tx3)">{topicPost?.createdOn ? `Generated ${topicPost.createdOn}` : "—"}</span>
						<button
							type="button"
							onClick={() => void copy(topicPost?.userEntry ?? topic?.userEntry ?? "")}
							className={`inline-flex items-center gap-[5px] rounded-[7px] border px-3 py-[5px] text-[11px] font-semibold transition-colors ${copied ? "border-(--rose-dim) bg-(--rose-dim) text-(--rose)" : "border-(--bdr2) bg-(--card2) text-(--tx2) hover:text-(--tx)"}`}
						>
							{copied ? (
								<>
									<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
										<polyline points="20 6 9 17 4 12" />
									</svg>
									Copied!
								</>
							) : (
								<>
									<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
										<rect x="9" y="9" width="13" height="13" rx="2" />
										<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
									</svg>
									Copy
								</>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
