import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-lg transition-colors"
      style={{ border: '1px solid var(--border)', color: copied ? 'var(--amber)' : 'var(--text-faint)' }}
    >
      {copied ? <FiCheck className="text-amber-500" /> : <FiCopy />}
      {copied ? "COPIED" : "COPY"}
    </button>
  );
}

export default CopyButton;