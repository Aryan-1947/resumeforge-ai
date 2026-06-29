const steps = ["PARSING RESUME", "MATCHING ATS KEYWORDS", "REWRITING RESUME", "WRITING COVER LETTER"];

function LoadingSpinner() {
  return (
    <div className="mt-8 rounded-xl p-8 text-center" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
      <div className="flex justify-center mb-5">
        <div className="w-8 h-8 rounded-full border-2 border-t-amber-500 animate-spin" style={{ borderColor: 'var(--border)', borderTopColor: '#F59E0B' }} />
      </div>
      <p className="text-sm font-mono font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text)' }}>
        Analyzing...
      </p>
      <p className="text-xs font-mono mb-6" style={{ color: 'var(--text-faint)' }}>
        This usually takes 15–30 seconds
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {steps.map((step) => (
          <span key={step} className="text-[10px] font-mono px-3 py-1.5 rounded-full uppercase tracking-widest"
            style={{ border: '1px solid var(--border)', color: 'var(--text-faint)' }}>
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}

export default LoadingSpinner;