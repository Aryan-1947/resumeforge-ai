import { FiAlertCircle } from "react-icons/fi";

function ErrorMessage({ message }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3 rounded-xl mt-4"
      style={{ border: '1px solid rgba(239,68,68,0.3)', backgroundColor: 'rgba(239,68,68,0.05)', color: '#EF4444' }}>
      <FiAlertCircle className="text-sm mt-0.5 shrink-0" />
      <p className="text-xs font-mono">{message}</p>
    </div>
  );
}

export default ErrorMessage;