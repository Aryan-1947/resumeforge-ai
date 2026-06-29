import CopyButton from "./CopyButton";
import { FiMail } from "react-icons/fi";

function CoverLetterSection({ coverLetter }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          <FiMail className="text-amber-500 text-sm" />
          <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            COVER LETTER
          </span>
        </div>
        <CopyButton text={coverLetter} />
      </div>
      <div className="p-6 max-h-[400px] overflow-y-auto">
        <p className="text-sm leading-7 whitespace-pre-wrap font-mono" style={{ color: 'var(--text-muted)' }}>
          {coverLetter}
        </p>
      </div>
    </div>
  );
}

export default CoverLetterSection;