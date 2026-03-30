import { Check } from "lucide-react";

type AddSkillStepperProps = {
    step: number;
    topicsLen?: number;
};

export function AddSkillStepper({ step, topicsLen }: AddSkillStepperProps) {
    const steps = ["Skill Name", "Choose Method", "Add Topics"];

    return (
        <div className="mb-5 mx-auto w-fit max-w-full">
            <div className="flex items-center">
                {steps.map((label, index) => {
                    const stepIndex = index + 1;
                    const done = stepIndex < step || (step === steps.length && topicsLen && topicsLen > 0);
                    const active = stepIndex === step && stepIndex !== steps.length;
                    const hasNext = index < steps.length - 1;
                    const nextDone = stepIndex < step;

                    return (
                        <div key={label} className="contents">
                            <div
                                className={`grid h-[18px] w-[18px] place-items-center rounded-full border-[1.5px] transition-all duration-200 ${active ? "border-(--rose) bg-(--rose-dim) shadow-[0_0_0_3px_var(--rose-dim)]" : done ? "border-(--rose) bg-(--rose)" : "border-(--bdr2) bg-(--card2)"}`}
                            >
                                {done ? <Check size={10} strokeWidth={2.75} className="text-white" /> : null}
                            </div>
                            {hasNext ? <div className={`h-[2px] w-28 rounded-full transition-colors ${nextDone ? "bg-(--rose)" : "bg-(--bdr2)"}`} /> : null}
                        </div>
                    );
                })}
            </div>
            <div className="mt-2 flex items-start">
                {steps.map((label, index) => {
                    const hasNext = index < steps.length - 1;

                    return (
                        <div key={`${label}-label`} className="contents">
                            <div className="relative h-[14px] w-[18px]">
                                <span className="absolute left-1/2 top-0 w-[96px] -translate-x-1/2 text-center text-[9px] font-medium text-(--tx3)">
                                    {label}
                                </span>
                            </div>
                            {hasNext ? <div className="w-28" /> : null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
