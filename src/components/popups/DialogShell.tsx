"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

type DialogShellProps = {
    isOpen: boolean;
    title: string;
    subtitle?: string;
    eyebrow?: string;
    onClose: () => void;
    children: ReactNode;
};

export function DialogShell({
    isOpen,
    title,
    subtitle,
    eyebrow = "New Skill",
    onClose,
    children
}: DialogShellProps) {
    return (
        <div
            className={`fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(8,8,8,0.42)] p-5 backdrop-blur-[6px] transition-opacity duration-200 ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                className={`max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-[14px] border border-(--bdr2) shadow-[0_14px_30px_rgba(0,0,0,0.24),0_0_18px_color-mix(in_srgb,var(--rose),transparent_82%)] backdrop-blur-[2px] transition-transform duration-200 ${isOpen ? "translate-y-0 scale-100" : "translate-y-[14px] scale-[0.97]"}`}
                style={{
                    background:
                        "radial-gradient(ellipse 80% 80% at 5% 95%, var(--rose-dim) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 95% 8%, rgba(255,255,255,0.03) 0%, transparent 50%), var(--card)"
                }}
            >
                <div className="flex items-start justify-between gap-3 border-b border-(--bdr) px-[18px] pb-[14px] pt-[18px]">
                    <div>
                        <div className="mb-1 text-[9px] font-bold uppercase tracking-[0.09em] text-(--tx3)">{eyebrow}</div>
                        <h2 className="text-[16px] font-extrabold tracking-[-0.02em] text-(--tx)">{title}</h2>
                        {subtitle ? <p className="mt-[3px] text-[11px] text-(--tx3)">{subtitle}</p> : null}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close popup"
                        className="grid h-7 w-7 cursor-pointer place-items-center rounded-[8px] border border-(--bdr) bg-(--card2) text-(--tx3) transition-colors hover:bg-(--bdr2) hover:text-(--tx)"
                    >
                        <X size={12} strokeWidth={2.5} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
