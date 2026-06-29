import { useAuth0 } from "@auth0/auth0-react";
import { FiZap, FiTarget, FiFileText, FiMail, FiArrowRight, FiSun, FiMoon, FiUpload, FiCpu, FiDownload } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IconTextScanAi } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { value: "95%", label: "ATS PASS RATE" },
  { value: "3x", label: "MORE INTERVIEWS" },
  { value: "< 30s", label: "ANALYSIS TIME" },
  { value: "100%", label: "AI POWERED" },
];

const features = [
  { icon: FiTarget, title: "ATS Score Analysis", desc: "Get a precise ATS match score with weighted skill detection and keyword gap analysis." },
  { icon: FiZap, title: "AI Resume Rewriting", desc: "Our AI rewrites your resume with stronger action verbs, better phrasing, and ATS-friendly formatting." },
  { icon: FiFileText, title: "Before vs After", desc: "See exactly what changed — side-by-side comparison of your original and optimized resume." },
  { icon: FiMail, title: "Cover Letter Generation", desc: "Get a tailored, professional cover letter generated from your resume and the job description." },
  { icon: FiCpu, title: "AI-Powered Recommendations", desc: "Receive intelligent, role-specific suggestions to strengthen your resume and close skill gaps faster." },
  { icon: FiTarget, title: "All-in-One Platform", desc: "Analyze your resume, optimize it for ATS, generate tailored cover letters, identify missing skills — all in one place." },
];

const howItWorks = [
  { icon: FiUpload, title: "Upload Your Resume", desc: "Upload your resume in PDF or DOCX format. We parse it instantly and extract all relevant information." },
  { icon: FiFileText, title: "Paste Job Description", desc: "Copy and paste the job description you're targeting. We'll tailor your resume accordingly." },
  { icon: FiCpu, title: "AI Analyzes & Rewrites", desc: "Our AI engine scores your ATS match, rewrites your resume, identifies skill gaps, and generates a cover letter." },
  { icon: FiDownload, title: "Download & Apply", desc: "Download your optimized resume and tailored cover letter as PDFs. Apply with confidence." },
];

function Landing({ darkMode, setDarkMode }) {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/app");
    } else {
      loginWithRedirect();
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md px-6 md:px-10 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}>
        <div className="flex items-center gap-2.5">
          <div className="bg-amber-500 p-2 rounded-lg">
            <IconTextScanAi size={16} color="black" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight" style={{ color: 'var(--text)' }}>
              ResumeForge<span className="text-amber-500"> AI</span>
            </span>
            <p className="text-[10px] font-mono tracking-widest uppercase leading-none" style={{ color: 'var(--text-faint)' }}>
              V1.0
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg transition-colors"
            style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
          >
            {darkMode ? <FiSun className="text-sm" /> : <FiMoon className="text-sm" />}
          </button>
          <button
            onClick={handleGetStarted}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black text-sm font-bold px-4 py-2 rounded-lg transition-colors"
          >
            {isAuthenticated ? "Go to App" : "Get Started"}
            <FiArrowRight className="text-sm" />
          </button>
        </div>
      </nav>

      {/* Hero — with grid bg */}
      <section className="grid-bg">
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full text-amber-500"
              style={{ border: '1px solid rgba(245,158,11,0.3)' }}>
              ✦ AI-POWERED
            </span>
            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full"
              style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              ✓ ATS-OPTIMIZED
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6" style={{ color: 'var(--text)' }}>
            Resume Intelligence
            <br />
            <span className="text-amber-500">for the ATS era.</span>
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}>
            Upload your resume, paste a job description, and get a precise ATS score,
            AI-powered rewrites, skill gap analysis, and a tailored cover letter —
            all in under 30 seconds.
          </p>
          <button
            onClick={handleGetStarted}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 py-3 rounded-lg transition-colors text-sm"
          >
            <FiZap />
            {isAuthenticated ? "Go to App" : "Start Analyzing Free"}
            <FiArrowRight />
          </button>
        </div>
      </section>

      {/* Stats strip */}
<section className="grid-bg">
  <div className="max-w-5xl mx-auto px-6 py-10">
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map(({ value, label }, i) => (
          <div
            key={label}
            className="p-8 transition-all duration-200 cursor-default"
            style={{
              backgroundColor: 'var(--surface)',
              borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--surface-2)';
              e.currentTarget.style.boxShadow = 'inset 0 0 20px rgba(245,158,11,0.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'var(--surface)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <p className="text-4xl font-black font-mono mb-1 text-amber-500">{value}</p>
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--text-faint)' }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* How it works — with grid bg */}
      <section className="grid-bg">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--text-faint)' }}>
            HOW IT WORKS
          </p>
          <h2 className="text-3xl font-black mb-12" style={{ color: 'var(--text)' }}>
            From Resume to Offer Letter.
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {howItWorks.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-xl transition-all duration-200 group cursor-default"
                style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(245,158,11,0.5)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(245,158,11,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'rgba(245,158,11,0.1)' }}>
                  <Icon className="text-amber-500 text-sm" />
                </div>
                <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--text)' }}>{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features — with grid bg */}
      <section className="grid-bg">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--text-faint)' }}>
            WHAT YOU GET
          </p>
          <h2 className="text-3xl font-black mb-12" style={{ color: 'var(--text)' }}>
            Everything You Need to Land More Interviews.
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl p-6 transition-all duration-200 cursor-default"
                style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(245,158,11,0.5)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(245,158,11,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'rgba(245,158,11,0.1)' }}>
                  <Icon className="text-amber-500 text-base" />
                </div>
                <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--text)' }}>{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — with grid bg + box */}
      <section className="grid-bg">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div
  className="rounded-xl p-10 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-200 cursor-default"
  style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
  onMouseEnter={e => {
    e.currentTarget.style.backgroundColor = 'var(--surface-2)';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.backgroundColor = 'var(--surface)';
  }}
>
            <div>
              <h2 className="text-2xl font-black mb-1" style={{ color: 'var(--text)' }}>
                Ready to forge your resume?
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Join us as we redefine the way resumes are built with AI-powered tools.
              </p>
            </div>
            <button
              onClick={handleGetStarted}
              className="shrink-0 flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              <FiZap />
              {isAuthenticated ? "Go to App" : "Get Started Free"}
              <FiArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Footer — no grid bg */}
      <footer style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg)' }} className="px-6 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-amber-500 p-1.5 rounded-lg">
                <IconTextScanAi size={14} color="black" />
              </div>
              <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                ResumeForge <span className="text-amber-500">AI</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-faint)' }}>
              AI-powered resume optimization for the modern job market.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://github.com/Aryan-1947" target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-base transition-colors cursor-pointer hover:text-white"
                  style={{ color: 'var(--text-faint)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}
                />
              </a>
              <a href="https://linkedin.com/in/aryan-shekhawat-bb26902b8" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-base transition-colors cursor-pointer"
                  style={{ color: 'var(--text-faint)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#0A66C2'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}
                />
              </a>
              <a href="mailto:aryanshekhawat1947@gmail.com">
                <MdEmail className="text-base transition-colors cursor-pointer"
                  style={{ color: 'var(--text-faint)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#EA4335'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}
                />
              </a>
            </div>
          </div>

          {/* What is this */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
              WHAT IS THIS?
            </h4>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-faint)' }}>
              ResumeForge AI lets you upload any resume and match it against a job description to get an ATS score, optimized rewrite, skill gap analysis, and a tailored cover letter — all powered by AI.
            </p>
          </div>

          {/* How it works */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
              HOW IT WORKS
            </h4>
            <ul className="space-y-2">
              {["Upload your resume PDF or DOCX", "Paste the job description", "AI analyzes and rewrites", "Download optimized resume"].map((item) => (
                <li key={item} className="text-xs flex items-start gap-2" style={{ color: 'var(--text-faint)' }}>
                  <span className="text-amber-500 mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Built with */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
              BUILT WITH
            </h4>
            <div className="flex flex-wrap gap-2">
              {["React", "FastAPI", "Auth0", "Groq LLaMA", "spaCy", "SQLite", "Tailwind"].map((tech) => (
                <span key={tech} className="text-[10px] font-mono px-2 py-1 rounded-full"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-faint)' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-10 pt-6 flex items-center justify-between"
          style={{ borderTop: '1px solid var(--border)' }}>
          <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>© 2026 ResumeForge AI</span>
          <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>Built with React + FastAPI + Groq LLaMA</span>
        </div>
      </footer>

    </div>
  );
}

export default Landing;