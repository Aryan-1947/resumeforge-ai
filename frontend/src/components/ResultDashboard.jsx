import { motion } from "framer-motion";
import StatsCards from "./StatsCards";
import ATSProgressBar from "./ATSProgressBar";
import SkillSection from "./SkillSection";
import SuggestionsSection from "./SuggestionsSection";
import OriginalResumePreview from "./OriginalResumePreview";
import ResumePreview from "./ResumePreview";
import CoverLetterSection from "./CoverLetterSection";
import DownloadButtons from "./DownloadButtons";

function ResultDashboard({ result }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
        <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: 'var(--text-faint)' }}>
          ✦ ANALYSIS RESULTS
        </span>
        <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div style={{ borderRight: '1px solid var(--border)' }}>
                <OriginalResumePreview resume={result.original_resume} />
              </div>
              <div>
                <ResumePreview resume={result.optimized_resume} />
              </div>
            </div>
          </div>
          <SuggestionsSection suggestions={result.suggestions} />
          <CoverLetterSection coverLetter={result.cover_letter} />
        </div>

        {/* RIGHT sidebar */}
        <div className="xl:col-span-1">
          <div className="sticky top-24 space-y-4">
            <ATSProgressBar score={result.ats_analysis.ats_score} />
            <StatsCards result={result} />
            <SkillSection title="Matched Skills" skills={result.ats_analysis.matched_skills} />
            <SkillSection title="Missing Skills" skills={result.ats_analysis.missing_skills} />
            <DownloadButtons result={result} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ResultDashboard;