function StatsCards({ result }) {
  const stats = [
    { label: "MATCHED", value: result.ats_analysis.matched_skills.length, color: "#22C55E" },
    { label: "MISSING", value: result.ats_analysis.missing_skills.length, color: "#EF4444" },
    { label: "ROLE", value: result.target_role || "AI Role", color: "var(--amber)", small: true },
  ];

  return (
    <div className="grid grid-cols-3 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      {stats.map(({ label, value, color, small }, i) => (
        <div key={label} className="p-4" style={{
          backgroundColor: 'var(--surface)',
          borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none'
        }}>
          <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--text-faint)' }}>
            {label}
          </p>
          <p className={`font-black font-mono leading-tight ${small ? "text-sm" : "text-2xl"}`} style={{ color }}>
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;