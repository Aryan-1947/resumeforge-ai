import CopyButton from "./CopyButton";

function ResumePreview({ resume }) {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-amber-500">
          OPTIMIZED
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2 py-0.5 rounded-full text-amber-500" style={{ border: '1px solid rgba(245,158,11,0.3)' }}>
            AFTER
          </span>
          <CopyButton text={resume} />
        </div>
      </div>
      <div className="p-5 max-h-[500px] overflow-y-auto" style={{ backgroundColor: 'var(--bg)' }}>
        <pre className="text-xs font-mono leading-6 whitespace-pre-wrap break-words" style={{ color: 'var(--text)' }}>
          {resume}
        </pre>
      </div>
    </div>
  );
}

export default ResumePreview;