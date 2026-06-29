function OriginalResumePreview({ resume }) {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
        <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
          ORIGINAL
        </span>
        <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ border: '1px solid var(--border)', color: 'var(--text-faint)' }}>
          BEFORE
        </span>
      </div>
      <div className="p-5 max-h-[500px] overflow-y-auto" style={{ backgroundColor: 'var(--bg)' }}>
        <pre className="text-xs font-mono leading-6 whitespace-pre-wrap break-words" style={{ color: 'var(--text-muted)' }}>
          {resume}
        </pre>
      </div>
    </div>
  );
}

export default OriginalResumePreview;