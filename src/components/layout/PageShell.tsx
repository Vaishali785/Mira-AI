import { CSSProperties, PropsWithChildren } from "react";

type PageShellProps = PropsWithChildren<{
    isLight: boolean;
    theme: CSSProperties;
}>;

export function PageShell({ children, isLight, theme }: PageShellProps) {
    return (
        <main className="mira-page min-h-screen w-full px-3 py-3 text-[var(--tx)] transition-[background,color] duration-300 sm:px-5 sm:py-5" data-light={isLight ? "true" : undefined} style={theme}>
            <div className="mx-auto min-w-0 w-full max-w-[1480px] rounded-[14px] text-[var(--tx)] transition-[background,color] duration-300">
                {children}
            </div>
        </main>
    );
}
