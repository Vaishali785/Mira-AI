type AppHeaderProps = {
  isLight: boolean;
  onToggleTheme: () => void;
};

export function AppHeader({ isLight, onToggleTheme }: AppHeaderProps) {
  return (
    <header className="flex items-center gap-3 border-b border-[var(--bdr)] px-5 py-[11px] transition-colors duration-300">
      <div className="grid h-[25px] w-[25px] place-items-center rounded-[7px] bg-[var(--rose)] text-[10px] font-black text-white">M</div>
      <span className="text-[14px] font-bold tracking-[-0.03em]">MiraAI</span>
      <div className="flex-1" />
      <div className="hidden w-[130px] rounded-[7px] border border-[var(--bdr)] bg-[var(--card2)] px-[10px] py-[5px] text-[11px] text-[var(--tx3)] md:block">Search skills...</div>
      <button
        type="button"
        aria-label="Toggle theme"
        onClick={onToggleTheme}
        className="grid h-[27px] w-[27px] place-items-center rounded-[7px] border border-[var(--bdr)] bg-[var(--card2)] text-[12px] text-[var(--tx3)] transition-colors duration-300"
      >
        {isLight ? "●" : "○"}
      </button>
      <div className="grid h-[27px] min-w-[27px] place-items-center rounded-full bg-[var(--rose)] px-2 text-[9px] font-black text-white">AX</div>
    </header>
  );
}
