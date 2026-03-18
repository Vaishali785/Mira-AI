export function AreaTrendChart() {
  return (
    <article className="mira-card min-h-[208px] p-[13px] xl:col-start-3 xl:[grid-row:1/3]">
      <div className="mb-2 flex items-start justify-between">
        <div>
          <div className="mira-eyebrow">Learning Hours</div>
          <div className="mt-[2px] text-[14px] font-bold">Daily Activity</div>
        </div>
        <div className="flex items-center gap-[6px]">
          <div className="flex items-center gap-1 text-[10px] text-[var(--tx3)]">
            <span className="inline-block h-[6px] w-[6px] rounded-full bg-[var(--rose)]" />
            hrs
          </div>
          <div className="rounded-[5px] border border-[var(--bdr)] bg-[var(--card2)] px-[7px] py-[2px] text-[10px] text-[var(--tx3)]">28d</div>
        </div>
      </div>
      <svg width="100%" viewBox="0 0 360 140" preserveAspectRatio="none" className="block">
        <defs>
          <linearGradient id="mira-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF1F5A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF1F5A" />
          </linearGradient>
          <linearGradient id="mira-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF1F5A" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#FF1F5A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="35" x2="360" y2="35" stroke="currentColor" strokeOpacity="0.05" strokeWidth="1" />
        <line x1="0" y1="70" x2="360" y2="70" stroke="currentColor" strokeOpacity="0.05" strokeWidth="1" />
        <line x1="0" y1="105" x2="360" y2="105" stroke="currentColor" strokeOpacity="0.05" strokeWidth="1" />
        <path d="M0,115 C25,110 45,90 70,76 C90,65 108,38 130,28 C152,18 168,14 188,10 C208,7 222,16 244,22 C266,28 280,40 300,32 C318,25 332,10 355,7 L360,7 L360,138 L0,138 Z" fill="url(#mira-fill)" />
        <path d="M0,115 C25,110 45,90 70,76 C90,65 108,38 130,28 C152,18 168,14 188,10 C208,7 222,16 244,22 C266,28 280,40 300,32 C318,25 332,10 355,7" fill="none" stroke="url(#mira-line)" strokeWidth="2.5" strokeLinecap="round" />
        <text x="4" y="136" fontSize="8" fill="currentColor" fillOpacity="0.3" fontFamily="monospace">W1</text>
        <text x="88" y="136" fontSize="8" fill="currentColor" fillOpacity="0.3" fontFamily="monospace">W2</text>
        <text x="180" y="136" fontSize="8" fill="currentColor" fillOpacity="0.3" fontFamily="monospace">W3</text>
        <text x="272" y="136" fontSize="8" fill="currentColor" fillOpacity="0.3" fontFamily="monospace">W4</text>
      </svg>
    </article>
  );
}
