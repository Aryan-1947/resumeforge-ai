import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FiFileText, FiArrowRight, FiTrash2, FiClock, FiZap } from "react-icons/fi";
import API, { setAuthToken } from "../services/api";
import Navbar from "../components/Navbar";

function History({ darkMode, setDarkMode }) {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: "https://resumeforge-api" },
      });
      setAuthToken(token);
      const response = await API.get("/my-analyses");
      setAnalyses(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    setDeleting(id);
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: "https://resumeforge-api" },
      });
      setAuthToken(token);
      await API.delete(`/analysis/${id}`);
      setAnalyses((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(null);
    }
  };

  const scoreColor = (score) =>
    score >= 75 ? "#22C55E" :
    score >= 50 ? "#F59E0B" :
    "#EF4444";

  const scoreBg = (score) =>
    score >= 75 ? "rgba(34,197,94,0.1)" :
    score >= 50 ? "rgba(245,158,11,0.1)" :
    "rgba(239,68,68,0.1)";

  const scoreBorder = (score) =>
    score >= 75 ? "rgba(34,197,94,0.3)" :
    score >= 50 ? "rgba(245,158,11,0.3)" :
    "rgba(239,68,68,0.3)";

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="w-8 h-8 rounded-full border-2 border-t-amber-500 animate-spin"
            style={{ borderColor: 'var(--border)', borderTopColor: '#F59E0B' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid-bg" style={{ backgroundColor: 'var(--bg)' }}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
            ✦ YOUR ANALYSES
          </p>
          <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text)' }}>
            History
          </h1>
        </div>

        {analyses.length === 0 ? (
          <div className="rounded-xl p-12 text-center" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
            <FiClock className="text-3xl mx-auto mb-3" style={{ color: 'var(--text-faint)' }} />
            <p className="text-sm font-mono font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text)' }}>
              No analyses yet
            </p>
            <p className="text-xs font-mono mb-5" style={{ color: 'var(--text-faint)' }}>
              Upload a resume to get started
            </p>
            <button
              onClick={() => navigate("/app")}
              className="text-xs font-mono font-bold bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg transition-colors uppercase tracking-widest"
            >
              <FiZap className="inline mr-1" />
              Run First Analysis
            </button>
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>

            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 px-5 py-3" style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
              {["FILE", "ROLE", "SCORE", "DATE"].map((h, i) => (
                <span key={h} className={`${i === 0 ? "col-span-5" : i === 1 ? "col-span-3" : "col-span-2"} text-[10px] font-mono uppercase tracking-widest`}
                  style={{ color: 'var(--text-faint)' }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {analyses.map((analysis, i) => (
              <div
                key={analysis.id}
                onClick={() => navigate(`/analysis/${analysis.id}`)}
                className="grid grid-cols-12 gap-4 px-5 py-4 cursor-pointer transition-colors group"
                style={{
                  borderBottom: i < analyses.length - 1 ? '1px solid var(--border)' : 'none',
                  backgroundColor: 'var(--bg)',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--bg)'}
              >
                {/* File */}
                <div className="col-span-5 flex items-center gap-3">
                  <div className="p-2 rounded-lg shrink-0" style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                    <FiFileText className="text-sm" style={{ color: 'var(--text-faint)' }} />
                  </div>
                  <span className="text-xs font-mono truncate" style={{ color: 'var(--text)' }}>
                    {analysis.filename}
                  </span>
                </div>

                {/* Role */}
                <div className="col-span-3 flex items-center">
                  <span className="text-xs font-mono truncate" style={{ color: 'var(--text-faint)' }}>
                    {analysis.target_role || "—"}
                  </span>
                </div>

                {/* Score */}
                <div className="col-span-2 flex items-center">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full"
                    style={{
                      color: scoreColor(analysis.ats_score),
                      backgroundColor: scoreBg(analysis.ats_score),
                      border: `1px solid ${scoreBorder(analysis.ats_score)}`
                    }}>
                    {analysis.ats_score}%
                  </span>
                </div>

                {/* Date + actions */}
                <div className="col-span-2 flex items-center justify-between">
                  <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>
                    {new Date(analysis.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleDelete(e, analysis.id)}
                      className="p-1 transition-colors hover:text-red-400"
                      style={{ color: 'var(--text-faint)' }}
                    >
                      {deleting === analysis.id
                        ? <div className="w-3 h-3 rounded-full border border-t-red-400 animate-spin" style={{ borderColor: 'var(--border)', borderTopColor: '#EF4444' }} />
                        : <FiTrash2 className="text-xs" />
                      }
                    </button>
                    <FiArrowRight className="text-xs text-amber-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;