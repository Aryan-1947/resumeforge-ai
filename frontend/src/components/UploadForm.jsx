import toast from "react-hot-toast";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import ResultDashboard from "./ResultDashboard";
import API, { setAuthToken } from "../services/api";
import { useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FiUploadCloud, FiX, FiZap, FiFile } from "react-icons/fi";

const SAMPLE_JD = `We are looking for a skilled Software Engineer to join our team.

Requirements:
- Strong proficiency in Python and backend development
- Experience with REST APIs and FastAPI or Django
- Familiarity with SQL databases (PostgreSQL, MySQL)
- Experience with Docker and containerization
- Knowledge of Git and version control workflows
- Understanding of software design patterns

Responsibilities:
- Design and develop scalable backend systems
- Build and maintain REST APIs for web and mobile applications
- Collaborate with cross-functional teams
- Write clean, maintainable, and well-documented code
- Participate in code reviews and technical discussions

Nice to have:
- Experience with cloud platforms (AWS, GCP, Azure)
- Knowledge of machine learning workflows
- Familiarity with CI/CD pipelines

Experience: 2+ years
`;

function UploadForm({ darkMode }) {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [jdCharCount, setJdCharCount] = useState(0);
  const resultRef = useRef(null);
  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async () => {
    if (!resume || !jobDescription) {
      toast.error("Please upload resume and enter job description");
      return;
    }
    try {
      setError("");
      setResult(null);
      setLoading(true);
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: "https://resumeforge-api" },
      });
      setAuthToken(token);
      const formData = new FormData();
      formData.append("file", resume);
      formData.append("job_description", jobDescription);
      formData.append("target_role", "");
      const response = await API.post("/analyze-resume/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
      toast.success("Analysis complete!");
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 200);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while analyzing resume.");
      toast.error("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setResume(null);
    setJobDescription("");
    setJdCharCount(0);
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen grid-bg" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="mb-8">
          <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
            ✦ ATS ANALYSIS
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: 'var(--text)' }}>
            Forge your resume.
          </h1>
        </div>

        {/* 50/50 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

          {/* LEFT */}
          <div
  className="flex flex-col rounded-xl overflow-hidden transition-all duration-200"
  style={{ border: '1px solid var(--border)' }}
  onMouseEnter={e => {
    e.currentTarget.style.borderColor = 'rgba(245,158,11,0.5)';
    e.currentTarget.style.boxShadow = '0 0 24px rgba(245,158,11,0.08)';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.borderColor = 'var(--border)';
    e.currentTarget.style.boxShadow = 'none';
  }}
>
            <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
              <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                ☰ YOUR RESUME
              </span>
              <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>
                PDF · DOCX · max 10MB
              </span>
            </div>

            <label
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                const file = e.dataTransfer.files[0];
                if (file) { setResume(file); setResult(null); }
              }}
              className="relative flex flex-col items-center justify-center min-h-[320px] cursor-pointer transition-all duration-200"
              style={{
                backgroundColor: dragActive ? 'rgba(245,158,11,0.05)' : resume ? 'var(--surface)' : 'var(--bg)',
                border: dragActive ? '2px dashed rgba(245,158,11,0.6)' : resume ? '2px dashed rgba(34,197,94,0.4)' : '2px dashed var(--border)',
              }}
            >
              {resume ? (
                <div className="text-center px-8">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}>
                    <FiFile className="text-green-400 text-2xl" />
                  </div>
                  <p className="text-sm font-bold font-mono mb-1" style={{ color: 'var(--text)' }}>
                    {resume.name}
                  </p>
                  <p className="text-xs font-mono mb-5" style={{ color: 'var(--text-faint)' }}>
                    {(resume.size / 1024).toFixed(0)} KB · Ready to analyze
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); setResume(null); }}
                      className="flex items-center gap-1.5 text-xs font-mono text-red-400 px-3 py-1.5 rounded-lg transition-colors"
                      style={{ border: '1px solid rgba(239,68,68,0.3)', backgroundColor: 'rgba(239,68,68,0.05)' }}
                    >
                      <FiX className="text-xs" /> Remove
                    </button>
                    <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>
                      or click to replace
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center px-8">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors"
                    style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                    <FiUploadCloud className="text-2xl" style={{ color: dragActive ? 'var(--amber)' : 'var(--text-faint)' }} />
                  </div>
                  <p className="text-sm font-bold mb-2" style={{ color: 'var(--text)' }}>
                    {dragActive ? "Drop your resume here" : "Upload your resume"}
                  </p>
                  <p className="text-xs font-mono mb-1" style={{ color: 'var(--text-faint)' }}>
                    Drag & drop or click to browse
                  </p>
                  <p className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>
                    PDF · DOCX supported
                  </p>
                </div>
              )}
              <input type="file" accept=".pdf,.docx" onChange={(e) => { setResume(e.target.files[0]); setResult(null); }} className="hidden" />
            </label>
          </div>

          {/* RIGHT */}
          <div
  className="flex flex-col rounded-xl overflow-hidden transition-all duration-200"
  style={{ border: '1px solid var(--border)' }}
  onMouseEnter={e => {
    e.currentTarget.style.borderColor = 'rgba(245,158,11,0.5)';
    e.currentTarget.style.boxShadow = '0 0 24px rgba(245,158,11,0.08)';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.borderColor = 'var(--border)';
    e.currentTarget.style.boxShadow = 'none';
  }}
>
            <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
              <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                ☰ JOB DESCRIPTION
              </span>
              <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>
                {jdCharCount} chars
              </span>
            </div>
            <textarea
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => { setJobDescription(e.target.value); setJdCharCount(e.target.value.length); }}
              className="flex-1 min-h-[320px] w-full text-sm leading-7 p-6 resize-none focus:outline-none font-mono"
              style={{
                backgroundColor: 'var(--bg)',
                color: 'var(--text)',
              }}
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
          <div className="flex items-center gap-3">
            <button
  onClick={() => {
    setJobDescription(SAMPLE_JD);
    setJdCharCount(SAMPLE_JD.length);
    toast.success("Sample job description loaded.");
  }}
  className="text-xs font-mono uppercase tracking-widest transition-colors"
  style={{ color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '8px' }}
  onMouseEnter={e => {
    e.currentTarget.style.color = 'var(--amber)';
    e.currentTarget.style.borderColor = 'var(--amber)';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.color = 'var(--text-muted)';
    e.currentTarget.style.borderColor = 'var(--border)';
  }}
>
  LOAD SAMPLE JD
</button>

<button
  onClick={handleClear}
  className="text-xs font-mono uppercase tracking-widest transition-colors"
  style={{ color: 'var(--text-faint)', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '8px' }}
  onMouseEnter={e => {
    e.currentTarget.style.color = '#F59E0B';
    e.currentTarget.style.borderColor = '#F59E0B';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.color = 'var(--text-muted)';
    e.currentTarget.style.borderColor = 'var(--border)';
  }}
>
  ↺ CLEAR
</button>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`flex items-center gap-2 font-mono font-bold text-sm px-6 py-3 rounded-lg transition-colors ${
              loading ? "cursor-not-allowed" : "bg-amber-500 hover:bg-amber-600 text-black"
            }`}
            style={loading ? { backgroundColor: 'var(--surface-2)', color: 'var(--text-faint)' } : {}}
          >
            <FiZap />
            {loading ? "ANALYZING..." : "RUN ATS ANALYSIS"}
          </button>
        </div>

        {error && <ErrorMessage message={error} />}
        {loading && <LoadingSpinner />}

        {!loading && result && (
          <div ref={resultRef} className="mt-10">
            <ResultDashboard result={result} />
          </div>
        )}

        {!loading && !result && !error && (
          <div className="mt-6 rounded-xl p-6 text-center" style={{ border: '1px dashed var(--border)' }}>
            <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--text-faint)' }}>
              WAITING FOR INPUT
            </p>
            <p className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>
              Upload your resume and paste a job description above, then hit{" "}
              <span className="text-amber-500">RUN ATS ANALYSIS</span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default UploadForm;