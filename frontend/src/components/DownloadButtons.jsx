import jsPDF from "jspdf";
import { FiDownload } from "react-icons/fi";

function DownloadButtons({ result }) {
  const downloadPDF = (content, filename) => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(content, 180);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(lines, 15, 20);
    doc.save(filename);
  };

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <FiDownload className="text-amber-500 text-sm" />
        <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
          DOWNLOADS
        </span>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <button
          onClick={() => downloadPDF(result.optimized_resume, "optimized_resume.pdf")}
          className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-600 text-black text-xs font-mono font-bold py-2.5 rounded-lg transition-colors"
        >
          <FiDownload className="text-sm" /> RESUME PDF
        </button>
        <button
          onClick={() => downloadPDF(result.cover_letter, "cover_letter.pdf")}
          className="flex items-center justify-center gap-2 w-full text-xs font-mono font-bold py-2.5 rounded-lg transition-colors"
          style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
        >
          <FiDownload className="text-sm" /> COVER LETTER PDF
        </button>
      </div>
    </div>
  );
}

export default DownloadButtons;