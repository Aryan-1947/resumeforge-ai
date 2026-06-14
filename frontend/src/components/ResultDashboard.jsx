import StatsCards from "./StatsCards";
import { motion } from "framer-motion";
import ATSProgressBar from "./ATSProgressBar";
import OriginalResumePreview from "./OriginalResumePreview";
import ResumePreview from "./ResumePreview";
import CoverLetterSection from "./CoverLetterSection";
import SuggestionsSection from "./SuggestionsSection";
import SkillSection from "./SkillSection";
import DownloadButtons from "./DownloadButtons";
function ResultDashboard({ result }) {

  return (

    <motion.div
  className="space-y-14"
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
>
  
  <StatsCards result={result} />


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">

  {/* ATS SCORE */}

  <ATSProgressBar
  score={result.ats_analysis.ats_score}
/>

  {/* MATCH COUNT */}

  <div className="bg-green-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300">

    <h2 className="text-xl font-semibold">
      Matched Skills
    </h2>

    <p className="text-5xl font-extrabold mt-4">
      {result.ats_analysis.matched_count}
    </p>

  </div>

  {/* TOTAL SKILLS */}

  <div className="bg-red-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300">

    <h2 className="text-xl font-semibold">
      Missing Skills
    </h2>

    <p className="text-5xl font-extrabold mt-4">
      {result.ats_analysis.missing_skills.length}
    </p>

  </div>

</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

  <SkillSection
    title="Matched Skills"
    skills={result.ats_analysis.matched_skills}
    color="text-green-600"
  />

  <SkillSection
    title="Missing Skills"
    skills={result.ats_analysis.missing_skills}
    color="text-red-600"
  />

</div>


<SuggestionsSection
  suggestions={result.suggestions}
/>


      {/* BEFORE VS AFTER */}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">

  <OriginalResumePreview
  resume={result.original_resume}
/>

 <ResumePreview
  resume={result.optimized_resume}
/>

</div>


<CoverLetterSection
  coverLetter={result.cover_letter}
/>


<DownloadButtons result={result} />

    </motion.div>
  );
}

export default ResultDashboard;