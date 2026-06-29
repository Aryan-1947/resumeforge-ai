import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FiArrowLeft, FiCheckCircle, FiAlertTriangle, FiFileText, FiMail, FiZap, FiDownload } from "react-icons/fi";
import API, { setAuthToken } from "../services/api";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";

function AnalysisDetails({ darkMode, setDarkMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => { fetchAnalysis(); }, []);

  const fetchAnalysis = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: "https://resumeforge-api" },
      });
      setAuthToken(token);
      const response = await API.get(`/analysis/${id}`);
      setAnalysis(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = (content, filename) => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(content, 180);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(lines, 15, 20);
    doc.save(filename);
  };

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

  if (!analysis) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>Analysis not found.</p>
        </div>
      </div>
    );
  }

  const score = analysis.ats_score;
  const scoreColor = score >= 75 ? "#22C55E" : score >= 50 ? "#F59E0B" : "#EF4444";
  const scoreBg = score >= 75 ? "rgba(34,197,94,0.1)" : score >= 50 ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)";
  const scoreBorder = score >= 75 ? "rgba(34,197,94,0.3)" : score >= 50 ? "rgba(245,158,11,0.3)" : "rgba(239,68,68,0.3)";

  return (
    <div className="min-h-screen grid-bg" style={{ backgroundColor: 'var(--bg)' }}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Back */}
        <button
  onClick={() => navigate("/history")}
  className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest transition-colors hover:text-amber-500 mb-9 -ml-20"
  style={{ color: 'var(--text-faint)' }}
>
  <FiArrowLeft /> Back to History
</button>

<div className="flex items-start justify-between gap-4 mb-6">
  <div>
    <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--text-faint)' }}>
      ✦ ANALYSIS DETAILS
    </p>
    <h1 className="text-2xl font-black tracking-tight mb-1" style={{ color: 'var(--text)' }}>
      {analysis.filename}
    </h1>
    <p className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>
      {new Date(analysis.created_at).toLocaleString()} · {analysis.target_role || "Unknown Role"}
    </p>
  </div>
          <span className="text-sm font-mono font-black px-3 py-1.5 rounded-full shrink-0"
            style={{ color: scoreColor, backgroundColor: scoreBg, border: `1px solid ${scoreBorder}` }}>
            {score}%
          </span>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="xl:col-span-2 space-y-6">

            {/* Before / After */}
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div style={{ borderRight: '1px solid var(--border)' }}>
                  <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
                    <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>ORIGINAL</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ border: '1px solid var(--border)', color: 'var(--text-faint)' }}>BEFORE</span>
                  </div>
                  <div className="p-5 max-h-[400px] overflow-y-auto" style={{ backgroundColor: 'var(--bg)' }}>
                    <pre className="text-xs font-mono leading-6 whitespace-pre-wrap break-words" style={{ color: 'var(--text-muted)' }}>
                      {analysis.original_resume}
                    </pre>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
                    <span className="text-xs font-mono font-semibold uppercase tracking-widest text-amber-500">OPTIMIZED</span>
                    <button
                      onClick={() => downloadPDF(analysis.optimized_resume, "optimized_resume.pdf")}
                      className="flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-lg transition-colors hover:text-amber-500"
                      style={{ border: '1px solid var(--border)', color: 'var(--text-faint)' }}
                    >
                      <FiDownload className="text-xs" /> PDF
                    </button>
                  </div>
                  <div className="p-5 max-h-[400px] overflow-y-auto" style={{ backgroundColor: 'var(--bg)' }}>
                    <pre className="text-xs font-mono leading-6 whitespace-pre-wrap break-words" style={{ color: 'var(--text)' }}>
                      {analysis.optimized_resume}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
              <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                <FiZap className="text-amber-500 text-sm" />
                <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>AI SUGGESTIONS</span>
              </div>
              <div className="p-6 max-h-[350px] overflow-y-auto">
                <p className="text-xs font-mono leading-7 whitespace-pre-wrap" style={{ color: 'var(--text-muted)' }}>
                  {analysis.suggestions}
                </p>
              </div>
            </div>

            {/* Cover Letter */}
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
              <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2">
                  <FiMail className="text-amber-500 text-sm" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>COVER LETTER</span>
                </div>
                <button
                  onClick={() => downloadPDF(analysis.cover_letter, "cover_letter.pdf")}
                  className="flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-lg transition-colors hover:text-amber-500"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-faint)' }}
                >
                  <FiDownload className="text-xs" /> PDF
                </button>
              </div>
              <div className="p-6 max-h-[350px] overflow-y-auto">
                <p className="text-xs font-mono leading-7 whitespace-pre-wrap" style={{ color: 'var(--text-muted)' }}>
                  {analysis.cover_letter}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-24 space-y-4">

              {/* ATS Score */}
              <div className="rounded-xl p-5" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
                <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--text-faint)' }}>ATS SCORE</p>
                <p className="text-5xl font-black font-mono mb-3" style={{ color: scoreColor }}>{score}%</p>
                <div className="w-full rounded-full h-1.5" style={{ backgroundColor: 'var(--border)' }}>
                  <div className="h-1.5 rounded-full transition-all duration-700" style={{ width: `${score}%`, backgroundColor: scoreColor }} />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                {[
                  { label: "MATCHED", value: analysis.ats_analysis?.matched_count || 0, color: "#22C55E" },
                  { label: "MISSING", value: analysis.ats_analysis?.missing_skills?.length || 0, color: "#EF4444" },
                ].map(({ label, value, color }, i) => (
                  <div key={label} className="p-4" style={{ backgroundColor: 'var(--surface)', borderRight: i === 0 ? '1px solid var(--border)' : 'none' }}>
                    <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--text-faint)' }}>{label}</p>
                    <p className="text-2xl font-black font-mono" style={{ color }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Matched Skills */}
              <div className="rounded-xl" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
                <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                  <FiCheckCircle className="text-green-500 text-xs" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Matched</span>
                </div>
                <div className="p-4 flex flex-wrap gap-2">
                  {analysis.ats_analysis?.matched_skills?.map((skill, i) => (
                    <span key={i} className="text-xs font-mono px-2.5 py-1 rounded-full"
                      style={{ border: '1px solid rgba(34,197,94,0.3)', backgroundColor: 'rgba(34,197,94,0.05)', color: '#22C55E' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="rounded-xl" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
                <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                  <FiAlertTriangle className="text-red-400 text-xs" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Missing</span>
                </div>
                <div className="p-4 flex flex-wrap gap-2">
                  {analysis.ats_analysis?.missing_skills?.map((skill, i) => (
                    <span key={i} className="text-xs font-mono px-2.5 py-1 rounded-full"
                      style={{ border: '1px solid rgba(239,68,68,0.3)', backgroundColor: 'rgba(239,68,68,0.05)', color: '#EF4444' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Improvements */}
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
                <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                  <FiFileText className="text-amber-500 text-xs" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>IMPROVEMENTS</span>
                </div>
                <div className="grid grid-cols-2" style={{ borderTop: '1px solid var(--border)' }}>
                  {[
                    { label: "ORIG WORDS", value: analysis.comparison_analysis?.original_word_count },
                    { label: "OPT WORDS", value: analysis.comparison_analysis?.optimized_word_count },
                    { label: "ACTION VERBS", value: analysis.comparison_analysis?.action_verb_improvement },
                    { label: "SKILL BOOST", value: analysis.comparison_analysis?.skill_improvement },
                  ].map(({ label, value }, i) => (
                    <div key={label} className="p-3" style={{
                      borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
                      borderBottom: i < 2 ? '1px solid var(--border)' : 'none'
                    }}>
                      <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--text-faint)' }}>{label}</p>
                      <p className="text-sm font-black font-mono" style={{ color: 'var(--text)' }}>{value ?? "—"}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisDetails;