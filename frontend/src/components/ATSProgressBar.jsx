function ATSProgressBar({ score }) {
  const barColor = score >= 75 ? "#22C55E" : score >= 50 ? "#F59E0B" : "#EF4444";
  const label = score >= 75 ? "STRONG MATCH" : score >= 50 ? "MODERATE MATCH" : "WEAK MATCH";

  return (
    <div className="rounded-xl p-5" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
          ATS SCORE
        </span>
        <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>
          {label}
        </span>
      </div>
      <p className="text-5xl font-black font-mono mb-4" style={{ color: 'var(--text)' }}>
        {score}%
      </p>
      <div className="w-full rounded-full h-1.5" style={{ backgroundColor: 'var(--border)' }}>
        <div className="h-1.5 rounded-full transition-all duration-700" style={{ width: `${score}%`, backgroundColor: barColor }} />
      </div>
    </div>
  );
}

export default ATSProgressBar;