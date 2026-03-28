type AddSkillBtnProps = {
    compact?: boolean;
    onClick?: () => void;
};

const AddSkillBtn = ({ compact = false, onClick }: AddSkillBtnProps) => {
    return (
        <div className="flex items-center">
            <button
                type="button"
                onClick={onClick}
                className={`inline-flex items-center rounded-[10px] border border-[color-mix(in_srgb,var(--rose),black_8%)] bg-[var(--rose)] text-[11px] font-semibold text-white shadow-[0_8px_18px_rgba(255,31,90,0.18)] transition-all duration-200 hover:-translate-y-[1px] hover:brightness-105 hover:shadow-[0_12px_22px_rgba(255,31,90,0.24)] ${
                    compact ? "gap-0 px-[10px] py-[8px]" : "gap-[6px] px-[14px] py-[8px]"
                }`}
            >
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M7 2v10M2 7h10" />
                </svg>
                {compact ? null : "Add Skill"}
            </button>
        </div>
    )
}

export default AddSkillBtn
