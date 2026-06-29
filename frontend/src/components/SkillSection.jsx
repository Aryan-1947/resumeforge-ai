import { FiCheckCircle, FiAlertTriangle } from "react-icons/fi";

function SkillSection({ title, skills }) {
  const isMatched = title.includes("Matched");

  return (
    <div className="rounded-xl" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          {isMatched
            ? <FiCheckCircle className="text-green-500 text-xs" />
            : <FiAlertTriangle className="text-red-400 text-xs" />
          }
          <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            {title}
          </span>
        </div>
        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full"
          style={{
            color: isMatched ? '#22C55E' : '#EF4444',
            backgroundColor: isMatched ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)'
          }}>
          {skills.length}
        </span>
      </div>
      <div className="p-4 flex flex-wrap gap-2">
        {skills.length === 0 ? (
          <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>None detected</span>
        ) : (
          skills.map((skill, i) => (
            <span key={i} className="text-xs font-mono px-2.5 py-1 rounded-full"
              style={{
                border: isMatched ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(239,68,68,0.3)',
                backgroundColor: isMatched ? 'rgba(34,197,94,0.05)' : 'rgba(239,68,68,0.05)',
                color: isMatched ? '#22C55E' : '#EF4444'
              }}>
              {skill}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

export default SkillSection;