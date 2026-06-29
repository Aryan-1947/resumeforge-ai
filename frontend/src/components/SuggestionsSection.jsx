import { FiZap } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

function SuggestionsSection({ suggestions }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
      <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <FiZap className="text-amber-500 text-sm" />
        <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
          AI SUGGESTIONS
        </span>
      </div>
      <div className="p-6 max-h-[400px] overflow-y-auto">
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="text-sm leading-7 mb-3 font-mono" style={{ color: 'var(--text-muted)' }}>{children}</p>,
            li: ({ children }) => <li className="text-sm leading-7 mb-2 ml-4 list-disc font-mono" style={{ color: 'var(--text-muted)' }}>{children}</li>,
            ul: ({ children }) => <ul className="mb-3 space-y-1">{children}</ul>,
            h1: ({ children }) => <h1 className="text-base font-bold mb-3 font-mono uppercase tracking-widest" style={{ color: 'var(--text)' }}>{children}</h1>,
            h2: ({ children }) => <h2 className="text-sm font-bold mb-2 font-mono uppercase tracking-widest text-amber-500">{children}</h2>,
            strong: ({ children }) => <strong className="font-semibold" style={{ color: 'var(--text)' }}>{children}</strong>,
          }}
        >
          {suggestions}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default SuggestionsSection;